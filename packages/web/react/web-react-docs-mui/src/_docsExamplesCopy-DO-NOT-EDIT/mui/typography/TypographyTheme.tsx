// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  padding: theme.spacing(1),
}));

export default function TypographyTheme() {
  return <Div>{"This div's text looks like that of a button."}</Div>;
}
