// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function DotBadge() {
  return (
    <IconButton aria-label="show new notifications">
      <Badge color="secondary" variant="dot">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
