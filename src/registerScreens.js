import { Navigation } from 'react-native-navigation'

import * as SCREEN from './global/screenName'

// Login Module
import LoginScreen from './containers/LoginModule/LoginPage/index'
import PhoneNumberPage from './containers/LoginModule/PhoneNumberPage'
import PhoneVerifyPage from './containers/LoginModule/PhoneVerifyPage'
import AccountCreatePage from './containers/LoginModule/ProfileCreatePage'

// Feed Module
import FeedList from './containers/FeedModule/FeedPage'
import AllCollectionPage from './containers/ProfileModule/AllCollections'
import NewCollectionPage from './containers/ProfileModule/NewCollection'
import PlaceProfilePage from './containers/FeedModule/PlaceProfile'
import UsersProfilePage from './containers/FeedModule/ProfilePage'
import MapDetailPage from './containers/FeedModule/MapDetailPage'
import StoryListPage from './containers/FeedModule/StoryListPage'

// Search Page
import SearchPage from './containers/SearchModule'

// User Profile Module
import UserProfile from './containers/UserProfileModule/ProfilePage'
import AccountSetting from './containers/UserProfileModule/AccountSetting'
import EditProfile from './containers/UserProfileModule/EditProfile'
import UserPhoneEditPage from './containers/UserProfileModule/PhoneNumber'
import FollowPeoplePage from './containers/UserProfileModule/FollowPeoplePage'
import CollectionsPage from './containers/ProfileModule/Collections'
import BlockedUserPage from './containers/UserProfileModule/BlockedUser'

// Campaign Module
import CampaignProfilePage from './containers/CampaignModule/ProfilePage'
import CampaignConditionGroupPage from './containers/CampaignModule/MapViewPage'
import CampaignMainPage from './containers/CampaignModule/CampaginPage'
import CampaignPlaceDetailPage from './containers/CampaignModule/BadgeDetailPage'
import CampaignUserBadgeList from './containers/CampaignModule/UserBadgeListPage'
import CampaignUserBadgeStatus from './containers/CampaignModule/UserBadgeStatusPage'

// Notification Module
import NotificationPage from './containers/NotificationModule/NotificationPage'

export function registerScreens(store, Provider, client) {

  // Login Module
  Navigation.registerComponent(SCREEN.LOGIN_SCREEN, () => LoginScreen, store, Provider, client)
  Navigation.registerComponent(SCREEN.PHONE_NUMBER_PAGE, () => PhoneNumberPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.PHONE_VERIFY_PAGE, () => PhoneVerifyPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.ACCOUNT_CREATE_PAGE, () => AccountCreatePage, store, Provider, client)

  // Feed Module
  Navigation.registerComponent(SCREEN.FEED_LIST_SCREEN, () => FeedList, store, Provider, client)
  Navigation.registerComponent(SCREEN.FEED_ALL_COLLECTION, () => AllCollectionPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.FEED_NEW_COLLECTION, () => NewCollectionPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.PLACE_PROFILE_PAGE, () => PlaceProfilePage, store, Provider, client)

  Navigation.registerComponent(SCREEN.USERS_PROFILE_PAGE, () => UsersProfilePage, store, Provider, client)
  Navigation.registerComponent(SCREEN.MAP_DETAIL_PAGE, () => MapDetailPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.STORY_LIST_PAGE, () => StoryListPage, store, Provider, client)//unused

  // Search Module
  Navigation.registerComponent(SCREEN.SEARCH_PAGE, () => SearchPage, store, Provider, client)

  // User Profile Module
  Navigation.registerComponent(SCREEN.USER_PROFILE_SCREEN, () => UserProfile, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_ACCOUNT_SETTING, () => AccountSetting, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_PROFILE_EDIT, () => EditProfile, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_PHONE_EDIT, () => UserPhoneEditPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.USER_FOLLOW_PAGE, () => FollowPeoplePage, store, Provider, client)
  Navigation.registerComponent(SCREEN.COLLECTIONS_PAGE, () => CollectionsPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.BLOCKED_USER_PAGE, () => BlockedUserPage, store, Provider, client)

  // Campaign Module
  Navigation.registerComponent(SCREEN.CAMPAIGN_PROFILE_PAGE, () => CampaignProfilePage, store, Provider, client)
  Navigation.registerComponent(SCREEN.CAMPAIGN_CONDITION_GROUP_PAGE, () => CampaignConditionGroupPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.CAMPAIGN_MAIN_PAGE, () => CampaignMainPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.CAMPAIGN_BADGE_DETAIL_PAGE, () => CampaignPlaceDetailPage, store, Provider, client)
  Navigation.registerComponent(SCREEN.CAMPAIGN_USER_BADGE_LIST_PAGE, () => CampaignUserBadgeList, store, Provider, client)
  Navigation.registerComponent(SCREEN.CAMPAIGN_USER_BADGE_STATUS_PAGE, () => CampaignUserBadgeStatus, store, Provider, client)

  // Notification Module
  Navigation.registerComponent(SCREEN.NOTIFICATION_PAGE, () => NotificationPage, store, Provider, client)
}