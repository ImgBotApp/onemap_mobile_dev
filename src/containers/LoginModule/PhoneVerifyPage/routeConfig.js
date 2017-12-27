import React, { Component } from 'react';
import { View, TouchableOpacity, Image} from 'react-native'
import PhoneNumberPrevNav from '@mLogin/PhoneNumberPage/prevNav'
import { getDeviceHeight, getDeviceWidth} from '@global'

export default function (props) {
  const { navigation,screenProps } = props
  const { state } = navigation
  const { params } = state
  return {
    gesturesEnabled : false,
    title           : 'Create Account',
    headerLeft      : (<PhoneNumberPrevNav navigation={navigation}/>),
    headerRight     : (
      <TouchableOpacity style={{height: '100%',justifyContent: 'center'}} onPress={() => {
        params.checkCode()
        // if ( !params.complete ){
        //   alert('Please confirm verify code')
        // } else {
        //   navigation.navigate('CreateProfile')
        // }
      }}>
        <View style={{marginRight: getDeviceWidth(150), justifyContent: 'center'}}>
          <Image style={{
            width     : getDeviceWidth(48), 
            height    : getDeviceHeight(37),
            alignSelf : 'center',
          }} source={require('@assets/images/login/rightNav.png')} />
        </View>
      </TouchableOpacity>
    ),
  }
}