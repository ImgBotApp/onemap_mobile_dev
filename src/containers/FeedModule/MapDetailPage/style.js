import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE } from '../../../theme/fonts';

import { getDeviceWidth, getDeviceHeight } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR
  },
  titleText: {
    color: DARK_GRAY_COLOR,
    padding:10,
    paddingBottom:3
  },
  addressText: {
    color: LIGHT_GRAY_COLOR,
    padding:10,
    paddingTop:3
  },
  mapView: {
    width: '100%',
    height: '100%'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapmarker: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain'
  },
});

export default styles;