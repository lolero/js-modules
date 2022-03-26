import React, { forwardRef } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

export type MuiFaIconProps = Omit<SvgIconProps, 'viewBox'> &
  Pick<
    FontAwesomeIconProps,
    | 'beat'
    | 'beatFade'
    | 'border'
    | 'bounce'
    | 'fade'
    | 'fixedWidth'
    | 'inverse'
    | 'listItem'
    | 'pull'
    | 'rotation'
    | 'shake'
    | 'spin'
    | 'swapOpacity'
  > & {
    icon: IconDefinition;
    flip?: boolean;
    flipDirection?: FontAwesomeIconProps['flip'];
    spinReverse?: boolean;
    spinPulse?: boolean;
  };

const MuiFaIcon = forwardRef<SVGSVGElement, MuiFaIconProps>((props, ref) => {
  const {
    className,
    beat,
    beatFade,
    border,
    bounce,
    fade,
    fixedWidth,
    inverse,
    listItem,
    pull,
    rotation,
    shake,
    spin,
    swapOpacity,
    icon,
    flip,
    flipDirection,
    spinPulse,
    spinReverse,
    ...muiProps
  } = props;

  const {
    prefix,
    iconName,
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      data-prefix={prefix}
      data-icon={iconName}
      role="img"
      className={clsx(
        className,
        'svg-inline--fa',
        beat && 'fa-beat',
        beatFade && 'fa-beat-fade',
        border && 'fa-border',
        bounce && 'fa-bounce',
        fade && 'fa-fade',
        fixedWidth && 'fa-fw',
        flip && `fa-flip`,
        flipDirection && `fa-flip-${flipDirection}`,
        inverse && 'fa-inverse',
        listItem && 'fa-li',
        pull && `fa-pull-${pull}`,
        rotation && `fa-rotate-${rotation}`,
        shake && 'fa-shake',
        spin && 'fa-spin',
        spinPulse && 'fa-spin fa-spin-pulse',
        spinReverse && 'fa-spin fa-spin-reverse',
        swapOpacity && 'fa-swap-opacity',
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...muiProps}
    >
      {typeof svgPathData === 'string' ? (
        <path d={svgPathData} />
      ) : (
        svgPathData.map((d: string, i: number) => (
          <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});

export default MuiFaIcon;
