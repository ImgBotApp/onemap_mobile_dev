import { StyleSheet } from 'react-native'
import * as GLOBAL from '@global'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeded',
  },
  enterText: {
    marginTop       : GLOBAL.getDeviceHeight(350),
    textAlign       : 'center',
    fontSize        : 13,
    fontFamily      : 'Comfortaa-regular',
    color           : GLOBAL.GRAY_FONT
  },
  PhoneInputContainer: {
    marginTop       : GLOBAL.getDeviceHeight(125),
    marginLeft      : GLOBAL.getDeviceWidth(330),
    width           : GLOBAL.getDeviceWidth(779),
    height          : GLOBAL.getDeviceHeight(79),
    borderBottomWidth: 1,
    borderColor     : '#a7a7a7'
  },
  description:{
    textAlign       : 'center',
    fontSize        : 10,
    color           : '#575858'
  },
  belowDistance: {
    marginTop       : GLOBAL.getDeviceHeight(133)
  }
});

export default styles