/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/component/App';
import { name as appName } from './app.json';
import { Provider } from "react-redux"

AppRegistry.registerComponent(appName, () => App);
