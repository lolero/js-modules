import { existsSync, readFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import type { CreateNodesV2, TargetConfiguration } from '@nx/devkit';
import type {
  CreateNodesResult,
  CreateNodesResultV2,
} from 'nx/src/project-graph/plugins/public-api';
import { Language } from '../common/common.utils';
import { targetBuilders, TargetType } from './nx.targets';

/**
 * Filters out targets already defined in scripts.
 * @param scripts - `package.json` `scripts` object.
 * @param targets - Nx targets to filter.
 * @returns Targets not already defined in `scripts`.
 */
function filterExistingTargets(
  scripts: Record<string, string> | undefined,
  targets: Record<string, TargetConfiguration>,
): Record<string, TargetConfiguration> {
  if (!scripts) {
    return targets;
  }
  return Object.fromEntries(
    Object.entries(targets).filter(([name]) => !Object.hasOwn(scripts, name)),
  );
}

export const createNodesV2: CreateNodesV2 = [
  '{package.json,packages/**/package.json,packages/**/pyproject.toml}',
  (configFiles, _options, context) => {
    const createNodesResultV2: CreateNodesResultV2 = configFiles.map(
      (configFile) => {
        const projectPathRel = dirname(configFile);
        const isJs = configFile.endsWith('package.json');
        const isPython = configFile.endsWith('pyproject.toml');

        let createNodesResult: CreateNodesResult;
        let nodeResult: CreateNodesResultV2[number];

        if (
          // Skip workspace-level manifest at `packages/package.json`
          projectPathRel === 'packages' ||
          // Skip Python packages that also have a package.json (handled as JS).
          (isPython &&
            existsSync(
              join(context.workspaceRoot, projectPathRel, 'package.json'),
            ))
        ) {
          createNodesResult = {};
          nodeResult = [configFile, createNodesResult];
          return nodeResult;
        }

        const lintTargets = targetBuilders[TargetType.lint](projectPathRel);

        const isRoot = projectPathRel === '.';
        if (isRoot) {
          createNodesResult = {
            projects: {
              [projectPathRel]: {
                name: 'root',
                root: '.',
                targets: lintTargets,
              },
              scripts: {
                name: 'root-scripts',
                root: 'scripts',
                targets: {
                  ...targetBuilders[TargetType.lint]('scripts'),
                  ...targetBuilders[TargetType.types][Language.javascript](
                    'scripts',
                  ),
                },
              },
              docs: {
                name: 'root-docs',
                root: 'docs',
                targets: targetBuilders[TargetType.lint]('docs'),
              },
            },
          };
          nodeResult = [configFile, createNodesResult];
          return nodeResult;
        }

        if (isJs) {
          // Nx autodetects JS projects from package.json. We only add targets.
          const { scripts } = JSON.parse(
            readFileSync(join(context.workspaceRoot, configFile), 'utf-8'),
          ) as { scripts?: Record<string, string> };
          createNodesResult = {
            projects: {
              [projectPathRel]: {
                targets: {
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.build][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.dev][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.hardhat][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.keycloakify][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(scripts, lintTargets),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.nest][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.next][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.reactNative][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.test][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.types][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                  ...filterExistingTargets(
                    scripts,
                    targetBuilders[TargetType.vite][Language.javascript](
                      projectPathRel,
                    ),
                  ),
                },
              },
            },
          };
          nodeResult = [configFile, createNodesResult];
          return nodeResult;
        }

        if (isPython) {
          // Nx-only scope project name. Applies only to the nx project
          // graph — pyproject.toml, module name, and uv are unaffected.
          const projectName = `@py-modules/${basename(projectPathRel)}`;
          createNodesResult = {
            projects: {
              [projectPathRel]: {
                name: projectName,
                root: projectPathRel,
                targets: {
                  ...lintTargets,
                  ...targetBuilders[TargetType.test][Language.python](
                    projectPathRel,
                  ),
                },
              },
            },
          };
          nodeResult = [configFile, createNodesResult];
          return nodeResult;
        }

        createNodesResult = {};
        nodeResult = [configFile, createNodesResult];
        return nodeResult;
      },
    );

    return createNodesResultV2;
  },
];
