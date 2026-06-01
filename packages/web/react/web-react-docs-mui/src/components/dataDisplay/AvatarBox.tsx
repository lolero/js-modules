import type React from 'react';
import BadgeAvatars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/BadgeAvatars';
import GroupAvatars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/GroupAvatars';
import IconAvatars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/IconAvatars';
import ImageAvatars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/ImageAvatars';
import LetterAvatars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/LetterAvatars';
import SizeAvatars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/SizeAvatars';
import Spacing from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/Spacing';
import VariantAvatars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/avatars/VariantAvatars';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Image',
    url: 'https://mui.com/material-ui/react-avatar/#image-avatars',
    example: <ImageAvatars />,
  },
  {
    name: 'Letter',
    url: 'https://mui.com/material-ui/react-avatar/#letter-avatars',
    example: <LetterAvatars />,
  },
  {
    name: 'Icon',
    url: 'https://mui.com/material-ui/react-avatar/#icon-avatars',
    example: <IconAvatars />,
  },
  {
    name: 'Variant',
    url: 'https://mui.com/material-ui/react-avatar/#variants',
    example: <VariantAvatars />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-avatar/#sizes',
    example: <SizeAvatars />,
  },
  {
    name: 'Group',
    url: 'https://mui.com/material-ui/react-avatar/#grouped',
    example: <GroupAvatars />,
  },
  {
    name: 'Spacing',
    url: 'https://mui.com/material-ui/react-avatar/#spacing',
    example: <Spacing />,
  },
  {
    name: 'Badge',
    url: 'https://mui.com/material-ui/react-avatar/#with-badge',
    example: <BadgeAvatars />,
  },
];

export function AvatarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
