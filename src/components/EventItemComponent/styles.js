import { StyleSheet } from 'react-native'
import { getDeviceWidth } from '@global'

// define your styles
const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth(1252),
    paddingTop: getDeviceWidth(64),
    paddingLeft: getDeviceWidth(55),
    paddingRight: getDeviceWidth(37),
    minHeight: getDeviceWidth(402),
    marginBottom: getDeviceWidth(46)
  },
  dayText: {
    color: '#585958'
  },
  nameTextContainer: {
    marginTop: getDeviceWidth(63)
  },
  nameText: {
    color: '#3b8ac9'
  },
  descriptionTextContainer: {
    marginTop: getDeviceWidth(18)
  },
  descriptionText: {
    color: '#585958'
  },
  activeContainer: {
    alignSelf: 'flex-end',
    marginBottom: getDeviceWidth(28)
  }
});

export default styles