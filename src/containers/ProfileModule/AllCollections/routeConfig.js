
import I18n from '@language'
import DFont from '@theme/fonts'
import { HEADER_COLOR } from '@theme/colors'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import { DARK_GRAY_COLOR } from '../../../theme/colors';
import React, { Component } from 'react';

import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import { getDeviceHeight, getDeviceWidth} from '@global'
export default function (props) {
  const { navigation,screenProps } = props
  const { state } = navigation
  const { params } = state
  return {
    title: I18n.t('COLLECTION_TITLE'),
    headerTitle: I18n.t('COLLECTION_TITLE'),
    headerTitleStyle: DFont.DFontFamily,
    headerTintColor: HEADER_COLOR,
    headerRight: (
      <TouchableOpacity style={styles.rightTouchable} onPress={() => {
        // params.openNext()
        // navigation.navigate('AccountSetting')
        navigation.navigate('NewCollection')
      }}>
        <Text style={styles.rightNav}>
          <EntypoIcons name="plus" size={30} />
        </Text>
      </TouchableOpacity>
    ),
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  leftDrawer: {
    marginLeft: getDeviceWidth(74),
    width: getDeviceWidth(72),
    height: getDeviceHeight(57),
    resizeMode: 'contain',
    justifyContent: 'center',    
  },
  leftTouchable: {
    width: getDeviceWidth(146),
    height: '100%',
    justifyContent: 'center',
  },
  rightTouchable: {
    width: getDeviceWidth(134),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextArrow: {
    width: getDeviceWidth(48),
    height: getDeviceHeight(38),
    marginRight: getDeviceWidth(86)
  },
  rightNav: {
    fontSize: 15,
    color: '#575858'
  }
});