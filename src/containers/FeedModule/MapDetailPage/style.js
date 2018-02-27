import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE,APPFONTNAME } from '../../../theme/fonts';
import { getDeviceWidth, getDeviceHeight } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR
  },
  titleText: {
    color: DARK_GRAY_COLOR,
    padding:10,
    paddingBottom:3
  },
  addressText: {
    color: LIGHT_GRAY_COLOR,
    padding:10,
    paddingTop:3
  },
  mapView: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:-30,
    zIndex:0
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
  titleContainer:{
    top:0,
    width:'100%',
    backgroundColor: 'rgba(240,239,239,0.8)',
  },
  statusContainer:{
    position:'absolute',
    bottom:0,
    backgroundColor: 'rgba(240,239,239,0.8)',
    paddingBottom:10,
    flex:1,
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  status:{
    //flex:0.5
  },
  distText:{
    color: DARK_GRAY_COLOR,
    paddingLeft:25,
    fontFamily: APPFONTNAME.Light,
    fontSize: 10
  },
  distvalueText:{
    color: DARK_GRAY_COLOR,
    paddingLeft:25,
    fontFamily: APPFONTNAME.Regular,
    fontSize: 18,
    lineHeight:20
  },
  buttonGroup:{
    flexDirection:'row',
    right:0,
    height:'100%',
    alignItems:"flex-end",
    marginRight:25
  },
  googleBtn:{
    width:30,
    height:30,
    resizeMode:'contain',
    marginLeft:15
  }
});

export default styles;