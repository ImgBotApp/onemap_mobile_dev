import { StyleSheet, Platform } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR } from '@theme/colors';
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '@theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: getDeviceWidth(1267),
    paddingTop: getDeviceHeight(74),
    paddingLeft: getDeviceWidth(54),
    paddingRight: getDeviceWidth(42),
    paddingBottom: Platform.OS == 'android' ? getDeviceWidth(52) : getDeviceWidth(32)
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  user: {
    flexDirection: 'row',
    
  },
  userDescription: {
    marginLeft: getDeviceWidth(47),
    width:getDeviceWidth(800),
  },
  profileImage: {
    width: getDeviceWidth(140),
    height: getDeviceWidth(140)
  },
  name: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  update: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  feedTitle: {
    marginTop: getDeviceHeight(78),
    color: DARK_GRAY_COLOR,
  },
  feedImages: {
    //height: Platform.OS=='android'?getDeviceHeight(385):getDeviceHeight(365)
  },
  feedItemImage: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5
  },
  FeedImageCard: {
    marginTop: getDeviceHeight(50),
    height: Platform.OS == 'android' ? getDeviceHeight(400) : getDeviceHeight(340),
    width: getDeviceWidth(532),
    marginRight: getDeviceWidth(30),
  },
  placeTitle: {
    color: LIGHT_GRAY_COLOR,
  },
  separate: {
    marginTop: Platform.OS == 'android' ? getDeviceHeight(10) : getDeviceHeight(50),
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR
  },
  description: {
    color: LIGHT_GRAY_COLOR,
  },
  additionalText: {
    color: BLUE_COLOR,
  },
  descriptionText: {
    marginTop: getDeviceHeight(50),
  },
  playButton: {
    position: "absolute",
    backgroundColor: "transparent",
    color: "white",
    fontSize: 20,
    right: Platform.OS == 'android' ? 15 : 5,
    bottom: Platform.OS == 'android' ? 18 : 5,
    fontWeight: "100"
  }
});


export default styles
