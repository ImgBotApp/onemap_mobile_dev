import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR,LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../theme/colors';
import { NORMAL_FONT_SIZE, BIG_FONT_SIZE, SMALL_FONT_SIZE } from '../../theme/fonts';
import { getDeviceHeight, getDeviceWidth } from '@global'

// define your styles
const styles = StyleSheet.create({
  container: {
    position:"relative",
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    marginTop:50,
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
    top:0
  },
  tabHeader: {
    borderColor: 'transparent',
    borderBottomWidth: 0,
    backgroundColor: 'white'
  },
  scrollView: {
    width: '100%',
    height: '100%',
    borderBottomWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    paddingTop:getDeviceHeight(50)
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
    marginBottom :getDeviceHeight(10),
  },
  placeImage: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain',
    marginBottom:getDeviceHeight(80),
  }
});


export default styles