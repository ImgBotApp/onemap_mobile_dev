import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BLUE_COLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../theme/colors';
import { NORMAL_FONT_SIZE, BIG_FONT_SIZE, SMALL_FONT_SIZE,APPFONTNAME } from '../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: getDeviceWidth(1267),
    borderRadius: 5,
    padding: getDeviceWidth(45)
  },
  visitProfile: {
    width: getDeviceWidth(391),
    height: getDeviceWidth(85),
    borderRadius: 5,
    borderColor: BLUE_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  visitiText: {
    color: BLUE_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'bold'
  },
  markImage: {
    width: getDeviceWidth(127),
    height: getDeviceWidth(127),
    borderRadius: getDeviceWidth(63),
    borderColor: 'transparent',
    borderWidth: 1,
    resizeMode: 'cover'
  },
  campaignInfo: {
    justifyContent: 'space-between',
    marginLeft: getDeviceWidth(15)
  },
  title: {
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    width:  getDeviceWidth(600)
  },
  campaign: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
  description: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR,
    fontFamily: APPFONTNAME.Regular
  },
  descriptionText: {
    marginTop: getDeviceWidth(50)
  },
  additionalText: {
    fontSize: SMALL_FONT_SIZE,
    color: BLUE_COLOR
  },
  image: {
    marginTop: getDeviceWidth(40),
    width: '100%',
    height: getDeviceWidth(367),
    borderRadius: 5,
    borderColor: 'transparent',
    borderWidth: 1
  }
});

export default styles