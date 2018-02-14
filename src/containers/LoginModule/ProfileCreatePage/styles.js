import { StyleSheet, Platform } from 'react-native'
import { BLUE_COLOR, DARK_GRAY_COLOR } from '../../../theme/colors';

import * as GLOBAL from '@global'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { APPFONTNAME } from '@theme/fonts';
// define your styles
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  space: {
    flex: 1,
    backgroundColor: 'red'
  },
  textDescription: {
    marginTop: GLOBAL.getDeviceHeight(172)
  },
  descriptionText: {
    fontSize: 13,
    fontFamily: APPFONTNAME.Regular,
    textAlign: 'center'
  },
  profile: {
    marginTop: GLOBAL.getDeviceHeight(252),
  },
  hintText: {
    color: '#a7a7a7',
    fontSize: 8,
    textAlign: 'right',
    width: GLOBAL.getDeviceWidth(971),
    marginLeft: GLOBAL.getDeviceWidth(226),
  },
  enterText: {
    marginTop: getDeviceHeight(100),
    marginBottom: getDeviceHeight(30),
    textAlign: 'center',
    fontSize: 13,
    fontFamily: APPFONTNAME.Regular,
    color: DARK_GRAY_COLOR,
    marginLeft: getDeviceHeight(300),
    marginRight: getDeviceHeight(300),
  },
  avatarView: {
    justifyContent: "center",
    alignItems: "center",
    width: getDeviceWidth(473),
    height: getDeviceWidth(473),
    marginTop: getDeviceHeight(126),
    marginBottom: getDeviceHeight(157)
  },
  profileImage: {
    width: "100%",
    height: "100%"
  },
  cameraImage: {
    width: getDeviceWidth(152),
    height: getDeviceHeight(152),
    marginBottom: getDeviceHeight(277),
    resizeMode: 'contain',
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "transparent",
  },
  infoText: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: '#a7a7a7',
    width: GLOBAL.getDeviceWidth(971),
    marginLeft: GLOBAL.getDeviceWidth(226),
    marginBottom: GLOBAL.getDeviceHeight(108)
  },
  genderElement: {
    width: getDeviceWidth(969),
    // height: getDeviceHeight(99),
    // marginTop: getDeviceHeight(70),
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderBottomColor: '#b0b0b0'
  },
  genderSelection: {
    width: getDeviceWidth(971),
    // marginTop         : -1 * getDeviceHeight(108),
    // marginBottom      : getDeviceHeight(108),
    marginLeft: getDeviceWidth(51),
    width: getDeviceWidth(830),
  },
  gender: {
    borderBottomWidth: 0,
    fontFamily: APPFONTNAME.Light,
  },
  genderIcon: {
    width: getDeviceHeight(62),
    height: getDeviceHeight(102),
    resizeMode: 'contain',
    marginTop: getDeviceHeight(75),
  },
  genderItem: {
    fontFamily: APPFONTNAME.Light,
  },
  fontAweSome: {
    alignItems: 'center',
    width: getDeviceHeight(97),
    justifyContent: 'center',
    alignItems: 'center'
  },
  genderAwesome: {
    alignItems: 'center',
    width: getDeviceHeight(97),
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputElement: {
    width: getDeviceWidth(969),
    // height: getDeviceHeight(99),
    marginTop: getDeviceHeight(70),
    flexDirection: 'row',
    // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderBottomWidth: 0,
    borderBottomColor: '#b0b0b0'
  },
  textElement: {
    width: getDeviceWidth(969),
    height: getDeviceHeight(99),
    marginTop: getDeviceHeight(70),
    flexDirection: 'row',
    // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderBottomWidth: 0,
    borderBottomColor: '#b0b0b0'
  },
  PhoneInputContainer: {
    marginTop: getDeviceHeight(125),
    marginLeft: getDeviceWidth(330),
    width: getDeviceWidth(779),
    height: getDeviceHeight(79),
    borderBottomWidth: 1,
    borderColor: '#a7a7a7'
  },
  textInput: {
    marginLeft: getDeviceWidth(51),
    width: getDeviceWidth(830),
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    // height: getDeviceHeight(98),
    alignItems: 'flex-end',
    borderBottomColor: '#b0b0b0',
    fontFamily: APPFONTNAME.Light,
  },
  bioText: {
    marginLeft: getDeviceWidth(51),
    width: getDeviceWidth(920),
    height: getDeviceHeight(402),
    alignItems: 'flex-end',
    textAlignVertical: 'top',
    fontFamily: APPFONTNAME.Light,
    // borderBottomColor: '#b0b0b0'    
  },
  text: {
    marginLeft: getDeviceWidth(51),
    width: getDeviceWidth(830),
    // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    height: getDeviceHeight(95),
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#b0b0b0',
    fontFamily: APPFONTNAME.Light
  },
  borderItem: {
    borderBottomWidth: 1,
    // borderBottomColor: '#575858'
  },
  bioInput: {
    marginTop: getDeviceHeight(10),
    marginLeft: getDeviceWidth(51),
    height: getDeviceHeight(502),
    borderWidth: 1,
    borderColor: '#b0b0b0'
  },
  bio: {
    marginLeft: GLOBAL.getDeviceWidth(226),
    // marginBottom      : GLOBAL.getDeviceHeight(58),
    fontSize: 13,
    fontFamily: APPFONTNAME.Light
  },
  biolabel: {
    fontFamily: APPFONTNAME.Light,
    alignSelf: "flex-start",
    marginTop: getDeviceHeight(30),
    marginLeft: getDeviceWidth(20)
  },
  success: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: GLOBAL.getDeviceWidth(1440),
    height: GLOBAL.getDeviceHeight(2542)
  }
});

export default styles