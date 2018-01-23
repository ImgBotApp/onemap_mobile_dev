import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text} from 'react-native'
import PhoneNumberPrevNav from '@mLogin/PhoneNumberPage/prevNav'
import * as GLOBAL from '@global'


export default function (props) {
  const { navigation,screenProps } = props
  const { state } = navigation
  const { params } = state
  return {
    gesturesEnabled : false,
    title           : 'Account Details',
    headerLeft      : (<PhoneNumberPrevNav navigation={navigation}/>),
    headerRight     : (
      <TouchableOpacity style={{height: '100%',justifyContent: 'center'}} onPress={() => {
        params.submitProfile();
      }}>
        <View style={{marginRight: GLOBAL.getDeviceWidth(69), justifyContent: 'center'}}>
          <Text>Done</Text>
        </View>
      </TouchableOpacity>
    ),
  }
}