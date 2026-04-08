import { runCommand } from '../common/common.utils';

if (process.platform === 'win32') {
  runCommand('taskkill', ['/F', '/FI', 'COMMANDLINE eq cli.js start']);
} else {
  runCommand('pkill', ['-9', '-f', 'cli.js start']);
}
