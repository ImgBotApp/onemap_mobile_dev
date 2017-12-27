import { StyleSheet,Platform } from 'react-native'

import { getDeviceHeight, getDeviceWidth } from '@global' 
import { SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '@theme/fonts';
import { LIGHT_GRAY_COLOR, BIG_FONT_SIZE, BACKGROUNDCOLOR } from '@theme/colors';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex            : 1,
    marginTop       : Platform.OS == 'ios' ? 20:0,
    backgroundColor : BACKGROUNDCOLOR,
  },
  marker: {
    marginTop       : getDeviceHeight(540),
    marginLeft      : getDeviceWidth(184),
    width           : getDeviceWidth(1010),
    height          : getDeviceHeight(226)
  },
  login_str: {
    textAlign       : 'center',
    fontSize        : NORMAL_FONT_SIZE,
    fontFamily      : 'Comfortaa-Regular',
    color           : LIGHT_GRAY_COLOR
  },
  first_line: {
    marginTop       : getDeviceHeight(276)
  },
  second_line: {
    marginTop       : getDeviceHeight(33)
  },
  phone_number: {
    marginLeft      : getDeviceWidth(172),
    marginTop       : getDeviceHeight(34),
    width           : getDeviceWidth(1097),
    height          : getDeviceHeight(145),
    borderColor     : '#0a91ed',
    borderWidth     : 2,
    borderRadius    : 360,
    backgroundColor : 'transparent'
  },
  mid_line: {
    marginTop       : getDeviceHeight(158),
    marginLeft      : getDeviceWidth(317),
    width           : getDeviceWidth(807),
    height          : 2,
    borderWidth     : 1,
    borderColor     : LIGHT_GRAY_COLOR,
  },
  or_str: {
    left            : getDeviceWidth(276),
    width           : getDeviceWidth(251),
    height          : getDeviceHeight(81),
    top             : getDeviceHeight(-50),
    color           : LIGHT_GRAY_COLOR,
    fontFamily      : 'Comfortaa-Regular',
    fontSize        : BIG_FONT_SIZE,
    position        : 'absolute',
    textAlign       : 'center',
  },
  social: {
    left            : getDeviceWidth(456),
    width           : getDeviceWidth(523),
    marginTop       : getDeviceHeight(204),
    height          : getDeviceHeight(142),
    flexDirection   : 'row',
    justifyContent  : 'space-between'
  },
  socialImage: {
    width           : getDeviceWidth(142),
    height          : getDeviceHeight(142),
    resizeMode      : 'contain'
  }
});

export default styles