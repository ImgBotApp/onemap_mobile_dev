import { StyleSheet, Platform } from 'react-native'
import { getDeviceHeight, getDeviceWidth } from '@global'

export default styles = StyleSheet.create({
  campaignItemCotainer: {
    width: getDeviceWidth(1260),
    height: getDeviceHeight(288),
    paddingLeft: getDeviceWidth(55),
    paddingRight: getDeviceWidth(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  PointContainer: {
    justifyContent: 'space-around',
    height: getDeviceHeight(288),
    marginBottom: Platform.OS == 'ios' ? 0 : 10    
  },
  pointText: {
    color: '#575858',
    textAlign: 'center'
  },
  badgeStyle: {
    width: getDeviceWidth(169),
    height: getDeviceWidth(169),
    borderWidth: 1,
    borderRadius: getDeviceWidth(84.5),
    borderColor: 'transparent',
    resizeMode: 'stretch',
    marginRight: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  }
})