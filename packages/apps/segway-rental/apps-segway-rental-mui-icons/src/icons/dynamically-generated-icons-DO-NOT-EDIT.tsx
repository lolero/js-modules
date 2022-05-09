import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { ReactComponent as SegwayRentalLogoIconSvg } from '../assets/segway-rental-logo.svg';

/* eslint-disable react/jsx-props-no-spreading, prettier/prettier */
export const SegwayRentalLogoIcon: React.FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon component={SegwayRentalLogoIconSvg} viewBox="0 0 128 128" {...props} />
);
/* eslint-enable react/jsx-props-no-spreading, prettier/prettier */
