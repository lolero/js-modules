import { homedir } from 'os';
import { join } from 'path';

/**
 * Get platform-appropriate Android SDK root path.
 * @returns Absolute path to the Android SDK directory.
 */
export function getAndroidSdkRoot(): string {
  return process.platform === 'win32'
    ? join(process.env['LOCALAPPDATA'] ?? homedir(), 'Android', 'Sdk')
    : join(homedir(), 'Android', 'Sdk');
}

/**
 * Get path to the Android emulator binary.
 * @returns Absolute path to the emulator executable.
 */
export function getAndroidEmulatorBin(): string {
  return join(
    getAndroidSdkRoot(),
    'emulator',
    process.platform === 'win32' ? 'emulator.exe' : 'emulator',
  );
}
