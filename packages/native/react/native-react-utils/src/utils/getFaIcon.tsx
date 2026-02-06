import React from 'react';
import FontAwesome6Icon from '@react-native-vector-icons/fontawesome6';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import { iconStylesByPrefix } from '../constants/iconTypesByPrefix';

export const getFaIcon = (icon: IconDefinition) => {
  return ({ color, size }: IconProps & { color: string }) => {
    return (
      <FontAwesome6Icon
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name={icon.iconName}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        iconStyle={iconStylesByPrefix[icon.prefix]}
        size={size}
        color={color}
      />
    );
  };
};
