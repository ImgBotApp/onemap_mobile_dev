import { StyleSheet,Platform } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, LIGHT_BLUE } from '../../../theme/colors';

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE, SMALL_FONT_SIZE,APPFONTNAME } from '../../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    paddingTop: getDeviceHeight(71),
    paddingLeft: getDeviceWidth(79),
    paddingRight: getDeviceWidth(60)
  },
  userInformationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userInformation: {
    flexDirection: 'row'
  },
  checkImage: {
    width: getDeviceWidth(98),
    height: getDeviceWidth(98),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginLeft: -1 * getDeviceWidth(98)
  },
  userImage: {
    width: getDeviceWidth(342),
    height: getDeviceWidth(342)
  },
  userInfo: {
    marginLeft: getDeviceWidth(48),
    justifyContent: 'space-between',
    width:getDeviceWidth(626)
  },
  userName: {
    color: DARK_GRAY_COLOR,
    fontFamily: APPFONTNAME.Bold,
    fontSize: BIG_FONT_SIZE,
    marginBottom:getDeviceHeight(20)
  },
  userId: {
    fontFamily: APPFONTNAME.Regular,
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE
  },
  FollowingButton: {
    width: getDeviceWidth(626),
    height: getDeviceHeight(78),
    backgroundColor: LIGHT_BLUE,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:getDeviceHeight(60)
  },
  FollowingText: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  propertyView: {
    alignItems: 'center'
  },
  pText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    marginBottom: Platform.OS=='android'?0:getDeviceHeight(10)
  },
  p_val_Text: {
    color: LIGHT_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE,
    marginBottom: Platform.OS=='android'?0:getDeviceHeight(10)
  },
  propertyContainer: {
    justifyContent: 'space-between'
  },
  about: {
    marginTop: getDeviceHeight(50),
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  collectionText: {
    color: DARK_GRAY_COLOR,
    marginTop: getDeviceHeight(110),
    fontSize: BIG_FONT_SIZE
  },
  collectionContainer: {
    marginTop: getDeviceHeight(68),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  collection: {
    width: getDeviceHeight(289),
    height: getDeviceHeight(289),
  },
  StoryText: {
    marginTop: getDeviceHeight(76),
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  StoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: getDeviceHeight(88),
  },
});

export default styles
