import React, {
  forwardRef,
  ComponentProps,
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import FontAwesome6Icon from '@react-native-vector-icons/fontawesome6';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import {
  IconDefinition,
  IconPrefix,
  IconStyle,
} from '@fortawesome/fontawesome-common-types';

export const iconStylesByPrefix: Partial<Record<IconPrefix, IconStyle>> = {
  fab: 'brand' as IconStyle,
  fad: 'duotone',
  fal: 'light',
  far: 'regular',
  fas: 'solid',
};

export type NativeFaIconProps = {
  icon: IconDefinition;
  color?: IconProps['color'];
  size?: IconProps['size'];
};

type NativeFaIconRef = ComponentRef<typeof FontAwesome6Icon>;

export const NativeFaIcon: ForwardRefExoticComponent<
  NativeFaIconProps & RefAttributes<NativeFaIconRef>
> = forwardRef<NativeFaIconRef, NativeFaIconProps>((props, ref) => {
  const {
    color,
    icon: { prefix, iconName },
    size,
  } = props;

  return (
    <FontAwesome6Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...({
        ref,
        name: iconName,
        iconStyle: iconStylesByPrefix[prefix],
        size,
        color,
      } as ComponentProps<typeof FontAwesome6Icon>)}
    />
  );
});
