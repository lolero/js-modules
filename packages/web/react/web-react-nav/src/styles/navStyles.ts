import { Theme } from '@mui/material/styles';

type BoxShadow = {
  blurRadius: string;
  color: string;
  offsetX: string;
  offsetY: string;
  spreadRadius: string;
};

function getBoxShadowString(boxShadows: BoxShadow[]): string {
  const shadowStrings = boxShadows.map((boxShadow) => {
    return `
            ${boxShadow.offsetX}
            ${boxShadow.offsetY}
            ${boxShadow.blurRadius}
            ${boxShadow.spreadRadius}
            ${boxShadow.color}
        `;
  });
  return shadowStrings.join(', ');
}

const BOX_SHADOW_HORIZONTAL: BoxShadow = {
  offsetX: '1px',
  offsetY: '0px',
  blurRadius: '10px',
  spreadRadius: '0px',
  color: 'rgb(0 0 0 / 20%)',
};

const BOX_SHADOW_VERTICAL: BoxShadow = {
  offsetX: '0px',
  offsetY: '1px',
  blurRadius: '10px',
  spreadRadius: '0px',
  color: 'rgb(0 0 0 / 20%)',
};

export const NavBoxShadowHorizontalSx = {
  boxShadow: getBoxShadowString([BOX_SHADOW_HORIZONTAL]),
  clipPath: `inset(0 0 -${BOX_SHADOW_HORIZONTAL.blurRadius} 0)`,
} as const;

export const NavBoxShadowVerticalSx = {
  boxShadow: getBoxShadowString([BOX_SHADOW_VERTICAL]),
  clipPath: `inset(0 -${BOX_SHADOW_VERTICAL.blurRadius} 0 0)`,
} as const;

export const workspaceToolbarFabSx = {
  minHeight: 0,
  height: (theme: Theme) => theme.spacing(3.5),
  width: (theme: Theme) => theme.spacing(3.5),
} as const;

export const workspaceToolbarButtonsBox = {
  whiteSpace: 'nowrap',
} as const;
