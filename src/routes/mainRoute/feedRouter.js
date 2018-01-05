//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation'

import EntypoIcons from 'react-native-vector-icons/Entypo'

import FeedPage from '@mFeed/FeedPage'
import FeedPageConfig from '@mFeed/FeedPage/routeConfig'

import ProfilePage from '@mFeed/ProfilePage'
import ProfilePageConfig from '@mFeed/ProfilePage/routeConfig'

import PlaceProfile from '@mFeed/PlaceProfile'
import PlaceProfileConfig from '@mFeed/ProfilePage/routeConfig'

import MapView from '@mFeed/MapDetailPage'
import MapViewConfig from '@mFeed/MapDetailPage/routeConfig'

import { ICON_SIZE } from '@theme/fonts'

const FeedRouter = StackNavigator({
  FeedList: {
    screen: FeedPage,
    navigationOptions: FeedPageConfig
  },
  ProfilePage: {
    screen: ProfilePage,
    navigationOptions: ProfilePageConfig
  },
  PlaceProfile: {
    screen: PlaceProfile,
    navigationOptions: PlaceProfileConfig
  },
  MapViewPage: {
    screen: MapView,
    navigationOptions: MapViewConfig
  }
})
//make this component available to the app
export default FeedRouter;

export const FeedRouterConfig = ({navigation}) => {
  return {
    swipeEnabled: false,
    // tabBarOnPress: () => {
    //   const actionToDispatch = NavigationActions.reset({
    //     index: 0,
    //     key: null,
    //     actions: [NavigationActions.navigate({ routeName: 'FeedList' })],
    //   });
    //   navigation.dispatch(actionToDispatch);
    // },
    tabBarIcon: (option) => (<EntypoIcons name="home" size={ICON_SIZE} color={option.tintColor} />)
  }
}