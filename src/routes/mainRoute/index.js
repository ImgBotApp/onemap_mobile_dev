//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'

import FeedRouter, { FeedRouterConfig } from './feedRouter'

import SearchPage from '@mSearch'
import SearchConfig from '@mSearch/routeConfig'

const Router = TabNavigator({
  Feed: {
    screen: FeedRouter,
    navigationOptions: FeedRouterConfig
  },
  Search: {
    screen: SearchPage,
    navigationOptions: SearchConfig
  }
},{
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#47c6f1',
    // showLabel: false
  }
})


//make this component available to the app
export default Router;
