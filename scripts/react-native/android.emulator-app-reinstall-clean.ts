import { exitOnFailure, runCommand } from '../common/common.utils';

const project = process.env['NX_TASK_TARGET_PROJECT']!;
exitOnFailure(
  runCommand('pnpm', ['nx', 'react-native:android:emulator-app-exit', project]),
);
// Don't exit on failure as app may not be installed
runCommand('pnpm', [
  'nx',
  'react-native:android:emulator-app-uninstall',
  project,
]);
exitOnFailure(
  runCommand('pnpm', [
    'nx',
    'react-native:android:emulator-app-clean',
    project,
  ]),
);
exitOnFailure(
  runCommand('pnpm', [
    'nx',
    'react-native:android:emulator-app-install',
    project,
  ]),
);
process.exit(
  runCommand('pnpm', ['nx', 'react-native:android:emulator-app-run', project]),
);
