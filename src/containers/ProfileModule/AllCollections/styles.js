import { StyleSheet } from 'react-native'

import { getDeviceHeight, getDeviceWidth } from '@global'
// define your styles
const styles = StyleSheet.create({
  main: {
    // alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: getDeviceHeight(94),
    width: getDeviceWidth(1328),
    alignSelf: 'center'
  },
  cell: {
    width: getDeviceWidth(332),
    height: getDeviceHeight(332)
  },
  collection: {
    width: getDeviceWidth(305),
    height: getDeviceHeight(305)
  }
});

export default styles