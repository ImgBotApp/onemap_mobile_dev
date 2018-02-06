import { StyleSheet, Platform } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../theme/colors';
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE,SMALL_FONT_SIZE } from '../../theme/fonts';
import { getDeviceWidth, getDeviceHeight } from '@global'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    backgroundColor: 'white',//BACKGROUNDCOLOR,
  },
  SectionStyle: {
    // position:'absolute',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // top:15,
    // zIndex:99,
    // marginHorizontal: 20
  },
  ImageStyle: {
    padding: 10,
    marginLeft: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  backArrow: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
  },
  mapView: {
    width: '100%',
    height: getDeviceHeight(1000)
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapmarker: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain'
  },
  placeImage: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    marginBottom:getDeviceHeight(80),
    resizeMode: 'contain',
    marginBottom: Platform.OS=='android'? 20:getDeviceHeight(80),
  },
  nearPlaceImage: {
    marginRight: '3%',
    width: getDeviceWidth(120),
    height: getDeviceHeight(120),
    resizeMode: 'contain'
  },
  selectLocation: {
    paddingTop: getDeviceHeight(20),
    paddingBottom: getDeviceHeight(20),
    marginLeft: getDeviceWidth(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    height: Platform.OS=='android'? 60:getDeviceHeight(192),
    marginLeft: getDeviceWidth(60),
    alignItems: 'center',
    flexDirection: 'row'
  },
  infomation: {
    marginLeft: getDeviceWidth(60),
    paddingBottom: '1%',
    marginBottom: '5%',
    width: getDeviceWidth(980),
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_COLOR,
    // marginLeft:' 5%',
    // marginRight:' 5%',
    // backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: LIGHT_GRAY_COLOR
  },
  name: {
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    marginBottom: getDeviceHeight(10),
  },
  following: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR,
    fontFamily: 'Comfortaa-Light',
  },
  customView: {
    width: 160,
  },
});


export default styles;
