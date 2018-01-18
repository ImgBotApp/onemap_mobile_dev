import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  mapmarker: {
    width: commonStyles.getDeviceWidth(100),
    height: commonStyles.getDeviceHeight(110),
  }
})