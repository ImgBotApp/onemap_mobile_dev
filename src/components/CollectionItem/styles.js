import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  cell: {
    width: getDeviceWidth(332),
    height: getDeviceWidth(332),
    alignItems: 'center',
    justifyContent: 'center'
  },
  collection: {
    width: getDeviceWidth(305),
    height: getDeviceWidth(305)
  },
  lock: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 8,
    height: 10,
    top: getDeviceWidth(50),
    right: getDeviceWidth(50),
  }
});

export default styles