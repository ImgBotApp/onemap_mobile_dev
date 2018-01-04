import { StackNavigator } from 'react-navigation'
import React, { Component } from 'react';
import ProfileScreen from './index'
import { TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

// import FontAwesome, { Icons } from 'react-native-fontawesome'

import * as GLOBAL from '@global'

const ProfileNavigator = StackNavigator({
  profileScreen: {
    screen: ProfileScreen,
    navigationOptions: (props) => {
      const { navigation,screenProps } = props
      const { state } = navigation
      const { params } = state
      return {
        title: 'Profile',
        headerLeft: (
          <TouchableOpacity style={styles.leftTouchable} onPress={() => {
            params.openDrawerMenu()            
          }}>
            <Image source={require('@assets/images/common/drawer.png')} style={styles.leftDrawer}/>
          </TouchableOpacity>
        ),
        headerTitleStyle: {fontSize: 13, fontFamily: 'Comfortaa-regular'},
        headerRight: (
          <TouchableOpacity style={styles.rightTouchable} onPress={() => {
            // params.openNext()
            navigation.navigate('AccountSetting')
          }}>
            <Text style={styles.rightNav}>
              <EvilIcons name="gear" size={30} />
            </Text>
          </TouchableOpacity>
        )
      }
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  leftDrawer: {
    marginLeft: GLOBAL.getDeviceWidth(74),
    width: GLOBAL.getDeviceWidth(72),
    height: GLOBAL.getDeviceHeight(57),
    resizeMode: 'contain',
    justifyContent: 'center',    
  },
  leftTouchable: {
    width: GLOBAL.getDeviceWidth(146),
    height: '100%',
    justifyContent: 'center',
  },
  rightTouchable: {
    width: GLOBAL.getDeviceWidth(134),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextArrow: {
    width: GLOBAL.getDeviceWidth(48),
    height: GLOBAL.getDeviceHeight(38),
    marginRight: GLOBAL.getDeviceWidth(86)
  },
  rightNav: {
    fontSize: 15,
    color: '#575858'
  }
});

export default ProfileNavigator