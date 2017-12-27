import { Navigation } from 'react-native-navigation'

import * as SCREEN from '@global/screenName'

// Login Module
import LoginScreen from './containers/LoginModule/LoginPage/index'
import PhoneNumberPage from './containers/LoginModule/PhoneNumberPage'
import PhoneVerifyPage from './containers/LoginModule/PhoneVerifyPage'


export function registerScreens(store, Provider, client) {
  Navigation.registerComponent(SCREEN.LOGIN_SCREEN, () => LoginScreen, store, Provider, client)
  Navigation.registerComponent(SCREEN.PHONE_NUMBER_PAGE, () => PhoneNumberPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.PHONE_VERIFY_PAGE, () => PhoneVerifyPage, store, Provider, client)
}