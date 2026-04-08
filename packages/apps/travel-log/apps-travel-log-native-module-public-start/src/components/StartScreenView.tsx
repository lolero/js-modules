import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import type React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Icon, Text } from 'react-native-paper';
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import {
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import {
  routesMetadataPrivate,
  routesMetadataPublic,
} from '@js-modules/apps-travel-log-common-react';
import {
  useStateAuthLogin,
  useStateSettingsGetProfile,
} from '@js-modules/apps-travel-log-common-store-redux';
import { NativeFaIcon } from '@js-modules/native-react-utils';

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
        source={
          <NativeFaIcon
            icon={routesMetadataPublic[WebModulesPublic.home].icon}
          />
        }
        size={40}
      />
      <Icon
        source={
          <NativeFaIcon
            icon={routesMetadataPrivate[WebModulesPrivate.boards].icon}
          />
        }
        size={40}
      />
      <Text variant="headlineLarge">Welcome to Travel Log!</Text>
      <Button
        mode="contained"
        onPress={stateAuthLoginCallback}
        loading={stateAuthLoginRequest?.isPending}
        disabled={stateAuthLoginRequest?.isPending}
        icon={(<NativeFaIcon icon={faRightToBracket} />) as IconSource}
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
