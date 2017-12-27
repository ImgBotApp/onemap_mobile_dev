import { StyleSheet,Platform } from 'react-native'

import * as GLOBAL from '@global'
import { SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '@theme/fonts';
import { LIGHT_GRAY_COLOR } from '@theme/colors';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex            : 1,
    marginTop       : Platform.OS == 'ios' ? 20:0,
    backgroundColor : GLOBAL.MAIN_COLOR,
  },
  marker: {
    marginTop       : GLOBAL.getDeviceHeight(540),
    marginLeft      : GLOBAL.getDeviceWidth(184),
    width           : GLOBAL.getDeviceWidth(1010),
    height          : GLOBAL.getDeviceHeight(226)
  },
  login_str: {
    textAlign       : 'center',
    fontSize        : NORMAL_FONT_SIZE,
    fontFamily      : 'Comfortaa-Regular',
    color           : LIGHT_GRAY_COLOR
  },
  first_line: {
    marginTop       : GLOBAL.getDeviceHeight(276)
  },
  second_line: {
    marginTop       : GLOBAL.getDeviceHeight(33)
  },
  phone_number: {
    marginLeft      : GLOBAL.getDeviceWidth(172),
    marginTop       : GLOBAL.getDeviceHeight(34),
    width           : GLOBAL.getDeviceWidth(1097),
    height          : GLOBAL.getDeviceHeight(145),
    borderColor     : '#0a91ed',
    borderWidth     : 2,
    borderRadius    : 360,
    backgroundColor : 'transparent'
  },
  mid_line: {
    marginTop       : GLOBAL.getDeviceHeight(158),
    marginLeft      : GLOBAL.getDeviceWidth(317),
    width           : GLOBAL.getDeviceWidth(807),
    height          : 2,
    borderWidth     : 1,
    borderColor     : GLOBAL.FONT_GRAY
  },
  or_str: {
    left            : GLOBAL.getDeviceWidth(276),
    width           : GLOBAL.getDeviceWidth(251),
    height          : GLOBAL.getDeviceHeight(81),
    top             : GLOBAL.getDeviceHeight(-50),
    color           : GLOBAL.FONT_GRAY,
    fontFamily      : 'Comfortaa-Regular',
    fontSize        : GLOBAL.BIGGER,
    position        : 'absolute',
    textAlign       : 'center',
  },
  social: {
    left            : GLOBAL.getDeviceWidth(456),
    width           : GLOBAL.getDeviceWidth(523),
    marginTop       : GLOBAL.getDeviceHeight(204),
    height          : GLOBAL.getDeviceHeight(142),
    flexDirection   : 'row',
    justifyContent  : 'space-between'
  },
  socialImage: {
    width           : GLOBAL.getDeviceWidth(142),
    height          : GLOBAL.getDeviceHeight(142),
    resizeMode      : 'contain'
  }
});

export default styles