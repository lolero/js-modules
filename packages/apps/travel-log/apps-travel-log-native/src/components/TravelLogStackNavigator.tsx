import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { StartScreenView } from '@js-modules/apps-travel-log-native-start/src';

const Stack = createNativeStackNavigator();

export const TravelLogStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={WebModulesPublic.home} component={StartScreenView} />
    </Stack.Navigator>
  );
};
