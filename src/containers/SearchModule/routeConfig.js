import { NavigationActions } from 'react-navigation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { ICON_SIZE } from '@theme/fonts'
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({navigation}) => {
  return {
    swipeEnabled: false,
    tabBarIcon: (option) => (<EvilIcons name="search" size={ICON_SIZE} color={option.tintColor} />)
  }
}