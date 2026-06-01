import type React from 'react';
import BasicRating from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/rating/BasicRating';
import HalfRating from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/rating/HalfRating';
import RatingSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/rating/RatingSize';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-rating/#basic-rating',
    example: <BasicRating />,
  },
  {
    name: 'Precision',
    url: 'https://mui.com/material-ui/react-rating/#rating-precision',
    example: <HalfRating />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-rating/#sizes',
    example: <RatingSize />,
  },
];

export function RatingBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
