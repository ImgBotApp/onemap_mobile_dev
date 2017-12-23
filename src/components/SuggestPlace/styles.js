import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '../../theme/fonts';
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR } from '../../theme/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: getDeviceWidth(1267),
    borderRadius: 5,
    padding: getDeviceWidth(45)
  },

  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: getDeviceWidth(324),
    height: getDeviceHeight(324),
    borderRadius: 5,
    borderColor: 'transparent',
    borderWidth: 1
  },
  mainText: {
    fontSize: BIG_FONT_SIZE,
    color : DARK_GRAY_COLOR,
    fontWeight: 'bold'
  },
  moreText: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
  button: {
    width: getDeviceWidth(445),
    height: getDeviceHeight(75),
    borderColor: BLUE_COLOR,
    borderRadius: 4,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkIn: {
    color: BLUE_COLOR,
    fontWeight: 'bold',
    fontSize: SMALL_FONT_SIZE
  }
});

export default styles