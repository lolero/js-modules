import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const MyFeedsScreenView: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text variant="headlineLarge">My Feeds</Text>
    </View>
  );
};
