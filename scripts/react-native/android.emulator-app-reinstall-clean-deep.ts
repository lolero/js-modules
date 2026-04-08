import { exitOnFailure, runCommand } from '../common/common.utils';

const project = process.env['NX_TASK_TARGET_PROJECT']!;
exitOnFailure(
  runCommand('pnpm', ['nx', 'react-native:android:emulator-app-exit', project]),
);
runCommand('pnpm', [
  'nx',
  'react-native:android:emulator-app-uninstall',
  project,
]); // app may not be installed
exitOnFailure(
  runCommand('pnpm', [
    'nx',
    'react-native:android:emulator-app-clean-deep',
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
