import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export const InitScreenView: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text variant="headlineLarge">Welcome to Travel Log!</Text>
      <Text variant="bodyLarge">Initializing...</Text>
      <ActivityIndicator animating size="large" />
    </View>
  );
};
