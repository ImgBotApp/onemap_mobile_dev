import styles from './styles'
import React, { Component } from 'react';
import { TouchableOpacity, Image} from 'react-native'
export default function(props) {
  const { navigation,screenProps } = props
  const { state } = navigation
  const { params } = state
  return {
    title: 'Account Setting',
    headerTitle : 'Account Setting',
    headerTitleStyle: styles.headerTitle,
    headerLeft: (
      <TouchableOpacity style={styles.navContainer} onPress={() => {
        navigation.goBack()
        params.onBack()
      }}>
        <Image style={styles.leftNav} source={require('@assets/images/login/leftNav.png')}/>
      </TouchableOpacity>
    )
  }
}