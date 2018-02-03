import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { Navigation } from 'react-native-navigation'
import Orientation from 'react-native-orientation'
import thunk from 'redux-thunk'
import * as reducers from './reducers'
import * as appActions from './reducers/app/actions'

import { registerScreens } from './registerScreens'

// import TestSceen from '@containers/Test'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)



import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'

import * as SCREEN from './global/screenName'

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/' + (true ? 'cjb30vkvv434c0146sjjn4d4w' : 'cjctwe3gj19zb01051chfehqy')
})
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


registerScreens(store, ApolloProvider, { client });

import EntypoIcons from 'react-native-vector-icons/Entypo'
import FeatherIcons from 'react-native-vector-icons/Feather'

import { FEED_LIST_SCREEN } from './global/screenName';
import { DARK_GRAY_COLOR } from './theme/colors';

var HomeIcon;
var UserIcon;
var SettingIcon;
var SearchIcon;

export default class App {
  constructor() {
    Orientation.lockToPortrait();
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
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
        FeatherIcons.getImageSource('search', 24)
      ]).then((values) => {
        HomeIcon = values[0];
        UserIcon = values[1];
        SettingIcon = values[2];
        SearchIcon = values[3];
        resolve(true)
      }).catch((error) => {
        reject(error);
      }).done();
    });
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
            navigatorButtons: {}
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
                  navBarTextFontFamily: 'Comfortaa-Regular',
                  navBarTextColor: DARK_GRAY_COLOR
                }
              },
              {
                title: 'SEARCH',
                screen: SCREEN.SEARCH_PAGE,
                icon: SearchIcon,
                navigatorStyle: {
                  navBarTextFontFamily: 'Comfortaa-Regular',
                  navBarTextColor: DARK_GRAY_COLOR,
                  navBarHidden: true
                }
              },
              {
                title: 'PROFILE',
                screen: SCREEN.USER_PROFILE_SCREEN,
                icon: UserIcon,
                navigatorStyle: {
                  navBarTextFontFamily: 'Comfortaa-Regular',
                  navBarTextColor: DARK_GRAY_COLOR
                }
              },
            ]
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
