import styles from './styles'
import React, { Component } from 'react';
import { TouchableOpacity, Image, Text} from 'react-native'

import I18n from '@lang'

export default function(props) {
  const { navigation,screenProps } = props
  const { state } = navigation
  const { params } = state
  return {
    title: I18n.t('SETTING_EDIT_PROFILE'),
    headerTitle : I18n.t('SETTING_EDIT_PROFILE'),
    headerTitleStyle: styles.headerTitle,
    headerLeft: (
      <TouchableOpacity style={styles.navContainer} onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.leftNav} source={require('@assets/images/login/leftNav.png')}/>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity style={styles.navContainer} onPress={() => {
        params.onDoneEditProfile(navigation)
      }}>
        <Text style={styles.rightNavText}>{I18n.t('DONE_STR')}</Text>
      </TouchableOpacity>
    )
  }
}