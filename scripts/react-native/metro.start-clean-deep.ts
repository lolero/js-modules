import { readdirSync, rmSync } from 'fs';
import { homedir, tmpdir } from 'os';
import { join } from 'path';
import { runCommand } from '../common/common.utils';

runCommand('watchman', ['shutdown-server']); // ignore failure (may not be running)

for (const entry of readdirSync(tmpdir())) {
  if (entry.startsWith('metro-')) {
    rmSync(join(tmpdir(), entry), { recursive: true, force: true });
  }
}
rmSync(join(homedir(), '.metro'), { recursive: true, force: true });

const project = process.env['NX_TASK_TARGET_PROJECT']!;
process.exit(
  runCommand('pnpm', ['nx', 'react-native:metro:start-clean', project]),
);
