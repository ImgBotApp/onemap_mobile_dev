import { StyleSheet,Platform } from 'react-native'

import * as GLOBAL from '@global'
import { getDeviceWidth, getDeviceHeight } from '@global'
// define your styles
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'red',
  },
  container: {
    backgroundColor: '#efeded',
    flex: 1
  },
  space: {
    flex: 1,
    backgroundColor: 'red'
  },
  textDescription: {
    marginTop         : GLOBAL.getDeviceHeight(172)
  },
  descriptionText: {
    fontSize          : 13,
    fontFamily        : 'Comfortaa-regular',
    textAlign         : 'center'
  },
  profile: {
    marginTop         : GLOBAL.getDeviceHeight(252),
  },
  hintText: {
    color: '#a7a7a7',
    fontSize: 8,
    textAlign: 'right',
    width             : GLOBAL.getDeviceWidth(971),
    marginLeft        : GLOBAL.getDeviceWidth(226),    
  },
  profileImage: {
    width: getDeviceWidth(473),
    height: getDeviceHeight(473),
    marginTop: getDeviceHeight(126),
    alignSelf: 'center'
  },
  infoText: {
    borderBottomWidth : Platform.OS === 'ios' ? 1:0,
    borderColor       : '#a7a7a7',
    width             : GLOBAL.getDeviceWidth(971),
    marginLeft        : GLOBAL.getDeviceWidth(226),
    marginBottom      : GLOBAL.getDeviceHeight(108)
  },
  genderSelection: {
    width             : GLOBAL.getDeviceWidth(971),
    marginTop         : -1 * GLOBAL.getDeviceHeight(108),
    marginLeft        : GLOBAL.getDeviceWidth(226),
    marginBottom      : GLOBAL.getDeviceHeight(108)
  },
  bio: {
    marginLeft        : GLOBAL.getDeviceWidth(226),
    // marginBottom      : GLOBAL.getDeviceHeight(58),
    fontSize          : 13,
    fontFamily        : 'Comfortaa-light'
  },
  bioText: {
    borderWidth:1, 
    borderColor: '#acabab',
    marginTop         : GLOBAL.getDeviceHeight(58),
    marginLeft        : GLOBAL.getDeviceWidth(226),
    height            : GLOBAL.getDeviceHeight(400),
    width             : GLOBAL.getDeviceWidth(959)
  },
  success: {
    position          : 'absolute',
    left              : 0,
    top               : 0,
    right             : 0,
    bottom            : 0,
    width             : GLOBAL.getDeviceWidth(1440),
    height            : GLOBAL.getDeviceHeight(2542)
  }
});

export default styles