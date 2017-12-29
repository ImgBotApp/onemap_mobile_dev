import { Navigation } from 'react-native-navigation'

import * as SCREEN from './global/screenName'

// Login Module
import LoginScreen from './containers/LoginModule/LoginPage/index'
import PhoneNumberPage from './containers/LoginModule/PhoneNumberPage'
import PhoneVerifyPage from './containers/LoginModule/PhoneVerifyPage'
import AccountCreatePage from './containers/LoginModule/ProfileCreatePage'

// Feed Module

import FeedList from './containers/FeedModule/FeedPage'

// UserProfile Module

import UserProfile from './containers/UserProfileModule/ProfilePage'
import AccountSetting from './containers/UserProfileModule/AccountSetting'
import EditProfile from './containers/UserProfileModule/EditProfile'
import UserPhoneEditPage from './containers/UserProfileModule/PhoneNumber'
import FollowPeoplePage from './containers/UserProfileModule/FollowPeoplePage'


export function registerScreens(store, Provider, client) {
  Navigation.registerComponent(SCREEN.LOGIN_SCREEN, () => LoginScreen, store, Provider, client)
  Navigation.registerComponent(SCREEN.PHONE_NUMBER_PAGE, () => PhoneNumberPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.PHONE_VERIFY_PAGE, () => PhoneVerifyPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.ACCOUNT_CREATE_PAGE, () =>AccountCreatePage, store, Provider, client)

  // Feed Module

  Navigation.registerComponent(SCREEN.FEED_LIST_SCREEN, () => FeedList, store, Provider, client)

  // User Profiel Module
  Navigation.registerComponent(SCREEN.USER_PROFILE_SCREEN, () => UserProfile, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_ACCOUNT_SETTING, () => AccountSetting, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_PROFILE_EDIT, () => EditProfile, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_PHONE_EDIT, () => UserPhoneEditPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_FOLLOW_PAGE, () =>FollowPeoplePage, store, Provider, client)
}