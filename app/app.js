import React, { Component } from 'react';
import {
  Linking,
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import promiseMiddleware from './common/middlewares/promiseMiddleware';
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import MainPage from './views/pages/MainPage';
import BadgeListPage from './views/pages/BadgeListPage';
import ProfilePage from '@pages/ProfilePage';
import CampaignPage from './views/pages/CampaignPage';
import PlaceDetailPage from './views/pages/PlaceDetailPage';
import PlaceProfilePage from './views/pages/PlaceProfilePage';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const scenes = Actions.create(
      <Scene key="root">
        <Scene key="Profile" initial={ true } component={ ProfilePage } hideNavBar={ true } panHandlers={null}/>
        <Scene key="BadgeList" component={ BadgeListPage } hideNavBar={ true } panHandlers={null}/>
        <Scene key="Campaign" component={ CampaignPage } hideNavBar={ true } panHandlers={null}/>
        <Scene key="PlaceDetail" component={ PlaceDetailPage } hideNavBar={ true } panHandlers={null}/>
        <Scene key="PlaceProfile" component={ PlaceProfilePage } hideNavBar={ true } panHandlers={null}/>
      </Scene>
    );

    return (
      <Provider store={ store }>
        <Router hideNavBar={ true } scenes={ scenes }/>
      </Provider>
    );
  }
}