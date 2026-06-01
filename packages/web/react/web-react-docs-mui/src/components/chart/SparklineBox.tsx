import type React from 'react';
import AreaSparkLine from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sparkline/AreaSparkLine';
import BasicSparkLine from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sparkline/BasicSparkLine';
import BasicSparkLineCustomization from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sparkline/BasicSparkLineCustomization';
import ColorCustomization from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sparkline/ColorCustomization';
import ColorCustomizationMode from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sparkline/ColorCustomizationMode';
import NpmSparkLine from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sparkline/NpmSparkLine';
import SparklineLineWidth from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sparkline/SparklineLineWidth';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-charts/sparkline/#overview',
    example: <NpmSparkLine />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/sparkline/#basics',
    example: <BasicSparkLine />,
  },
  {
    name: 'Area',
    url: 'https://mui.com/x/react-charts/sparkline/#line-customization',
    example: <AreaSparkLine />,
  },
  {
    name: 'Interaction',
    url: 'https://mui.com/x/react-charts/sparkline/#interaction',
    example: <BasicSparkLineCustomization />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/x/react-charts/sparkline/#color-customization',
    example: <ColorCustomization />,
  },
  {
    name: 'Light mode',
    url: 'https://mui.com/x/react-charts/sparkline/#color-customization',
    example: <ColorCustomizationMode />,
  },
  {
    name: 'Line width',
    url: 'https://mui.com/x/react-charts/sparkline/#line-width',
    example: <SparklineLineWidth />,
  },
];

export function SparklineBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
