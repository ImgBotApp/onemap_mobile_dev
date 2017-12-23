import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR } from '../../../theme/colors';

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE } from '../../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUNDCOLOR,
  },
  topItem: {
    marginTop: getDeviceHeight(114)
  },
  recommendText: {
    marginLeft: getDeviceWidth(115),
    marginRight: getDeviceWidth(70),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  recString: {
    color: DARK_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'bold'
  },
  users: {
    marginTop: getDeviceHeight(114)      
  },
  feedItem: {alignItems: 'center', marginTop: getDeviceHeight(84)}
});

export default styles