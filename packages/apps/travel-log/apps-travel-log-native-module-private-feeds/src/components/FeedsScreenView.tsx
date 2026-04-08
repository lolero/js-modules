import type React from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { useStateSettingsReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { NativeFaIcon } from '@js-modules/native-react-utils';

export const FeedsScreenView: React.FC = () => {
  const { profile } = useStateSettingsReducerMetadata();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon
        source={
          <NativeFaIcon
            icon={routesMetadataPrivate[WebModulesPrivate.feeds].icon}
          />
        }
        size={40}
      />
      <Text variant="headlineLarge">Feeds</Text>
      <Text variant="bodyLarge">eMail: {profile?.email}</Text>
    </View>
  );
};
