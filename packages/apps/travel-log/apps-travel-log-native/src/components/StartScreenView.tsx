import React from 'react';
import { View, Text } from 'react-native';

export const StartScreenView: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 10,
        }}
      >
        Hello Travel Log!
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#666',
        }}
      >
        Your React Native app is working!
      </Text>
    </View>
  );
};
