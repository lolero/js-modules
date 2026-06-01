import type React from 'react';
import AccordionExpandIcon from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/accordion/AccordionExpandIcon';
import AccordionTransition from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/accordion/AccordionTransition';
import AccordionUsage from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/accordion/AccordionUsage';
import DisabledAccordion from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/accordion/DisabledAccordion';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-accordion/#introduction',
    example: <AccordionUsage />,
  },
  {
    name: 'Expand icon',
    url: 'https://mui.com/material-ui/react-accordion/#expand-icon',
    example: <AccordionExpandIcon />,
  },
  {
    name: 'Transition',
    url: 'https://mui.com/material-ui/react-accordion/#transition',
    example: <AccordionTransition />,
  },
  {
    name: 'Disabled item',
    url: 'https://mui.com/material-ui/react-accordion/#disabled-item',
    example: <DisabledAccordion />,
  },
];

export function AccordionBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
