import { StyleSheet } from 'react-native'
import { getDeviceHeight, getDeviceWidth } from '@global'

import * as color from '@theme/colors'
import * as font from '@theme/fonts'
import { BLUE_COLOR, WHITE_COLOR } from '../../theme/colors';
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE } from '../../theme/fonts';

// define your styles
const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth(890),
    height: getDeviceHeight(376),
    marginBottom: 10,
    flexDirection: 'row',
    padding: getDeviceWidth(39),
    borderRadius: getDeviceWidth(30),
    borderWidth: 1,
    borderColor:'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  profileImage: {
    width: getDeviceWidth(304),
    height: getDeviceHeight(304),
    borderRadius: getDeviceWidth(152),
    borderWidth: 1,
    borderColor:'transparent'
  },
  info: {
    width: getDeviceWidth(455),
    height: getDeviceHeight(303),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    color: color.DARK_GRAY_COLOR,
    fontSize: font.BIGGER_FONT_SIZE
  },
  id: {
    marginTop: 4,
    color: color.DARK_GRAY_COLOR,
    fontSize: font.SMALLER_FONT_SIZE
  },
  separate: {
    width: getDeviceWidth(120),
    marginTop: 4,
    borderWidth: 1,
    borderColor: color.LIGHT_GRAY_COLOR
  },
  suggest: {
    color: color.LIGHT_GRAY_COLOR,
    fontSize: font.SMALL_FONT_SIZE
  },
  followButton: {
    width: getDeviceWidth(455),
    height: getDeviceHeight(84),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 7,
    backgroundColor: BLUE_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  followText: {
    color: WHITE_COLOR,
    fontSize: NORMAL_FONT_SIZE
  }
});

export default styles