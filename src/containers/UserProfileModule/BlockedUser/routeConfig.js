import styles from './style'
import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View} from 'react-native'

import I18n from '@lang'

export default function(props) {
  const { navigation,screenProps } = props
  const { state } = navigation
  const { params } = state
  return {
    title: I18n.t('SETTING_BLOCKED_USER_TITLE'),
    headerTitle : I18n.t('SETTING_BLOCKED_USER_TITLE'),
    headerTitleStyle: styles.headerTitle,
    headerLeft: (
      <TouchableOpacity style={styles.navContainer} onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.leftNav} source={require('@assets/images/login/leftNav.png')}/>
      </TouchableOpacity>
    ),
  }
}