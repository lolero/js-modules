import type React from 'react';
import {
  WebModules,
  WebSubModulesFeedback,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { AlertBox } from './AlertBox';
import { BackdropBox } from './BackdropBox';
import { DialogBox } from './DialogBox';
import { ProgressBox } from './ProgressBox';
import { SkeletonBox } from './SkeletonBox';
import { SnackbarBox } from './SnackbarBox';

const subModuleBoxes: Record<WebSubModulesFeedback, React.ReactNode> = {
  [WebSubModulesFeedback.alert]: <AlertBox />,
  [WebSubModulesFeedback.backdrop]: <BackdropBox />,
  [WebSubModulesFeedback.dialog]: <DialogBox />,
  [WebSubModulesFeedback.progress]: <ProgressBox />,
  [WebSubModulesFeedback.skeleton]: <SkeletonBox />,
  [WebSubModulesFeedback.snackbar]: <SnackbarBox />,
};

export function FeedbackRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.feedback}
      subModuleBoxes={subModuleBoxes}
    />
  );
}
