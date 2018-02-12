import { StyleSheet } from 'react-native'

import { getDeviceWidth } from '@global'

// define your styles
const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth(1272),
    height: getDeviceWidth(1072)
  },
  map: {
    width: '100%',
    height: '100%'
  }
});

export default styles