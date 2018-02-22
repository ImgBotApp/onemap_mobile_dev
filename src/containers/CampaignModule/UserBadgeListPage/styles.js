import { StyleSheet } from 'react-native'
import { getDeviceWidth, getDeviceHeight } from '@global'

// define your styles
const styles = StyleSheet.create({
  Page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#eeeded',
    paddingTop: getDeviceHeight(149),
    paddingLeft: getDeviceWidth(160),
    paddingRight: getDeviceWidth(126),
    width: '100%',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  badgeItem: {
    width: getDeviceWidth(370),
    height: getDeviceWidth(370),
    marginTop: 5
  },
  badgeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'transparent'
  }
})


export default styles