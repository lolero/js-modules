import type React from 'react';
import MasonryImageList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/image-list/MasonryImageList';
import QuiltedImageList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/image-list/QuiltedImageList';
import StandardImageList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/image-list/StandardImageList';
import TitlebarBelowImageList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/image-list/TitlebarBelowImageList';
import TitlebarBelowMasonryImageList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/image-list/TitlebarBelowMasonryImageList';
import TitlebarImageList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/image-list/TitlebarImageList';
import WovenImageList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/image-list/WovenImageList';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-image-list/#standard-image-list',
    example: <StandardImageList />,
  },
  {
    name: 'Quilted',
    url: 'https://mui.com/material-ui/react-image-list/#quilted-image-list',
    example: <QuiltedImageList />,
  },
  {
    name: 'Woven',
    url: 'https://mui.com/material-ui/react-image-list/#woven-image-list',
    example: <WovenImageList />,
  },
  {
    name: 'Masonry',
    url: 'https://mui.com/material-ui/react-image-list/#masonry-image-list',
    example: <MasonryImageList />,
  },
  {
    name: 'Title bars',
    url: 'https://mui.com/material-ui/react-image-list/#image-list-with-title-bars',
    example: <TitlebarImageList />,
  },
  {
    name: 'Title bars below image',
    url: 'https://mui.com/material-ui/react-image-list/#title-bar-below-image-standard',
    example: <TitlebarBelowImageList />,
  },
  {
    name: 'Title bars below image masonry',
    url: 'https://mui.com/material-ui/react-image-list/#title-bar-below-image-masonry',
    example: <TitlebarBelowMasonryImageList />,
  },
];

export function ImageListBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
