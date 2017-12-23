//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'

import EntypoIcons from 'react-native-vector-icons/Entypo'

import FeedPage from '@mFeed/FeedPage'
import FeedPageConfig from '@mFeed/FeedPage/routeConfig'

import { ICON_SIZE } from '@theme/fonts'

const FeedRouter = StackNavigator({
  FeedList: {
    screen: FeedPage,
    navigationOptions: FeedPageConfig
  }
})
//make this component available to the app
export default FeedRouter;

export const FeedRouterConfig = () => {
  return {
    tabBarIcon: (option) => (<EntypoIcons name="home" size={ICON_SIZE} color={option.tintColor} />)
  }
}