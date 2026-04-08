import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { HealthCheckStatus, printHealthCheck } from '../common/common.utils';

export const HealthCheckType = {
  binary: 'binary',
  config: 'config',
  files: 'files',
  stdout: 'stdout',
  targets: 'targets',
} as const;
export type HealthCheckType =
  (typeof HealthCheckType)[keyof typeof HealthCheckType];

/**
 * Maps a boolean to an OK or fail health-check status.
 * @param isOk - Whether or not the check passed.
 * @returns Health check status.
 */
export function isOkToStatus(isOk: boolean): HealthCheckStatus {
  return isOk ? HealthCheckStatus.ok : HealthCheckStatus.fail;
}

const skipPrefix = `${HealthCheckStatus.skip}: ` as const;
type SkipSentinel = `${typeof skipPrefix}${string}`;
type HealthCheck = () => boolean | SkipSentinel;
type HealthChecks = Record<HealthCheckType, HealthCheck>;

type HealthChecksHelpers = {
  [HealthCheckType.binary]: (
    label: string,
    command: string,
    args?: string[],
  ) => boolean;
  [HealthCheckType.config]: (configPath: string) => boolean;
  [HealthCheckType.files]: (label: string, paths: string[]) => boolean;
  // With `mustInclude`: exit 0 AND stdout contains the substring.
  // Without: exit 0 AND stdout non-empty.
  [HealthCheckType.stdout]: (
    label: string,
    command: string,
    args: string[],
    mustInclude?: string,
  ) => boolean;
  [HealthCheckType.targets]: (targets: string[]) => boolean;
  [HealthCheckStatus.skip]: (reason: string) => () => SkipSentinel;
};

export const healthChecksHelpers: HealthChecksHelpers = {
  [HealthCheckType.binary]: (label, command, args = ['--version']) => {
    const isOk = spawnSync(command, args, { stdio: 'ignore' }).status === 0;
    printHealthCheck(
      HealthCheckType.binary,
      `\`${label}\` invocable`,
      isOkToStatus(isOk),
    );
    return isOk;
  },
  [HealthCheckType.config]: (configPath) => {
    const isOk = existsSync(configPath);
    printHealthCheck(
      HealthCheckType.config,
      `exists (${configPath})`,
      isOkToStatus(isOk),
    );
    return isOk;
  },
  [HealthCheckType.files]: (label, paths) => {
    const isOk = paths.every((p) => existsSync(p));
    printHealthCheck(
      HealthCheckType.files,
      `${label} (${paths.length})`,
      isOkToStatus(isOk),
    );
    return isOk;
  },
  [HealthCheckType.stdout]: (label, command, args, mustInclude) => {
    const result = spawnSync(command, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const isOk =
      result.status === 0 &&
      (mustInclude !== undefined
        ? result.stdout.includes(mustInclude)
        : result.stdout.length > 0);
    printHealthCheck(HealthCheckType.stdout, label, isOkToStatus(isOk));
    return isOk;
  },
  [HealthCheckType.targets]: (targets) => {
    const isOk = targets.length > 0;
    printHealthCheck(
      HealthCheckType.targets,
      `resolved (${targets.length})`,
      isOkToStatus(isOk),
    );
    return isOk;
  },
  [HealthCheckStatus.skip]: (reason) => () => `${skipPrefix}${reason}`,
};

/**
 * Runs health checks and returns 0 only if none fail.
 * @param healthChecks - Health check functions by health check type.
 * @returns 0 if all checks passed or were skipped, 1 if any failed.
 */
export function healthCheckExitCode(healthChecks: HealthChecks): number {
  let allOk = true;
  for (const healthCheckType of Object.values(HealthCheckType)) {
    const healthCheckResult = healthChecks[healthCheckType]();
    if (typeof healthCheckResult === 'boolean') {
      if (!healthCheckResult) {
        allOk = false;
      }
    } else {
      const reason = healthCheckResult.slice(skipPrefix.length);
      printHealthCheck(healthCheckType, reason, HealthCheckStatus.skip);
    }
  }
  return allOk ? 0 : 1;
}
