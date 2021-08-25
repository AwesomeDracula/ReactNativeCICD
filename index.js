/**
 * @format
 */
if (__DEV__) {
  import('./ReactotronConfig.js').then();
}
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
