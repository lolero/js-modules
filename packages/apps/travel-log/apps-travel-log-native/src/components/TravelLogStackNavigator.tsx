import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import {
  InitScreenView,
  StartScreenView,
} from '@js-modules/apps-travel-log-native-start';
import { useInitializeKeycloak } from '@js-modules/apps-travel-log-common-react';
import {
  ClientType,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-travel-log-common-store-redux';
import { MyFeedsScreenView } from '@js-modules/apps-travel-log-native-my-feeds';

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
        !isAuthenticated ? WebModulesPublic.home : WebModulesPrivate.myFeeds
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
            name={WebModulesPrivate.myFeeds}
            component={MyFeedsScreenView}
          />
          <Stack.Screen
            name={WebModulesPrivate.myLog}
            component={MyFeedsScreenView}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
