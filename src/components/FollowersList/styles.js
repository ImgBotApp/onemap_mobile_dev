import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../theme/colors';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  headerTitle: {
		fontFamily: 'Comfortaa-regular',
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
    fontFamily: 'Comfortaa-regular',
    color: '#575858',
    // fontSize: 14,
    fontWeight: 'bold'
  },
  userList: {
    width: '100%',
    backgroundColor: '#efefef',
    height: '100%'
  },
  userRow: {
    height: getDeviceHeight(223),
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
    justifyContent: 'center'
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
    fontSize: 15,
    textAlign: 'center'
  },
  modalFrame: {
    backgroundColor: 'transparent',
    width: getDeviceWidth(1231),
    height: getDeviceHeight(760)
  },
  modalBody: {
    backgroundColor: 'white',
    height: getDeviceHeight(521),
    width: getDeviceWidth(1231),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    marginBottom: getDeviceHeight(27),
    alignItems: 'center',
    paddingTop: getDeviceHeight(89)
  },
  modalFooter: {
    backgroundColor: 'transparent',
    width: getDeviceWidth(1231),
    height: getDeviceHeight(210),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerButton: {
    width: getDeviceWidth(597),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    height: getDeviceHeight(210),
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems: 'center'
  },
  followButton: {
    alignSelf: 'center',
    color: DARK_GRAY_COLOR
  },
  followText: {
    width: getDeviceWidth(257),
    height: getDeviceHeight(75),
    backgroundColor: LIGHT_GRAY_COLOR,
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default styles