import type React from 'react';
import MainDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/chat/mainDemo/MainDemo';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-chat/',
    example: <MainDemo />,
  },
];

export function ChatBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
