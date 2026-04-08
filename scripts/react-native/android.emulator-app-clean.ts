import { join } from 'path';
import { runCommand } from '../common/common.utils';

process.exit(
  runCommand(
    process.platform === 'win32' ? 'gradlew.bat' : './gradlew',
    ['clean'],
    { cwd: join(process.cwd(), 'android') },
  ),
);
