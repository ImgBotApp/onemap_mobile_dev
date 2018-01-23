import { StyleSheet, Platform } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../theme/colors';
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE,SMALL_FONT_SIZE } from '../../theme/fonts';

import {getDeviceWidth, getDeviceHeight} from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    backgroundColor: BACKGROUNDCOLOR,
  },
  StoryContainer: {
    marginLeft: getDeviceWidth(50),
    marginRight: getDeviceWidth(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StoryList: {
    width: getDeviceWidth(400)
  },
  SectionStyle: {
    // position:'absolute',
    height:50,
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
  resizeMode : 'stretch',
  alignItems: 'center'
},
backArrow: {
  padding: 10,
  marginLeft: 10,
  marginRight: 10,
  height: 25,
  width: 25,
  resizeMode : 'stretch',
  alignItems: 'center'
},
  textInput: {
    flex:1,
},
  mapView: {
    width: '100%',
    height: getDeviceHeight(1200)
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapmarker: {
    width: getDeviceWidth(79),
    height: getDeviceHeight(95),
  },
  placeImage: {
    marginRight:'3%',
    marginBottom:'5%',
    width: getDeviceWidth(100),
    height: getDeviceHeight(100),
    resizeMode: 'contain'
  },
  nearPlaceImage: {
    marginRight:'3%',
    width: getDeviceWidth(120),
    height: getDeviceHeight(120),
    resizeMode: 'contain'
  },
  selectLocation:{
    paddingTop:getDeviceHeight(20),
    paddingBottom:getDeviceHeight(20),
    marginLeft:getDeviceWidth(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    // height: getDeviceHeight(192),
    marginLeft: getDeviceWidth(60),
    alignItems: 'center',
    flexDirection: 'row'
  },
  infomation: {
    marginLeft: getDeviceWidth(60),
    paddingBottom:'1%',
    marginBottom:'5%',
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
  },
  following: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
  customView: {
    width: 160,
  },
});


export default styles;