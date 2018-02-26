import { StyleSheet, Platform } from 'react-native'
import { getDeviceWidth } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeded'
  },
  detailPart: {
    marginLeft: getDeviceWidth(87),
    marginTop: getDeviceWidth(96),
    flexDirection: 'row'
  },
  CardBadgeImage: {
    width: getDeviceWidth(312),
    height: getDeviceWidth(312),
  },
  detailImage: {
    width: getDeviceWidth(312),
    height: getDeviceWidth(312),
    resizeMode: 'cover',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    resizeMode: 'cover',
    marginLeft: Platform.OS == 'ios' ? 0 : -getDeviceWidth(16),
    marginTop: Platform.OS == 'ios' ? 0 : -getDeviceWidth(16)
  },
  detailContainer: {
    marginLeft: getDeviceWidth(98),
    justifyContent: 'space-between'
  },
  detailName: {
    color: '#585958',
    width: getDeviceWidth(841)
  },
  CheckInContainer: {
    width: getDeviceWidth(841),
    height: getDeviceWidth(75),
    borderWidth: 1,
    borderColor: '#585958',
    borderRadius: getDeviceWidth(37.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeContainer: {
    marginTop: getDeviceWidth(147),
    alignItems: 'center'
  },
  placeDetailContainer: {
    width: getDeviceWidth(1236),
  },
  placeDetail: {
    marginTop: getDeviceWidth(63),
    // marginLeft: getDeviceWidth(42)
  },
  placeImage: {
    width:  getDeviceWidth(428),
    height: getDeviceWidth(300),
    marginRight: 10,
    marginBottom: 10,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5
  },
  placeDescription: {
    // marginLeft: getDeviceWidth(60),
    marginTop: getDeviceWidth(41)
  },
  placeMore: {
    // marginLeft: getDeviceWidth(60),
    color: '#007aff'
  },
  RuleContainer: {
    marginTop: getDeviceWidth(98),
    marginLeft: getDeviceWidth(87),
  },
  RuleLabel: {
    color: '#585958'    
  },
  RuleItem: {
    marginTop: getDeviceWidth(89),
    height: getDeviceWidth(309)
  },
  pointRewards: {
    marginTop: getDeviceWidth(38),
    marginLeft: getDeviceWidth(46),
    color: '#585958',
  },
  ruleText: {
    color: '#585958',
  },
  eventType: {
    marginTop: getDeviceWidth(29),
    marginLeft: getDeviceWidth(46),
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkInImage: {
    width: getDeviceWidth(49),
    height: getDeviceWidth(48),
    resizeMode: 'cover'
  },
  SuggestContainer: {
    marginTop: Platform.OS == 'ios' ? getDeviceWidth(103) : getDeviceWidth(153),
    marginLeft: getDeviceWidth(87),    
  },
  SuggestPlaceContainer: {
    marginTop: getDeviceWidth(66)
  },
  SPlaceItem: {
    marginTop: 4,
    marginLeft: 6,
    marginBottom: 6
  },
  PlaceDetailCardContainer: {
    marginLeft: getDeviceWidth(60),
    marginTop: Platform.OS == 'ios' ? getDeviceWidth(60) : 0,
    marginBottom: Platform.OS == 'ios' ? 0 : 10,
    marginRight: Platform.OS == 'ios' ? 0 : 10,
  },
  PlaceDetailCardDestinationContainer: {
    marginTop: getDeviceWidth(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  PlaceDetailCardDestinationText: {
    color: '#585958',
  },
  PlaceDetailCardCheckIn: {
    marginRight: 10,
    width: getDeviceWidth(250),
    height: getDeviceWidth(80),
    borderColor: '#007aff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  PlaceDetailCardCheckInText: {
    color: '#007aff'
  },
  PlaceDetailCardPlaceName: {
    color: '#585958',    
  },
  SperateBar: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#585958',
    width: getDeviceWidth(1100)
  },
  RuleContainerItem: {
    paddingBottom: Platform.OS == 'ios' ? 10 : 20,
    width: getDeviceWidth(1236),
  }
});

export default styles