import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { Navigation } from 'react-native-navigation'
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

import * as SCREEN from '@global/screenName'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjb30vkvv434c0146sjjn4d4w' })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

registerScreens(store, ApolloProvider, {client});

// export default () => {
//   Navigation.registerComponent('TestScreen', () => TestSceen, store, ApolloProvider, {client});

//   Navigation.startTabBasedApp({
//     tabs: [
//       {
//         label: 'test',
//         screen: 'TestScreen'
//       }
//     ]
//   })
// }



export default class App {
  constructor () {
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
  }

  onStoreUpdate() {
    const { root } = store.getState().app;

    if (this.currentRoot != root ) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }
  startApp(root) {
    switch(root) {
      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'a',
            navigatorStyle: {
              navBarHidden: true
            },
            navigatorButtons: {}
          }
        })
        return;
      case 'main':
        break;
      default: 
        alert('unknown app root')
    }
  }
}