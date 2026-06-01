import type React from 'react';
import DotsMobileStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/DotsMobileStepper';
import HorizontalLinearAlternativeLabelStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/HorizontalLinearAlternativeLabelStepper';
import HorizontalLinearStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/HorizontalLinearStepper';
import HorizontalNonLinearStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/HorizontalNonLinearStepper';
import ProgressMobileStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/ProgressMobileStepper';
import TextMobileStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/TextMobileStepper';
import VerticalLinearAlternativeLabelStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/VerticalLinearAlternativeLabelStepper';
import VerticalLinearStepper from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/steppers/VerticalLinearStepper';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Linear',
    url: 'https://mui.com/material-ui/react-stepper/#linear',
    example: <HorizontalLinearStepper />,
  },
  {
    name: 'Non-linear',
    url: 'https://mui.com/material-ui/react-stepper/#non-linear',
    example: <HorizontalNonLinearStepper />,
  },
  {
    name: 'Alternative label',
    url: 'https://mui.com/material-ui/react-stepper/#alternative-label',
    example: <HorizontalLinearAlternativeLabelStepper />,
  },
  {
    name: 'Vertical',
    url: 'https://mui.com/material-ui/react-stepper/#vertical-stepper',
    example: <VerticalLinearStepper />,
  },
  {
    name: 'Vertical alternative label',
    url: 'https://mui.com/material-ui/react-stepper/#vertical-stepper',
    example: <VerticalLinearAlternativeLabelStepper />,
  },
  {
    name: 'Mobile text',
    url: 'https://mui.com/material-ui/react-stepper/#text',
    example: <TextMobileStepper />,
  },
  {
    name: 'Mobile dots',
    url: 'https://mui.com/material-ui/react-stepper/#dots',
    example: <DotsMobileStepper />,
  },
  {
    name: 'Mobile progress',
    url: 'https://mui.com/material-ui/react-stepper/#progress',
    example: <ProgressMobileStepper />,
  },
];

export function StepperBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
