import { StyleSheet } from 'react-native'

import { getDeviceWidth } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeded',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  badgeContainer: {
    width: getDeviceWidth(374),
    height: getDeviceWidth(374),
    marginBottom: getDeviceWidth(37),
    backgroundColor: '#e0dddf',
    padding: 5,
    borderRadius: 5,
    borderColor: 'transparent',
    borderWidth: 1
  },
  badgeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});

export default styles