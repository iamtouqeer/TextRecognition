/**
 * @format
 */

import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { AppRegistry, LogBox } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
