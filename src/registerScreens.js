import { Navigation } from 'react-native-navigation'

import * as SCREEN from '@global/screenName'

import LoginScreen from './containers/LoginModule/LoginPage/index'


export function registerScreens(store, Provider, client) {
  Navigation.registerComponent('a', () => LoginScreen, store, Provider, client)
}