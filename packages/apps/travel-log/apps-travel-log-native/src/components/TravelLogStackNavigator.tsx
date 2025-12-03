import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import {
  InitScreenView,
  StartScreenView,
} from '@js-modules/apps-travel-log-native-start/src';
import { useInitializeKeycloak } from '@js-modules/apps-travel-log-common-react';

const Stack = createNativeStackNavigator();

export const TravelLogStackNavigator: React.FC = () => {
  const { isKeycloakReady } = useInitializeKeycloak();

  if (!isKeycloakReady) {
    return <InitScreenView />;
  }
  return (
    <Stack.Navigator
      initialRouteName={WebModulesPublic.home}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={WebModulesPublic.home} component={StartScreenView} />
    </Stack.Navigator>
  );
};
