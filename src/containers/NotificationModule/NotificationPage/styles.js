import { StyleSheet } from 'react-native'

import { getDeviceHeight, getDeviceWidth } from '../../../global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeded'
  },
  activity: {
    color: '#585958',
    marginLeft: getDeviceWidth(71),
    marginTop: getDeviceHeight(75)
  }
});

export default styles