import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BACKGROUNDCOLOR } from '../../theme/colors';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    width: getDeviceWidth(1305),
    height: getDeviceWidth(293),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemContainer: {
    width: getDeviceWidth(293),
    height: getDeviceWidth(293)
  }
});

export default styles