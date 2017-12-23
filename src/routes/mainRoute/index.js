//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'

import FeedRouter, { FeedRouterConfig } from './feedRouter'

const Router = TabNavigator({
  Feed: {
    screen: FeedRouter,
    navigationOptions: FeedRouterConfig
  }
},{
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#47c6f1',
    showLabel: false
  }
})


//make this component available to the app
export default Router;
