import { StyleSheet } from 'react-native'
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
  detailImage: {
    width: getDeviceWidth(312),
    height: getDeviceWidth(312),
    resizeMode: 'cover',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    
  },
  detailContainer: {
    marginLeft: getDeviceWidth(98),
    justifyContent: 'space-between'
  },
  detailName: {
    color: '#585958'
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
    marginLeft: getDeviceWidth(42)
  },
  placeImage: {
    width:  getDeviceWidth(428),
    height: getDeviceWidth(300),
    marginLeft: 10,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5
  },
  placeDescription: {
    marginLeft: getDeviceWidth(60),
    marginTop: getDeviceWidth(101)
  },
  placeMore: {
    marginLeft: getDeviceWidth(60),
    color: '#007aff'    
  },
  RuleContainer: {
    marginTop: getDeviceWidth(98),
    marginLeft: getDeviceWidth(151),
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
    flexDirection: 'row'   
  },
  checkInImage: {
    width: getDeviceWidth(49),
    height: getDeviceWidth(48)
  },
  SuggestContainer: {
    marginTop: getDeviceWidth(103),
    marginLeft: getDeviceWidth(138),    
  },
  SuggestPlaceContainer: {
    marginTop: getDeviceWidth(66)
  },
  SPlaceItem: {
    marginTop: 4,
    marginLeft: 6,
    marginBottom: 6
  }
});

export default styles