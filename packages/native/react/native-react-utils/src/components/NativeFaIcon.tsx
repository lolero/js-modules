import type {
  IconDefinition,
  IconPrefix,
  IconStyle,
} from '@fortawesome/fontawesome-common-types';
import FontAwesome6Icon from '@react-native-vector-icons/fontawesome6';
import type {
  ComponentProps,
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import type { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

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
> = forwardRef<NativeFaIconRef, NativeFaIconProps>(
  function NativeFaIcon(props, ref) {
    const {
      color,
      icon: { prefix, iconName },
      size,
    } = props;

    return (
      <FontAwesome6Icon
        {...({
          ref,
          name: iconName,
          iconStyle: iconStylesByPrefix[prefix],
          size,
          color,
        } as ComponentProps<typeof FontAwesome6Icon>)}
      />
    );
  },
);
