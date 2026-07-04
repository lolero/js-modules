import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { printHealthCheck } from '../common/common.utils';
import {
  healthCheckExitCode,
  healthChecksHelpers,
  HealthCheckType,
  isOkToStatus,
} from './nx.lint-health';
import type { LintCommandParts, LintContext } from './nx.lint-types';

// The workspace-root package.json (dev tooling only) has no role tag and is
// exempt from the app/lib classification rules.
const ROOT_PACKAGE_NAME = 'js-modules';

// Singleton/provider allowlist → peerDependencies in libs, dependencies in apps.
const DEPS_PEER_LIB = new Set([
  '@emotion/react',
  '@emotion/styled',
  '@reduxjs/toolkit',
  'class-transformer',
  'class-validator',
  'react',
  'react-dom',
  'react-native',
  'react-redux',
  'react-router-dom',
  'redux',
  'reflect-metadata',
  'rxjs',
  'typeorm',
]);

/**
 * Whether a package is a required framework/singleton provider peer dep in libs.
 * @param name - Dependency name.
 * @returns True if the name is on the DEPS_PEER_LIB list.
 */
export function isDepPeer(name: string): boolean {
  // `@nestjs/testing` is test-only tooling, not a runtime singleton.
  if (name === '@nestjs/testing') {
    return false;
  }
  return (
    DEPS_PEER_LIB.has(name) ||
    name.startsWith('@mui/') ||
    name.startsWith('@nestjs/')
  );
}

// Dev/build/test tooling → devDependencies (never dependencies/peerDependencies).
const DEPS_DEV = new Set([
  'jest-environment-jsdom',
  'esbuild',
  '@nestjs/testing',
  '@nestjs/cli',
  '@nestjs/schematics',
  'supertest',
  'ts-loader',
  'source-map-support',
  'redux-saga-test-plan',
  'vite',
  '@tailwindcss/vite',
  'svelte',
  'svelte-check',
  'tailwindcss',
  'postcss',
  'autoprefixer',
  'tslib',
  'storybook',
  'react-test-renderer',
]);
const DEPS_DEV_PREFIXES = [
  '@vitejs/',
  'vite-plugin-',
  '@sveltejs/',
  '@storybook/',
  '@babel/',
  '@react-native/',
  '@react-native-community/',
  '@nomicfoundation/',
];
const isDepDev = (name: string): boolean =>
  DEPS_DEV.has(name) || DEPS_DEV_PREFIXES.some((dep) => name.startsWith(dep));
const isTypes = (name: string): boolean => name.startsWith('@types/');
const isInternal = (name: string): boolean => name.startsWith('@js-modules/');

// Packages exempt from the lib "singletons must be peers" rule, each mapped to
// the deps that must stay peers even for them.
type ExceptionsPeerDeps = Record<string, Set<string>>;
const exceptionsPeerDeps: ExceptionsPeerDeps = {
  // web-react-docs-mui is a self-contained docs component consumed by
  // barebones apps that only pass a theme; it may keep the UI/styling
  // singletons (MUI/emotion/router) in `dependencies` — the standard peer
  // pattern would force its barebones consumers to declare every `@mui/*`
  // package it uses. But react/react-dom must stay peers even here: a
  // second React copy breaks hooks.
  '@js-modules/web-react-docs-mui': new Set(['react', 'react-dom']),
};

export const DepBlockName = {
  dependencies: 'dependencies',
  devDependencies: 'devDependencies',
  peerDependencies: 'peerDependencies',
} as const;
export type DepBlockName = (typeof DepBlockName)[keyof typeof DepBlockName];

type DepBlock = Record<string, string>;
type PackageJson = {
  name?: string;
  nx?: { tags?: string[] };
  dependencies?: DepBlock;
  devDependencies?: DepBlock;
  peerDependencies?: DepBlock;
};

/**
 * Reads the set of dependency names declared in the `catalog:` of
 * `pnpm-workspace.yaml`.
 * @param pathToRoot - Relative path from cwd to the workspace root.
 * @returns Set of cataloged dependency names.
 */
function readCatalogNames(pathToRoot: string): Set<string> {
  const names = new Set<string>();
  const workspaceYamlPath = join(pathToRoot, 'pnpm-workspace.yaml');
  if (!existsSync(workspaceYamlPath)) {
    return names;
  }
  const workspaceYaml = readFileSync(workspaceYamlPath, 'utf-8');
  const catalogIndex = workspaceYaml.indexOf('\ncatalog:');
  if (catalogIndex < 0) {
    return names;
  }
  for (const match of workspaceYaml
    .slice(catalogIndex)
    .matchAll(/^\s+'([^']+)':/gm)) {
    names.add(match[1]);
  }
  return names;
}

/**
 * Collects dependency-classification violations for a single package.json.
 * @param packageJson - Parsed package.json.
 * @returns One message per violation (empty when compliant).
 */
export function getPackageJsonViolations(packageJson: PackageJson): string[] {
  const violations: string[] = [];
  const deps = packageJson.dependencies ?? {};
  const depsDev = packageJson.devDependencies ?? {};
  const depsPeer = packageJson.peerDependencies ?? {};
  const tags = packageJson.nx?.tags ?? [];

  // The workspace root only carries dev tooling — validate catalog refs only.
  const isRoot = packageJson.name === ROOT_PACKAGE_NAME;
  const isApp = tags.includes('type:app');
  const isLib = tags.includes('type:lib');
  const exceptionPeerDeps: Set<string> | undefined =
    exceptionsPeerDeps[packageJson.name ?? ''];

  if (!isRoot && !isApp && !isLib) {
    violations.push(
      'missing `nx.tags`: "type:app" (run/served/deployed) or "type:lib" (imported)',
    );
  }

  // Every dependency value must be `catalog:` (external) or `workspace:`
  // (internal, incl. workspace-aliased packages like `@mui/internal-core-docs`,
  // whose name is `@mui/*` but whose value is `workspace:@js-modules/…`).
  for (const block of [deps, depsDev, depsPeer]) {
    for (const [name, version] of Object.entries(block)) {
      if (
        !version.startsWith('catalog:') &&
        !version.startsWith('workspace:')
      ) {
        violations.push(
          `dep must be "catalog:" or "workspace:": ${name} (${version})`,
        );
      }
    }
  }

  if (isRoot) {
    return violations;
  }

  if (isApp && Object.keys(depsPeer).length > 0) {
    violations.push(
      `app must not declare peerDependencies: ${Object.keys(depsPeer).join(', ')}`,
    );
  }

  for (const name of Object.keys(deps)) {
    if (isTypes(name)) {
      violations.push(`@types in dependencies (→ devDependencies): ${name}`);
    } else if (isDepDev(name)) {
      violations.push(`devDep in dependencies (→ devDependencies): ${name}`);
    } else if (
      isLib &&
      isDepPeer(name) &&
      (!exceptionPeerDeps || exceptionPeerDeps.has(name))
    ) {
      violations.push(`peerDep in dependencies (→ peerDependencies): ${name}`);
    }
  }

  for (const name of Object.keys(depsPeer)) {
    if (isTypes(name)) {
      violations.push(
        `@types in peerDependencies (→ devDependencies): ${name}`,
      );
    } else if (isDepDev(name)) {
      violations.push(
        `devDep in peerDependencies (→ devDependencies): ${name}`,
      );
    } else if (!isDepPeer(name)) {
      violations.push(`non peerDep in peerDependencies: ${name}`);
    }
  }

  // Libs mirror every peer into devDependencies so they build standalone.
  if (isLib) {
    for (const name of Object.keys(depsPeer)) {
      if (!(name in depsDev)) {
        violations.push(`peerDep not mirrored in devDependencies: ${name}`);
      }
    }
  }

  return violations;
}

/**
 * Moves a dependency between blocks, creating/removing blocks as needed.
 * @param packageJson - Package.json to mutate.
 * @param from - Source block key.
 * @param to - Target block key.
 * @param name - Dependency name.
 * @param value - Value to write in the target block.
 */
function moveDep(
  packageJson: PackageJson,
  from: DepBlockName,
  to: DepBlockName,
  name: string,
  value: string,
): void {
  const fromBlock = packageJson[from];
  if (fromBlock) {
    delete fromBlock[name];
    if (Object.keys(fromBlock).length === 0) {
      delete packageJson[from];
    }
  }
  packageJson[to] = { ...(packageJson[to] ?? {}), [name]: value };
}

/**
 * Applies the mechanical, deterministic classification fixes to a package.json.
 * Unfixable issues (missing role tag, uncatalogued external version) are left
 * for the check step to report.
 * @param packageJson - Package.json to mutate in place.
 * @param catalogNames - Names present in the workspace catalog.
 * @returns True if any fix was applied.
 */
export function applyPackageJsonFixes(
  packageJson: PackageJson,
  catalogNames: Set<string>,
): boolean {
  const before = JSON.stringify(packageJson);
  const tags = packageJson.nx?.tags ?? [];
  const isRoot = packageJson.name === ROOT_PACKAGE_NAME;
  const isLib = tags.includes('type:lib');
  const isApp = tags.includes('type:app');
  const exceptionPeerDeps: Set<string> | undefined =
    exceptionsPeerDeps[packageJson.name ?? ''];

  // Convert explicit versions to `catalog:` when the name is already cataloged.
  for (const block of Object.values(DepBlockName)) {
    const depBlock = packageJson[block];
    if (!depBlock) continue;
    for (const [name, version] of Object.entries(depBlock)) {
      if (
        !isInternal(name) &&
        !version.startsWith('catalog:') &&
        catalogNames.has(name)
      ) {
        depBlock[name] = 'catalog:';
      }
    }
  }

  if (!isRoot) {
    // @types/depDev out of dependencies → devDependencies.
    for (const [name, version] of Object.entries({
      ...packageJson.dependencies,
    })) {
      if (isTypes(name) || isDepDev(name)) {
        moveDep(
          packageJson,
          DepBlockName.dependencies,
          DepBlockName.devDependencies,
          name,
          version,
        );
      } else if (isApp) {
        // apps keep everything runtime in dependencies — nothing to move.
      } else if (
        isLib &&
        isDepPeer(name) &&
        (!exceptionPeerDeps || exceptionPeerDeps.has(name))
      ) {
        // peerDep → peerDependencies (+ mirrored into devDependencies below).
        moveDep(
          packageJson,
          DepBlockName.dependencies,
          DepBlockName.peerDependencies,
          name,
          version,
        );
      }
    }
    // apps must not declare peers → fold them into dependencies.
    if (isApp && packageJson.peerDependencies) {
      for (const [name, version] of Object.entries({
        ...packageJson.peerDependencies,
      })) {
        moveDep(
          packageJson,
          DepBlockName.peerDependencies,
          DepBlockName.dependencies,
          name,
          version,
        );
      }
    }
    // @types/depDev out of peerDependencies → devDependencies.
    for (const [name, version] of Object.entries({
      ...packageJson.peerDependencies,
    })) {
      if (isTypes(name) || isDepDev(name)) {
        moveDep(
          packageJson,
          DepBlockName.peerDependencies,
          DepBlockName.devDependencies,
          name,
          version,
        );
      }
    }
    // libs mirror every peer into devDependencies.
    if (isLib && packageJson.peerDependencies) {
      packageJson.devDependencies = packageJson.devDependencies ?? {};
      for (const name of Object.keys(packageJson.peerDependencies)) {
        if (!(name in packageJson.devDependencies)) {
          packageJson.devDependencies[name] = 'catalog:';
        }
      }
    }
  }

  // sort each block for stable output (prettier re-formats afterwards)
  for (const block of Object.values(DepBlockName)) {
    if (packageJson[block]) {
      packageJson[block] = Object.fromEntries(
        Object.entries(packageJson[block]).sort(),
      );
    }
  }

  return JSON.stringify(packageJson) !== before;
}

/**
 * Package.json paths from the lint targets (all package.json in scope).
 * @param lintCommandParts - Resolved lint command parts.
 * @returns Absolute/relative package.json paths.
 */
function packageJsonTargets(lintCommandParts: LintCommandParts): string[] {
  return lintCommandParts.targets.filter((target) =>
    target.endsWith('package.json'),
  );
}

/**
 * Check mode: report classification violations for each package.json.
 * @param _lintContext - Lint context (unused).
 * @param lintCommandParts - Resolved lint command parts.
 * @returns 0 when all package.json comply, 1 otherwise.
 */
export function packageJsonCheck(
  _lintContext: LintContext,
  lintCommandParts: LintCommandParts,
): number {
  let exitCode = 0;
  for (const packageJsonPath of packageJsonTargets(lintCommandParts)) {
    const packageJson = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8'),
    ) as PackageJson;
    const violations = getPackageJsonViolations(packageJson);
    if (violations.length > 0) {
      exitCode = 1;
      process.stdout.write(`\n=== ${packageJsonPath} ===\n`);
      violations.forEach((violation) =>
        process.stdout.write(`  ${violation}\n`),
      );
    }
  }
  return exitCode;
}

/**
 * Fix mode: apply mechanical fixes, then report anything left unfixable.
 * @param lintContext - Lint context.
 * @param lintCommandParts - Resolved lint command parts.
 * @returns 0 when everything is compliant after fixing, 1 otherwise.
 */
export function packageJsonFix(
  lintContext: LintContext,
  lintCommandParts: LintCommandParts,
): number {
  const catalogNames = readCatalogNames(lintContext.pathToRoot);
  let exitCode = 0;
  for (const packageJsonPath of packageJsonTargets(lintCommandParts)) {
    const packageJson = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8'),
    ) as PackageJson;
    if (applyPackageJsonFixes(packageJson, catalogNames)) {
      writeFileSync(
        packageJsonPath,
        `${JSON.stringify(packageJson, null, 2)}\n`,
      );
    }
    const violations = getPackageJsonViolations(packageJson);
    if (violations.length > 0) {
      exitCode = 1;
      process.stdout.write(`\n=== ${packageJsonPath} (unfixable) ===\n`);
      violations.forEach((violation) =>
        process.stdout.write(`  ${violation}\n`),
      );
    }
  }
  return exitCode;
}

/**
 * Health mode: verify the classifier and its catalog source are functional.
 * @param lintContext - Lint context.
 * @param lintCommandParts - Resolved lint command parts.
 * @returns 0 if all health checks pass, 1 otherwise.
 */
export function packageJsonHealth(
  lintContext: LintContext,
  lintCommandParts: LintCommandParts,
): number {
  return healthCheckExitCode({
    [HealthCheckType.binary]: healthChecksHelpers.skip(
      'in-process check, no binary',
    ),
    [HealthCheckType.config]: () =>
      healthChecksHelpers.config(
        join(lintContext.pathToRoot, 'pnpm-workspace.yaml'),
      ),
    [HealthCheckType.files]: healthChecksHelpers.skip('no file dependencies'),
    // self-probe: a synthetic non-compliant manifest must be flagged.
    [HealthCheckType.stdout]: () => {
      const flagged =
        getPackageJsonViolations({
          name: '@js-modules/probe',
          nx: { tags: ['type:lib'] },
          dependencies: { react: 'catalog:' },
        }).length > 0;
      printHealthCheck(
        HealthCheckType.stdout,
        'classifier active (singleton-in-deps flagged)',
        isOkToStatus(flagged),
      );
      return flagged;
    },
    [HealthCheckType.targets]: () =>
      healthChecksHelpers.targets(packageJsonTargets(lintCommandParts)),
  });
}
