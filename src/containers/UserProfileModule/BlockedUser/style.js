import { StyleSheet,Platform } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, RED_COLOR } from '../../../theme/colors';
import { getDeviceWidth, getDeviceHeight } from '@global'
import { APPFONTNAME,BIG_FONT_SIZE, SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '../../../theme/fonts';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#efefef',
  },
  headerTitle: {
		fontFamily: APPFONTNAME.Regular,
    color: '#575858',
    fontSize: 16
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
  userList: {
    width: '100%',
    height:'100%',
    backgroundColor: '#efefef'
  },
  userRow: {
    height: Platform.OS=='android'?getDeviceHeight(240):getDeviceHeight(223),
    width: '100%',
    backgroundColor: '#efefef'
  },
  mainItem: {
    marginTop: getDeviceHeight(43),
    marginLeft: getDeviceWidth(91),
    marginRight: getDeviceWidth(72),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemImage: {
    width: getDeviceWidth(176),
    height: getDeviceWidth(176),
  },
  itemInfo: {
    marginLeft: getDeviceWidth(41),
    justifyContent: 'center',
    width: getDeviceWidth(1050),
  },
  username: {
    fontSize: 16,
    color: '#575858'
  },
  bio: {
    fontSize: 13,
    color: '#575858'    
  },
  commons: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  fontCommons: {
    fontSize: 30,
    color: '#575858'        
  },
  rightHidden: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    height: getDeviceHeight(223),
    backgroundColor: '#fc5151',
    justifyContent: 'center',
    width: getDeviceWidth(311)
  },
  rightHiddenText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    width: getDeviceWidth(311)
  },
  modalContainer: {
    width: getDeviceWidth(1000),
    height: getDeviceHeight(621),
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    // padding: getDeviceWidth(30),
    justifyContent: 'space-between'
  },
  modalTitle: {
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR,
  },
  modalDescription: {
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    textAlign: 'center'
  },
  descriptionContainer: {
    height: getDeviceHeight(359),
    paddingTop: getDeviceWidth(30),
    paddingLeft: getDeviceWidth(30),
    paddingRight: getDeviceWidth(30),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  FollowerBottom: {
    height: getDeviceHeight(169),
    alignSelf: 'flex-end',
    width: '100%',
    borderColor: LIGHT_GRAY_COLOR,
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  modalButton: {
    flex: 1,
    borderColor: LIGHT_GRAY_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelStr: {
    color: BLUE_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  unblockStr: {
    color: RED_COLOR,
    fontSize: BIG_FONT_SIZE
  },
});

export default styles