// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CustomExpandIcon = React.forwardRef<SVGSVGElement, any>((props, ref) => (
  <ExpandMoreIcon ref={ref} {...props} />
));

export const CustomCollapseIcon = React.forwardRef<SVGSVGElement, any>((props, ref) => (
  <ExpandMoreIcon
    ref={ref}
    {...props}
    sx={{
      transform: 'rotateZ(180deg)',
    }}
  />
));
