import { StyleSheet } from 'react-native'

import { getDeviceWidth } from '../../../global'
// define your styles
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#eeeded',
    flex: 1,    
  },
  container: {
    backgroundColor: '#eeeded',
    paddingLeft: getDeviceWidth(92),
    paddingRight:  getDeviceWidth(84)
  },
  infoContainer: {
    marginTop: getDeviceWidth(90),
    flexDirection: 'row',
    width: '100%'
  },
  profileImage: {
    width: getDeviceWidth(341),
    height: getDeviceWidth(341),
  },
  checkImage: {
    width: getDeviceWidth(98),
    height: getDeviceWidth(98),
    alignSelf: 'flex-end',
    marginTop: -1 * getDeviceWidth(98)
  },
  userInfoContainer: {
    marginLeft: getDeviceWidth(54)
  },
  campaignName: {
    color: '#575858'
  },
  campaignOwner: {
    color: '#575858'    
  },
  followerContainer: {
    position: 'absolute',
    right: 0
  },
  followerText: {
    color: '#575858'
  },
  followerCount: {
    color: '#575858',
    textAlign: 'center'
  },
  descriptionContainer: {
    width: '100%',
    marginTop: getDeviceWidth(104)
  },
  description: {
    color: '#a6a6a6'
  },
  tabContainer: {
    marginTop: getDeviceWidth(105)
  },
  tabView: {
    backgroundColor: 'transparent', 
    position: 'relative',
    marginBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemText: {
    fontSize: 19,
    color: '#a6a6a6'
  },
  tabSelectItemText: {
    fontSize: 19,
    color: '#575858'
  },
  separate: {
    borderTopWidth: 1,
    borderColor: '#a6a6a6',
    width: 50,
    marginTop: 5,
  },
  separateSelect: {
    borderTopWidth: 1,
    borderColor: '#575858',
    width: 50,
    marginTop: 5,
  },
});

export default styles