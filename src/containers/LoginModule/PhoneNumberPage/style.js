import { StyleSheet } from 'react-native'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { BLUE_COLOR, DARK_GRAY_COLOR } from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeded',
  },
  enterText: {
    marginTop       : getDeviceHeight(350),
    textAlign       : 'center',
    fontSize        : 13,
    fontFamily      : 'Comfortaa-regular',
    color           : DARK_GRAY_COLOR
  },
  PhoneInputContainer: {
    marginTop       : getDeviceHeight(125),
    marginLeft      : getDeviceWidth(330),
    width           : getDeviceWidth(779),
    height          : getDeviceHeight(79),
    borderBottomWidth: 1,
    borderColor     : '#a7a7a7'
  },
  description:{
    textAlign       : 'center',
    fontSize        : 10,
    color           : '#575858'
  },
  belowDistance: {
    marginTop       : getDeviceHeight(133)
  },
  privacyPolicy: {
    color           : BLUE_COLOR
  }
});

export default styles