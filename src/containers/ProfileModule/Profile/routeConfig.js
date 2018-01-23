
import I18n from '@language'
import DFont from '@theme/fonts'
import { HEADER_COLOR } from '@theme/colors'
import { TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import React, { Component } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { getDeviceWidth, getDeviceHeight } from '@global'
export default function (props) {
  const { navigation,screenProps } = props
  const { state } = navigation
  const { params } = state
  return {
    title: I18n.t('USERPROFILE_TITLE'),
    headerTitle: I18n.t('USERPROFILE_TITLE'),
    headerTitleStyle: DFont.DFontFamily,
    headerTintColor: HEADER_COLOR,
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