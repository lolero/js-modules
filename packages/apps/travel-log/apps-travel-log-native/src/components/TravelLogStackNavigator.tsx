import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type React from 'react';
import {
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import { useInitializeKeycloak } from '@js-modules/apps-travel-log-common-react';
import {
  ClientType,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-travel-log-common-store-redux';
import { FeedsScreenView } from '@js-modules/apps-travel-log-native-module-private-feeds';
import {
  InitScreenView,
  StartScreenView,
} from '@js-modules/apps-travel-log-native-module-public-start';

const Stack = createNativeStackNavigator();

export const TravelLogStackNavigator: React.FC = () => {
  const { isKeycloakReady } = useInitializeKeycloak(ClientType.native);

  const { isAuthenticated } = useStateAuthReducerMetadata();

  if (!isKeycloakReady) {
    return <InitScreenView />;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        !isAuthenticated ? WebModulesPublic.home : WebModulesPrivate.feeds
      }
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name={WebModulesPublic.home}
          component={StartScreenView}
        />
      ) : (
        <>
          <Stack.Screen
            name={WebModulesPrivate.feeds}
            component={FeedsScreenView}
          />
          <Stack.Screen
            name={WebModulesPrivate.log}
            component={FeedsScreenView}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
