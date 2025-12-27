import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Icon, Text } from 'react-native-paper';
import {
  useStateAuthLogin,
  useStateSettingsGetProfile,
} from '@js-modules/apps-travel-log-common-store-redux';
import {
  routesMetadataPrivate,
  routesMetadataPublic,
} from '@js-modules/apps-travel-log-common-react';
import {
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { getFaIconGenerator } from '@js-modules/native-react-utils';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

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
      <Icon
        source={getFaIconGenerator(
          routesMetadataPublic[WebModulesPublic.home].icon,
        )}
        size={40}
      />
      <Icon
        source={getFaIconGenerator(
          routesMetadataPrivate[WebModulesPrivate.myBoards].icon,
        )}
        size={40}
      />
      <Text variant="headlineLarge">Welcome to Travel Log!</Text>
      <Button
        mode="contained"
        onPress={stateAuthLoginCallback}
        loading={stateAuthLoginRequest?.isPending}
        disabled={stateAuthLoginRequest?.isPending}
        icon={getFaIconGenerator(faRightToBracket) as IconSource}
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
