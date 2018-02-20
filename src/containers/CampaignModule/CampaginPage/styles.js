import { StyleSheet, Platform, PlatformIOS } from 'react-native'
import { getDeviceWidth } from '@global' 
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  map: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  conditionGroup: {
    width: getDeviceWidth(1346),
    minHeight: Platform.OS == 'ios' ? getDeviceWidth(280) : getDeviceWidth(320),
    maxHeight: getDeviceWidth(1959),
    paddingLeft: getDeviceWidth(101),
    paddingTop: getDeviceWidth(32),
    marginBottom: 10,
    backgroundColor: '#f9f9f9'
  },
  conditionGroupImage: {
    width: getDeviceWidth(224),
    height: getDeviceWidth(224)
  },
  conditionGroupInfo: {
    flexDirection: 'row'
  },
  conditionGroupShort: {
    marginLeft: getDeviceWidth(86),
    justifyContent: 'space-around'
  },
  conditionGroupTitle: {
    color: '#585958',
  },
  conditionGroupFullInfo: {

  },
  conditionGroupDescription: {
    marginTop: getDeviceWidth(113)
  },
  description: {
    width: getDeviceWidth(1198),
    color: '#585958',
    marginTop: getDeviceWidth(113)
  },
  additionalText: {
    color: '#007aff'
  },
  SuggestPlace: {
    color: '#575858',
    marginTop: getDeviceWidth(104)
  },
  SuggestPlaceContainer: {
    marginTop: getDeviceWidth(85),
    flexDirection: 'row',
    marginBottom: 10
  },
  SPlaceItem: {
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: '#efeeee'
  },
  Badges: {
    color: '#575858',
    marginTop: getDeviceWidth(93)
  },
  badgeContainer: {
    marginTop: getDeviceWidth(73),
    marginBottom: getDeviceWidth(55)
  },
  BadgeItem: {
    width: getDeviceWidth(292),
    height: getDeviceWidth(293),
    marginLeft: 10,
    marginBottom: 10,
  },
  badgeImage: {
    width: getDeviceWidth(292),
    height: getDeviceWidth(293),
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor:  'transparent',
    borderRadius: 5,
    marginLeft: Platform.OS == 'ios' ? 0 : -5,
    marginTop: Platform.OS == 'ios' ? 0 : -5
  }
});

export default styles