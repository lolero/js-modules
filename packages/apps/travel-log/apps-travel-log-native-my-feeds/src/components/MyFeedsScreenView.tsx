import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useStateSettingsReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';

export const MyFeedsScreenView: React.FC = () => {
  const { profile } = useStateSettingsReducerMetadata();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text variant="headlineLarge">My Feeds</Text>
      <Text variant="bodyLarge">eMail: {profile?.email}</Text>
    </View>
  );
};
