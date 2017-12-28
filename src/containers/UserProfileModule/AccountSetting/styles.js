import { StyleSheet, TouchableOpacity } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingLeft: getDeviceWidth(87),
    paddingRight: getDeviceWidth(75),
    paddingTop: getDeviceHeight(98)
  },
  headerTitle: {
    fontFamily: 'Comfortaa-regular',
    color: '#575858'
  },
  buttons: {
    fontSize: 25,
    color: '#42a5f5',
    marginBottom: getDeviceHeight(49)
  },
  privateAccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getDeviceHeight(44)
  },
  switchAccount: {
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: '#acacac',
  },
  privateText: {
    marginBottom: getDeviceHeight(32),
    marginTop: getDeviceHeight(32),
    color: '#acacac'
  },
  logout: {
    marginTop: getDeviceHeight(43)
  },
  leftNav: {
    marginLeft: getDeviceWidth(38),
    width: getDeviceWidth(60),
    height: getDeviceHeight(47),
    resizeMode: 'contain'
  },
  navContainer: {
    height: '100%',
    justifyContent: 'center'
  }
});

export default styles