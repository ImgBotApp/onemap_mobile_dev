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
    height: getDeviceHeight(332),
    alignItems: 'center',
    justifyContent: 'center'
  },
  collection: {
    width: getDeviceWidth(305),
    height: getDeviceHeight(305)
  }
});

export default styles