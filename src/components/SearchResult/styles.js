import { StyleSheet } from 'react-native'
import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../theme/colors';
import { NORMAL_FONT_SIZE, BIG_FONT_SIZE, SMALL_FONT_SIZE } from '../../theme/fonts';
import { getDeviceHeight, getDeviceWidth } from '@global'

// define your styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    // height: 100,
    backgroundColor: 'rgba(153,153,153,0.6)',
  },
  TabText: {
    color: LIGHT_GRAY_COLOR,
    fontSize:  BIG_FONT_SIZE
  },
  TabSelected: {
    borderBottomWidth: 1,
    borderBottomColor: DARK_GRAY_COLOR
  },
  TabSelectedText: {
    color: DARK_GRAY_COLOR
  },
  mainContainer: {
    width: getDeviceWidth(1223),
    marginTop: getDeviceHeight(223),
  },
  tabHeader: {
    borderColor: 'transparent',
    borderBottomWidth: 0,
    backgroundColor: 'white'
  },
  scrollView: {
    width: getDeviceWidth(1223),
    height: getDeviceHeight(1211),
    borderBottomWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white'
  },
  item: {
    height: getDeviceHeight(192),
    marginLeft: getDeviceWidth(69),
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileImage: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140)
  },
  infomation: {
    marginLeft: getDeviceWidth(72),
    width: getDeviceWidth(838),
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_COLOR
  },
  name: {
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  following: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
  placeImage: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain'
  }
});


export default styles