import { runCommand } from '../common/common.utils';
import { getAndroidEmulatorBin } from './react-native.utils';

const avd = process.argv[2];
if (!avd) {
  console.error('Usage: tsx android.emulator-start.ts <avd-name>');
  process.exit(1);
}

process.exit(runCommand(getAndroidEmulatorBin(), ['-avd', avd]));
