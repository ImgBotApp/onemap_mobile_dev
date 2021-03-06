import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import { Navigation } from 'react-native-navigation'
import Orientation from 'react-native-orientation'
import thunk from 'redux-thunk'
import * as reducers from './reducers'
import * as appActions from './reducers/app/actions'
import * as userActions from './reducers/user/actions';

import { registerScreens } from './registerScreens'

import { AsyncStorage } from 'react-native'
import { GET_PROFILE } from './graphql/userprofile';
import { GET_SETTINGS } from './graphql/setting';
import { APP_USER_KEY } from './global/const'

import { composeWithDevTools } from 'redux-devtools-extension'

// import TestSceen from '@containers/Test'
const reducer = combineReducers(reducers)
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'

import * as SCREEN from './global/screenName'
import { APPFONTNAME } from '@theme/fonts';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/' + (true ?
    // Development
    'cjb30vkvv434c0146sjjn4d4w'
    :
    // Production
    'cjb30vkvv434c0146sjjn4d4w'    
    // 'cjctwe3gj19zb01051chfehqy'
  )
})
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


OneSignal.inFocusDisplaying(0)

registerScreens(store, ApolloProvider, { client });

import EntypoIcons from 'react-native-vector-icons/Entypo'
import FeatherIcons from 'react-native-vector-icons/Feather'
import IonicIcons from 'react-native-vector-icons/Ionicons'
import { FEED_LIST_SCREEN } from './global/screenName';
import { DARK_GRAY_COLOR } from './theme/colors';

var HomeIcon;
var UserIcon;
var SettingIcon;
var SearchIcon;
var NotificationIcon;
export default class App {
  constructor() {
    Orientation.lockToPortrait();
    this.getSettings();
    this._fbAuth();
  }
  setAppRoot(root) {
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.changeAppRoot(root));
  }
  onStoreUpdate() {
    const { root } = store.getState().app;
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  _populateIcons = function () {
    return new Promise(function (resolve, reject) {
      Promise.all([
        EntypoIcons.getImageSource('home', 26),
        EntypoIcons.getImageSource('user', 26),
        FeatherIcons.getImageSource('settings', 24),
        FeatherIcons.getImageSource('search', 24),
        IonicIcons.getImageSource('md-notifications', 34)
      ]).then((values) => {
        HomeIcon = values[0];
        UserIcon = values[1];
        SettingIcon = values[2];
        SearchIcon = values[3];
        NotificationIcon = values[4]
        resolve(true)
      }).catch((error) => {
        reject(error);
      }).done();
    });
  }
  getSettings() {
    client.query({
      query: GET_SETTINGS
    }).then(({ data }) => {
      let settings = {};
      data.allSettings.forEach(item => {
        settings[item.name] = item.value;
      });
      store.dispatch(
        appActions.saveSettings(settings)
      );
    });
  }
  _fbAuth(root) {
    try {
      AsyncStorage.getItem(APP_USER_KEY).then((value) => {
        let val = JSON.parse(value);
        if (val !== null && val.id !== null) {
          // We have data!!
          let UserExist = client.query({
            query: GET_PROFILE,
            variables: {
              userId: val.id
            }
          }).then((user) => {
            var data = user.data.User
            if (data.username) {

              store.dispatch(
                userActions.saveUserInfo({
                  id: data.id,
                  createdAt: new Date().toLocaleDateString(),
                  updatedAt: new Date().toLocaleDateString(),
                  loginMethod: data.loginMethod,
                  bio: data.bio,
                  gender: data.gender ? data.gender.toUpperCase() : '',
                  city: data.city,
                  country: data.country,
                  photoURL: data.photoURL,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  displayName: data.displayName,
                  username: data.username,
                  accountVerification: data.accountVerification,
                  blockByUsers: data.blockByUsers,
                  checkIns: data.checkIns,
                  receivedBadge: data.receivedBadge
                })
              );
              store.dispatch(
                appActions.saveUserFollows(data.follows)
              )
              this.setAppRoot('main');
            }
            else {//if can't get user profile
              this.setAppRoot('login');
            }
          }).catch(err => {
            this.setAppRoot('login')
          });
        } else {//if can't get user api key from local storage
          this.setAppRoot('login');
        }
      }).catch(err => {
        this.setAppRoot('login')
      });

    } catch (error) {
      // Error retrieving data
      this.startApp('login');
    }

  }
  startApp(root) {
    switch (root) {
      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: SCREEN.LOGIN_SCREEN,
            navigatorStyle: {
              navBarHidden: true
            },
            navigatorButtons: {},
            portraitOnlyMode: true
          }
        })
        return;
      case 'main':
        this._populateIcons().then(() => {
          Navigation.startTabBasedApp({
            tabs: [
              {
                title: 'FEED',
                screen: SCREEN.FEED_LIST_SCREEN,
                icon: HomeIcon,
                navigatorStyle: {
                  navBarTextFontFamily: APPFONTNAME.Bold,
                  navBarTextColor: 'DARK_GRAY_COLOR',
                }
              },
              {
                title: 'SEARCH',
                screen: SCREEN.SEARCH_PAGE,
                icon: SearchIcon,
                navigatorStyle: {
                  navBarHidden: true
                }
              },
              {
                title: 'Notification',
                screen: SCREEN.NOTIFICATION_PAGE,
                icon: NotificationIcon,
                navigatorStyle: {
                  navBarTextFontFamily: APPFONTNAME.Bold,
                  navBarTextColor: DARK_GRAY_COLOR
                }
              },
              {
                title: 'PROFILE',
                screen: SCREEN.USER_PROFILE_SCREEN,
                icon: UserIcon,
                navigatorStyle: {
                  navBarTextFontFamily: APPFONTNAME.Bold,
                  navBarTextColor: DARK_GRAY_COLOR
                }
              },
            ],
            portraitOnlyMode: true
          })
        }).catch((error) => {
          console.log(error);
        })
        return;
      default:
        alert('unknown app root')
    }
  }
}

export var Icons = {
  HomeIcon,
  UserIcon,
  SettingIcon
};
