import { StyleSheet } from 'react-native'
import * as GLOBAL from '@global'

import { getDeviceHeight, getDeviceWidth } from '@global'
import { BLUE_COLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BACKGROUNDCOLOR } from '../../../theme/colors';
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '../../../theme/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#efeeee',
  },
  profileImage: {
    width : GLOBAL.getDeviceWidth(342),
    height: GLOBAL.getDeviceHeight(342),
    marginLeft: GLOBAL.getDeviceWidth(86),
    marginTop: GLOBAL.getDeviceHeight(86),
  },
  checkIcon: {
    color: BLUE_COLOR,
    alignSelf: 'flex-end',
    marginLeft: -1 * getDeviceWidth(87),
    backgroundColor: 'transparent',
  },
  infoView: {
    flexDirection: 'row',
    width: '100%',
    height: GLOBAL.getDeviceHeight(434)
  },
  infoContainer: {
    flexDirection: 'row',
    width: getDeviceWidth(841),
    justifyContent: 'space-between'
  },
  nameView: {
    marginLeft: GLOBAL.getDeviceWidth(57),
    marginTop : GLOBAL.getDeviceHeight(107),
    justifyContent: 'space-between'
  },
  bigName: {
    fontFamily: 'Comfortaa-regular',
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  userId: {
    fontFamily: 'Comfortaa-regular',
    fontSize: NORMAL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
  editProfileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: getDeviceHeight(78),
    borderWidth: 1,
    borderRadius: 7,
    borderColor: LIGHT_GRAY_COLOR,
  },
  editProfile: {
    color: LIGHT_GRAY_COLOR,
    fontFamily: 'Comfortaa-regular'
  },
  bio: {
    fontFamily: 'Comfortaa-regular',
    color: DARK_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE,
    marginTop: GLOBAL.getDeviceHeight(50),
    // width: GLOBAL.getDeviceWidth(567)   
  },
  bioText: {
    marginLeft: GLOBAL.getDeviceWidth(86)    
  },
  spec: {
    marginLeft: GLOBAL.getDeviceWidth(145),
    marginTop: GLOBAL.getDeviceHeight(101),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  specFont: {
    fontFamily: 'Comfortaa-regular',
    fontSize: 8,
    color: DARK_GRAY_COLOR,
    marginBottom: GLOBAL.getDeviceHeight(15)
  },
  vCollections: {
    marginTop: GLOBAL.getDeviceHeight(62),
    marginLeft: GLOBAL.getDeviceWidth(86),
    marginRight: GLOBAL.getDeviceWidth(86)
  },
  collectionTitle: {
    fontFamily: 'Comfortaa-regular',
    fontSize: BIG_FONT_SIZE,
    marginBottom: GLOBAL.getDeviceHeight(69),
    color: DARK_GRAY_COLOR,
    fontWeight: 'bold'
  },
  collectionItemTitle: {
    color: '#efeded',
    fontSize: 11
  },
  collectionItems: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  collection: {
    width: GLOBAL.getDeviceWidth(291),
    height: GLOBAL.getDeviceHeight(291),
  },
  vStories: {
    marginTop: GLOBAL.getDeviceHeight(68),
    marginLeft: GLOBAL.getDeviceWidth(96)
  },
  storyTitle: {
    fontFamily: 'Comfortaa-regular',
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    fontWeight: 'bold',
    marginBottom: GLOBAL.getDeviceHeight(83)
  },
  Stories: {
    marginLeft: GLOBAL.getDeviceWidth(60),
    width: GLOBAL.getDeviceWidth(1123),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subStory: {
    width: GLOBAL.getDeviceWidth(343)
  },
  storyItemTitle: {
    fontFamily: 'Comfortaa-regular',
    fontSize: 12,
    textAlign: 'left'
  }
});

export default styles;