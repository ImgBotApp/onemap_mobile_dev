import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#efefef',
		paddingTop: getDeviceHeight(219)
	},
	headerTitle: {
		fontFamily: 'Comfortaa-regular',
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
    fontFamily: 'Comfortaa-regular',
    color: '#575858',
    // fontSize: 14,
    fontWeight: 'bold'
	},
	element: {
		width: getDeviceWidth(966),
		height: getDeviceHeight(98),
		flexDirection: 'row'
	},
	fontAweSome: {
    width: getDeviceHeight(97),
    height: '100%',
	},
	phoneInput: {
		marginLeft: 10,
		width: getDeviceWidth(863),
		height: '100%'
	},
	description: {
		height: 100,
	},
	text: {
		fontFamily: 'Comfortaa-regular',		
		color: '#575858',
		textAlign: 'center'
	}
});

export default styles