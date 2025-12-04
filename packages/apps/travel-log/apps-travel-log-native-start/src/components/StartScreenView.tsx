import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import {
  useStateAuthLogin,
  useStateSettingsGetProfile,
} from '@js-modules/apps-travel-log-common-store-redux';

export const StartScreenView: React.FC = () => {
  const { callback: stateSettingsGetProfileCallback } =
    useStateSettingsGetProfile();

  const { request: stateAuthLoginRequest, callback: stateAuthLoginCallback } =
    useStateAuthLogin({}, stateSettingsGetProfileCallback);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text variant="headlineLarge">Welcome to Travel Log!</Text>
      <Button
        mode="contained"
        onPress={stateAuthLoginCallback}
        loading={stateAuthLoginRequest?.isPending}
        disabled={stateAuthLoginRequest?.isPending}
      >
        Sign In
      </Button>
      {stateAuthLoginRequest?.error && (
        <View>
          <Text variant="bodySmall">Login failed :(</Text>
          <Text variant="bodySmall">
            {String(stateAuthLoginRequest?.error)}
          </Text>
        </View>
      )}
      {stateAuthLoginRequest?.isPending && (
        <View>
          <ActivityIndicator size="small" />
          <Text variant="bodySmall">Opening browser...</Text>
        </View>
      )}
    </View>
  );
};
