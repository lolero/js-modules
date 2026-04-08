import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { TravelLogNative } from './src/components/TravelLogNative';

AppRegistry.registerComponent(appName, () => TravelLogNative);
