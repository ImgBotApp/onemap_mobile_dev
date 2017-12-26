import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, LIGHT_BLUE } from '../../../theme/colors';

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '../../../theme/fonts';
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
    width: getDeviceHeight(355),
    height: getDeviceWidth(355)
  },
  userInfo: {
    marginLeft: getDeviceWidth(48),
    justifyContent: 'space-between'
  },
  userName: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  userId: {
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE
  },
  FollowingButton: {
    width: getDeviceWidth(626),
    height: getDeviceHeight(78),
    backgroundColor: LIGHT_BLUE,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  FollowingText: {
    color: 'white'
  },
  propertyView: {
    alignItems: 'center'
  },
  pText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  propertyContainer: {
    justifyContent: 'space-between'
  },
  about: {
    marginTop: getDeviceHeight(97),
    fontSize:  SMALL_FONT_SIZE,
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
    paddingLeft: getDeviceWidth(88),
    paddingTop: getDeviceHeight(88),
    paddingRight: getDeviceWidth(88)
  },
  StoryList: {
    width: getDeviceWidth(336),
  }
});

export default styles