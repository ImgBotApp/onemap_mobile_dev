import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE } from '../../../theme/fonts';

import { getDeviceWidth, getDeviceHeight} from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR
  },
  titleText: {
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  addressText: {
    fontSize: NORMAL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
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
    width: getDeviceWidth(79),
    height: getDeviceHeight(95)
  },
});

export default styles;