import { runCommand } from '../common/common.utils';
import { getAndroidEmulatorBin } from './react-native.utils';

process.exit(runCommand(getAndroidEmulatorBin(), ['-list-avds']));
