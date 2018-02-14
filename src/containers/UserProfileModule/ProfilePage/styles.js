import { StyleSheet } from 'react-native'
import * as GLOBAL from '@global'

import { getDeviceHeight, getDeviceWidth } from '@global'
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';
import { SMALL_FONT_SIZE,NORMAL_FONT_SIZE,BIG_FONT_SIZE,APPFONTNAME } from '../../../theme/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#efeeee',
  },
  profileImage: {
    width: GLOBAL.getDeviceWidth(342),
    height: GLOBAL.getDeviceWidth(342),
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
    justifyContent: 'space-between'
  },
  nameView: {
    justifyContent: 'space-between',
    width:getDeviceWidth(650),
    paddingRight:getDeviceWidth(30)
  },
  bigName: {
    fontFamily: APPFONTNAME.Bold,
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    marginBottom:getDeviceHeight(20)
  },
  userId: {
    fontFamily: APPFONTNAME.Regular,
    fontSize: NORMAL_FONT_SIZE,
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
    marginBottom:getDeviceHeight(60)
  },
  editProfile: {
    color: '#575858',
    fontFamily: APPFONTNAME.Regular,
    fontSize: SMALL_FONT_SIZE
  },
  bio: {
    fontFamily: APPFONTNAME.Regular,
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    marginTop: GLOBAL.getDeviceHeight(50)
  },
  bioText: {
    marginLeft: GLOBAL.getDeviceWidth(86)
  },
  spec: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specFont: {
    fontFamily: APPFONTNAME.Regular,
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    marginBottom: GLOBAL.getDeviceHeight(10)
  },
  spec_val_Font:{
    fontFamily: APPFONTNAME.Regular,
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    marginBottom: GLOBAL.getDeviceHeight(10)
  },
  vCollections: {
    marginTop: GLOBAL.getDeviceHeight(62),
    marginLeft: GLOBAL.getDeviceWidth(86),
    marginRight: GLOBAL.getDeviceWidth(86)
  },
  collectionTitle: {
    fontFamily: APPFONTNAME.Regular,
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
    fontFamily: APPFONTNAME.Regular,
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
    justifyContent: 'space-between',
  },
  subStory: {
    width: GLOBAL.getDeviceWidth(375)
  },
  storyItemTitle: {
    fontFamily: APPFONTNAME.Regular,
    fontSize: 12,
    textAlign: 'left'
  }
});

export default styles;
