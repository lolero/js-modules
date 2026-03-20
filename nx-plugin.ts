import { CreateNodesV2 } from '@nx/devkit';
import { existsSync } from 'fs';
import { dirname, join } from 'path';

export const createNodesV2: CreateNodesV2 = [
  '{packages/**/package.json,packages/**/pyproject.toml}',
  (configFiles, _options, context) => {
    return configFiles.map((configFile) => {
      const projectRoot = dirname(configFile);
      const isPython = configFile.endsWith('pyproject.toml');
      const isJs = configFile.endsWith('package.json');

      // Skip root-level configs
      if (projectRoot === '.' || projectRoot === 'packages') {
        return [configFile, {}];
      }

      // For Python: skip if there's also a package.json (JS project)
      if (
        isPython &&
        existsSync(join(context.workspaceRoot, projectRoot, 'package.json'))
      ) {
        return [configFile, {}];
      }

      // For JS: skip if already handled by package.json detection
      if (isJs) {
        // Let Nx's default package.json detection handle the project registration
        // We only add our custom targets
        return [
          configFile,
          {
            projects: {
              [projectRoot]: {
                targets: {
                  'test:test': {
                    executor: 'nx:run-commands',
                    options: {
                      command: 'jest',
                      cwd: projectRoot,
                    },
                    cache: true,
                  },
                  'test:watch': {
                    executor: 'nx:run-commands',
                    options: {
                      command: 'jest --watch',
                      cwd: projectRoot,
                    },
                  },
                  'test:coverage': {
                    executor: 'nx:run-commands',
                    options: {
                      command: 'jest --coverage',
                      cwd: projectRoot,
                    },
                    cache: true,
                  },
                },
              },
            },
          },
        ];
      }

      // Python project
      if (isPython) {
        const projectName = projectRoot.split('/').pop() || projectRoot;

        return [
          configFile,
          {
            projects: {
              [projectRoot]: {
                name: projectName,
                root: projectRoot,
                targets: {
                  'test:test': {
                    executor: 'nx:run-commands',
                    options: {
                      command: 'uv run pytest',
                      cwd: projectRoot,
                    },
                    cache: true,
                  },
                  'test:watch': {
                    executor: 'nx:run-commands',
                    options: {
                      command: 'uv run pytest-watch',
                      cwd: projectRoot,
                    },
                  },
                  'test:coverage': {
                    executor: 'nx:run-commands',
                    options: {
                      command:
                        'uv run pytest --cov=src --cov-report=html --cov-report=term',
                      cwd: projectRoot,
                    },
                    cache: true,
                  },
                  'lint:check': {
                    executor: 'nx:run-commands',
                    options: {
                      command:
                        'uv run ruff check . && uv run ruff format --check .',
                      cwd: projectRoot,
                    },
                    cache: true,
                  },
                  'lint:fix': {
                    executor: 'nx:run-commands',
                    options: {
                      command:
                        'uv run ruff check --fix . && uv run ruff format .',
                      cwd: projectRoot,
                    },
                  },
                },
              },
            },
          },
        ];
      }

      return [configFile, {}];
    });
  },
];
