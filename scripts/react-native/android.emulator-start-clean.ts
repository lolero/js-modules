import { spawn, spawnSync } from 'child_process';
import { join } from 'path';
import { runCommand } from '../common/common.utils';
import { getAndroidEmulatorBin } from './react-native.utils';

const [avd, certPath] = process.argv.slice(2);
if (!avd || !certPath) {
  console.error(
    'Usage: tsx android.emulator-start-clean.ts <avd-name> <cert-path>',
  );
  process.exit(1);
}

/**
 * Runs an adb command and returns its trimmed stdout.
 * @param args - adb arguments.
 * @returns Trimmed stdout of the adb invocation.
 */
function adbOutput(args: string[]): string {
  return (spawnSync('adb', args, { encoding: 'utf8' }).stdout ?? '').trim();
}

/**
 * Wait a given number of milliseconds.
 * @param ms - Duration to wait in milliseconds.
 * @returns Promise that resolves once the delay has elapsed.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const emulatorProc = spawn(
  getAndroidEmulatorBin(),
  ['-avd', avd, '-wipe-data', '-no-snapshot'],
  { stdio: 'inherit' },
);
console.log(`Starting emulator (PID: ${emulatorProc.pid})...`);

/**
 * Sends SIGTERM to the emulator process and exits once it closes.
 */
function shutdown(): void {
  console.log('Stopping emulator...');
  emulatorProc.kill('SIGTERM');
  emulatorProc.on('close', () => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

void (async (): Promise<void> => {
  runCommand('adb', ['wait-for-device']);
  console.log('Device detected, waiting for boot to complete...');
  while (adbOutput(['shell', 'getprop', 'sys.boot_completed']) !== '1') {
    await sleep(2000);
  }
  console.log('Boot completed, waiting for storage to be ready...');
  while (
    adbOutput(['shell', 'test -w /sdcard/Download && echo ready']) !== 'ready'
  ) {
    await sleep(2000);
  }
  console.log('Storage ready, pushing certificate...');
  runCommand('adb', [
    'push',
    join(process.cwd(), certPath),
    '/sdcard/Download/nginx-selfsigned.crt',
  ]);
  console.log('Certificate pushed. Opening Security settings...');
  runCommand('adb', [
    'shell',
    'am',
    'start',
    '-a',
    'android.settings.SECURITY_SETTINGS',
  ]);
  console.log(
    "Navigate to 'More security & privacy' > 'Encryption & credentials' > 'Install a certificate' > 'CA certificate' > select nginx-selfsigned.crt",
  );
  console.log(
    `Emulator is running (PID: ${emulatorProc.pid}). Press Ctrl-C to stop.`,
  );
  await new Promise<void>((resolve) => emulatorProc.on('close', resolve));
})();
