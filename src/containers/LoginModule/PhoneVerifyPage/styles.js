import { StyleSheet } from 'react-native'

import * as GLOBAL from '@global'

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#efeded',
  },
  circularProgress: {
    marginTop         : GLOBAL.getDeviceHeight(246),
    justifyContent: 'center',
    alignItems: 'center'
  },
  circularPoints: {
    position: 'absolute',
    textAlign: 'center'
  },
  resendText: {
    fontFamily        : 'Comfortaa-regular',
    fontSize          : 13,
    textAlign         : 'center'
  },
  description: {
    marginTop         : GLOBAL.getDeviceHeight(100)
  },
  desFont: {
    fontSize          : 13,
    fontFamily        : 'Comfortaa-regular',
    textAlign         : 'center'
  },
  gapsPhoneNumber: {
    marginTop         : GLOBAL.getDeviceHeight(25)
  },
  inputCodeStyle: {
    borderColor       : '#a7a7a7'
  },
  inputContainer: {
    height            : GLOBAL.getDeviceHeight(200),
    flex              : 0
  },
  ResendContainer: {
    marginTop         : GLOBAL.getDeviceHeight(95)
  },
  resendText: {
    color             : '#575858',
    fontFamily        : 'Comfortaa-regular',
    textAlign         : 'center',
    fontSize          : 10
  },
  resendGaps: {
    marginTop         : GLOBAL.getDeviceHeight(29)
  }
})

export default styles