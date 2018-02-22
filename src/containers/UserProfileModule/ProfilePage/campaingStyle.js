import { StyleSheet } from 'react-native'
import { getDeviceHeight, getDeviceWidth } from '@global'

export default styles = StyleSheet.create({
  campaignItemCotainer: {
    width: getDeviceWidth(1260),
    height: getDeviceHeight(288),
    paddingLeft: getDeviceWidth(55),
    paddingRight: getDeviceWidth(55),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  PointContainer: {
    justifyContent: 'space-around'
  },
  pointText: {
    color: '#575858',
    textAlign: 'center'
  }
})