import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  detailContainer: {
    marginTop: getDeviceHeight(103),
    width: getDeviceWidth(1168),
    height: getDeviceHeight(240),
    // alignSelf: 'center',
    flexDirection: 'row'
  },
  detailImage: {
    width: getDeviceWidth(240),
    height: getDeviceWidth(240),
    resizeMode: 'stretch'
  },
  detailPart: {
    marginLeft: getDeviceWidth(83),
    height: '100%',
    justifyContent: 'space-around'
  },
  badgeImage: {
    width: getDeviceWidth(1163),
    height: getDeviceHeight(1163),
    marginTop: getDeviceHeight(284),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 15
  }
});

export default styles