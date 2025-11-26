import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const StartScreenView: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text variant="headlineLarge">Hello Travel Log!</Text>
      <Text variant="bodyLarge">Your React Native app is working!</Text>
    </View>
  );
};
