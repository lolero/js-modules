// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

export default function SimpleBadge() {
  return (
    <IconButton aria-label="show 4 unread messages">
      <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}
