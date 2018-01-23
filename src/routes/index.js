//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'

import MainRoute from './mainRoute'

const RootNavigator = StackNavigator({
  Main: {
    screen: MainRoute
  }
},{
  headerMode: 'none'
})

//make this component available to the app
export default RootNavigator;
