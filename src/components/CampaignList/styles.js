import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR } from '../../theme/colors';
import { NORMAL_FONT_SIZE, SMALL_FONT_SIZE, BIG_FONT_SIZE } from '../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    width:  getDeviceWidth(1305)
  },
  cardView: {
    width:  getDeviceWidth(1279),
    height: getDeviceHeight(319),
    marginBottom: 15
  },
  CampainItem: {
    width: getDeviceWidth(1279),
    height: getDeviceHeight(296),
    paddingTop: getDeviceHeight(34),
    paddingLeft: getDeviceWidth(40),
    flexDirection: 'row'
  },
  campainImage: {
    width: getDeviceWidth(264),
    height: getDeviceWidth(264),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8
  },
  CampainInformation: {
    marginLeft: getDeviceWidth(40),
    width: getDeviceWidth(893),
    height:  getDeviceHeight(232),
    justifyContent: 'space-between'
  },
  textInfo: {
    color: DARK_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE
  },
  description: {
    color: DARK_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  points: {
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE
  },
  pointNumber: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE,
    alignSelf: 'center'
  },
  ViewmoreButton: {
    width: getDeviceWidth(395),
    height: getDeviceHeight(74),
    borderWidth:1,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: BLUE_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeImage: {
    width: getDeviceWidth(68),
    height: getDeviceWidth(68),
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: getDeviceWidth(34),
    marginRight: getDeviceWidth(11)
  }
});

export default styles