import { StyleSheet, Platform } from 'react-native'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { APPFONTNAME } from '@theme/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  avatarView: {
    justifyContent: "center",
    alignItems: "center",
    width: getDeviceWidth(473),
    height: getDeviceWidth(473),
    marginTop: getDeviceHeight(126),
    marginBottom: getDeviceHeight(277)
  },
  headerTitle: {
    fontFamily: APPFONTNAME.Regular,
    color: '#575858'
  },
  navContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  leftNav: {
    marginLeft: getDeviceWidth(38),
    width: getDeviceWidth(60),
    height: getDeviceHeight(47),
    resizeMode: 'contain'
  },
  rightNavText: {
    marginRight: getDeviceWidth(45),
    fontFamily: APPFONTNAME.Regular,
    color: '#575858',
    // fontSize: 14,
    fontWeight: 'bold'
  },
  profileImage: {
    width: "100%",
    height: "100%"
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
  genderItem: {
    fontFamily: APPFONTNAME.Light,
  },
  genderIcon: {
    width: getDeviceHeight(62),
    height: getDeviceHeight(102),
    resizeMode: 'contain',
    marginTop: getDeviceHeight(75),
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
    alignItems: 'flex-start',
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
    borderBottomColor: '#b0b0b0'
  },
  borderItem: {
    borderBottomWidth: 1,
    // borderBottomColor: '#575858'
  },
  bioInput: {
    marginTop: getDeviceHeight(167),
    marginLeft: getDeviceWidth(51),
    height: getDeviceHeight(402),
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  cameraImage: {
    width: getDeviceWidth(152),
    height: getDeviceHeight(152),
    marginBottom: getDeviceHeight(277),
    resizeMode: 'contain',
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "transparent",
  }
})

export default styles