import { StyleSheet } from 'react-native'
import * as GLOBAL from '@global'

import { getDeviceHeight, getDeviceWidth } from '@global'
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';
import { SMALL_FONT_SIZE } from '../../../theme/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#efeeee',
  },
  profileImage: {
    width : GLOBAL.getDeviceWidth(342),
    height: GLOBAL.getDeviceHeight(342),
  },
  checkImage: {
    width: getDeviceWidth(98),
    height: getDeviceWidth(98),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginLeft: -1 * getDeviceWidth(98)
  },
  infoView: {
    flexDirection: 'row',
    marginLeft: GLOBAL.getDeviceWidth(86),
    marginRight: GLOBAL.getDeviceWidth(86),
    marginTop: GLOBAL.getDeviceHeight(86),
    justifyContent: 'space-between'
  },
  infoContainer: {
    flexDirection: 'row',
    width: getDeviceWidth(841),
    justifyContent: 'space-between'
  },
  nameView: {
    justifyContent: 'space-between'
  },
  bigName: {
    fontFamily: 'Comfortaa-regular',
    fontSize: 16,
    color: DARK_GRAY_COLOR
  },
  userId: {
    fontFamily: 'Comfortaa-regular',
    fontSize: SMALL_FONT_SIZE,
    color: '#575858'
  },
  editProfileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: getDeviceHeight(78),
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#575858',
  },
  editProfile: {
    color: '#575858',
    fontFamily: 'Comfortaa-regular',
    fontSize: SMALL_FONT_SIZE
  },
  bio: {
    fontFamily: 'Comfortaa-regular',
    fontSize: SMALL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    marginTop: GLOBAL.getDeviceHeight(50)
  },
  bioText: {
    marginLeft: GLOBAL.getDeviceWidth(86)    
  },
  spec: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  specFont: {
    fontFamily: 'Comfortaa-regular',
    fontSize: 8,
    marginBottom: GLOBAL.getDeviceHeight(15)
  },
  vCollections: {
    marginTop: GLOBAL.getDeviceHeight(62),
    marginLeft: GLOBAL.getDeviceWidth(86),
    marginRight: GLOBAL.getDeviceWidth(86)
  },
  collectionTitle: {
    fontFamily: 'Comfortaa-regular',
    fontSize: 14,
    marginBottom: GLOBAL.getDeviceHeight(69),
    color: '#575858'
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
    fontSize: 14,
    color: '#575858',
    marginBottom: GLOBAL.getDeviceHeight(83)
  },
  Stories: {
    marginLeft: GLOBAL.getDeviceWidth(60),
    width: GLOBAL.getDeviceWidth(1123),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  StoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: getDeviceHeight(88),
    paddingRight: getDeviceWidth(88)
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