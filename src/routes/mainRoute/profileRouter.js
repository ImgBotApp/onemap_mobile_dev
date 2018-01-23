//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation'
import { ICON_SIZE } from '@theme/fonts'
import EntypoIcons from 'react-native-vector-icons/Entypo'

import Profile from '@mProfile/Profile'
import ProfileConfig from '@mProfile/Profile/routeConfig'

import Collections from '@mProfile/Collections'
import CollectionConfig from '@mProfile/Collections/routeConfig'

import AllCollection from '@mProfile/AllCollections'
import AllCollectionConfig from '@mProfile/AllCollections/routeConfig'

import NewCollection from '@mProfile/NewCollection'
import NewCollectionConfig from '@mProfile/NewCollection/routeConfig'

export default router = StackNavigator({
  UserProfile: {
    screen: Profile,
    navigationOptions: ProfileConfig
  },
  UserCollection: {
    screen: Collections,
    navigationOptions: CollectionConfig
  },
  AllCollection: {
    screen: AllCollection,
    navigationOptions: AllCollectionConfig
  },
  NewCollection: {
    screen: NewCollection,
    navigationOptions: NewCollectionConfig
  }
})


export const ProfileRouterConfig = ({navigation}) => {
  return {
    swipeEnabled: false,
    // tabBarOnPress: () => {
    //   const actionToDispatch = NavigationActions.reset({
    //     index: 0,
    //     key: null,
    //     actions: [NavigationActions.navigate({ routeName: 'UserProfile' })],
    //   });
    //   navigation.dispatch(actionToDispatch);
    // },
    tabBarIcon: (option) => (<EntypoIcons name="user" size={ICON_SIZE} color={option.tintColor} />)
  }
}