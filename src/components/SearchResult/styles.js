import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../theme/colors';
import { NORMAL_FONT_SIZE, BIG_FONT_SIZE, SMALL_FONT_SIZE } from '../../theme/fonts';
import { getDeviceHeight, getDeviceWidth } from '@global'
import { TABBAR_HEIGHT } from '@global/const';
import { Platform } from 'react-native';

// define your styles
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingBottom:TABBAR_HEIGHT,
  },
  userRow: {
    height: Platform.OS=='android'?getDeviceHeight(240):getDeviceHeight(223),
    width: '100%',
  },
  useritem:{
    marginTop: getDeviceHeight(43),
    marginLeft: getDeviceWidth(91),
    marginRight: getDeviceWidth(72),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TabText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE,
  },
  TabSelected: {
    borderBottomWidth: 1,
    borderBottomColor: DARK_GRAY_COLOR
  },
  TabSelectedText: {
    color: DARK_GRAY_COLOR
  },
  mainContainer: {
    top: 50
  },
  tabHeader: {
    borderColor: 'transparent',
    borderBottomWidth: 0,
    backgroundColor: 'white'
  },
  tabbody: {
    marginTop: 50
  },
  scrollView: {
    width: '100%',
    height: '100%',
    borderBottomWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',

  },
  item: {
    height: Platform.OS == 'android' ? 60 : getDeviceHeight(192),
    marginLeft: getDeviceWidth(69),
    alignItems: 'center',
    flexDirection: 'row',

  },
  profileImage: {
    width: getDeviceWidth(176),
    height: getDeviceWidth(176)
  },
  userinfomation:{
    width: getDeviceWidth(1100),
    //borderBottomWidth: 1,
    //borderBottomColor: LIGHT_GRAY_COLOR,
    marginLeft: getDeviceWidth(41),
    justifyContent: 'center'
  },
  username: {
    fontSize: 16,
    color: '#575858'
  },
  bio: {
    fontSize: 13,
    color: '#575858',
  },
  infomation: {
    marginLeft: getDeviceWidth(72),
    width: getDeviceWidth(980),
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_COLOR
  },
  name: {
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
  },
  following: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR,
    marginBottom: getDeviceHeight(10),
  },
  placeImage: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain',
    marginBottom: 5,
  }
});


export default styles