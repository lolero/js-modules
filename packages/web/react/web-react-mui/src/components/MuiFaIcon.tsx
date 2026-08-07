import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import type { SvgIconProps } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { clsx } from 'clsx';
import '@fortawesome/fontawesome-svg-core/styles.css';

export type MuiFaIconProps = Omit<SvgIconProps, 'viewBox'> &
  Pick<
    FontAwesomeIconProps,
    | 'beat'
    | 'beatFade'
    | 'border'
    | 'bounce'
    | 'fade'
    | 'inverse'
    | 'pull'
    | 'rotation'
    | 'shake'
    | 'spin'
    | 'swapOpacity'
    | 'widthAuto'
  > & {
    icon: IconDefinition;
    flip?: boolean;
    flipDirection?: FontAwesomeIconProps['flip'];
    spinPulse?: boolean;
    spinReverse?: boolean;
  };

/**
 * MUI `SvgIcon` rendering a Font Awesome `IconDefinition`, so icons pick up the
 * theme's icon sizing and colors while keeping Font Awesome's animation props.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying `<svg>` element.
 * @param props.className - Extra classes, merged with the Font Awesome ones.
 * @param props.icon - Font Awesome icon definition to render.
 * @param props.beat - Scale the icon up and down.
 * @param props.beatFade - Combine the beat and fade animations.
 * @param props.border - Draw a border around the icon.
 * @param props.bounce - Bounce the icon.
 * @param props.fade - Fade the icon in and out.
 * @param props.inverse - Invert the icon's color.
 * @param props.pull - Float the icon left or right of adjacent text.
 * @param props.rotation - Rotate the icon by a fixed number of degrees.
 * @param props.shake - Shake the icon.
 * @param props.spin - Spin the icon.
 * @param props.spinPulse - Spin the icon in eight discrete steps.
 * @param props.spinReverse - Reverse the spin direction.
 * @param props.swapOpacity - Swap the two layers' opacity, for duotone icons.
 * @param props.flip - Flip the icon.
 * @param props.flipDirection - Axis to flip the icon on.
 * @param props.widthAuto - Size the icon to its symbol rather than the full icon canvas.
 * @returns The icon element.
 */
export function MuiFaIcon({
  ref,
  className,
  icon,
  beat,
  beatFade,
  border,
  bounce,
  fade,
  inverse,
  pull,
  rotation,
  shake,
  spin,
  spinPulse,
  spinReverse,
  swapOpacity,
  flip,
  flipDirection,
  widthAuto,
  ...muiProps
}: MuiFaIconProps) {
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
        flip && `fa-flip`,
        flipDirection && `fa-flip-${flipDirection}`,
        inverse && 'fa-inverse',
        pull && `fa-pull-${pull}`,
        rotation && `fa-rotate-${rotation}`,
        shake && 'fa-shake',
        spin && 'fa-spin',
        spinPulse && 'fa-spin fa-spin-pulse',
        spinReverse && 'fa-spin fa-spin-reverse',
        swapOpacity && 'fa-swap-opacity',
        widthAuto && 'fa-width-auto',
      )}
      {...muiProps}
    >
      {typeof svgPathData === 'string' ? (
        <path d={svgPathData} />
      ) : (
        svgPathData.map((d: string, i: number) => (
          <path
            key={`${d}-${i}`}
            style={{ opacity: i === 0 ? 0.4 : 1 }}
            d={d}
          />
        ))
      )}
    </SvgIcon>
  );
}
