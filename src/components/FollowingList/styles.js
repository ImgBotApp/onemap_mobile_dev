import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, LIGHT_GRAY_COLOR, DARK_GRAY_COLOR, BLUE_COLOR } from '../../theme/colors';

import { getDeviceHeight, getDeviceWidth } from '@global'
import { SMALL_FONT_SIZE } from '../../theme/fonts';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
  },
  userRow: {
    height: getDeviceHeight(223),
    width: '100%',
    backgroundColor: '#efefef'
  },
  mainItem: {
    marginTop: getDeviceHeight(43),
    marginLeft: getDeviceWidth(91),
    marginRight: getDeviceWidth(72),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemImage: {
    width: getDeviceWidth(176),
    height: getDeviceWidth(176),
  },
  itemInfo: {
    marginLeft: getDeviceWidth(41),
    justifyContent: 'center'
  },
  username: {
    fontSize: 16,
    color: '#575858'
  },
  bio: {
    fontSize: 13,
    color: '#575858'    
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  followText: {
    width: getDeviceWidth(257),
    height: getDeviceHeight(75),
    backgroundColor: BLUE_COLOR,
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  followButton: {
    alignSelf: 'center',
    color: 'white',
    fontSize: SMALL_FONT_SIZE,
    fontFamily: 'Comfortaa-Regular'
  },
});


export default styles