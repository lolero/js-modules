import type {
  IconDefinition,
  IconPrefix,
  IconStyle,
} from '@fortawesome/fontawesome-common-types';
import FontAwesome6Icon from '@react-native-vector-icons/fontawesome6';
import type { ComponentProps, ComponentRef, Ref } from 'react';
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

/**
 * Font Awesome icon for React Native, mapping an `IconDefinition` onto
 * `@react-native-vector-icons/fontawesome6`.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying icon element.
 * @param props.color - Icon color.
 * @param props.icon - Font Awesome icon definition to render.
 * @param props.icon.prefix - Style prefix, mapped onto the native icon style.
 * @param props.icon.iconName - Name the native icon set is looked up by.
 * @param props.size - Icon size.
 * @returns The icon element.
 */
export function NativeFaIcon({
  ref,
  color,
  icon: { prefix, iconName },
  size,
}: NativeFaIconProps & { ref?: Ref<NativeFaIconRef> }) {
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
}
