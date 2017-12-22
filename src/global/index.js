import { Dimensions } from 'react-native'

import { DESIGN_WIDTH, DESIGN_HEIGHT } from './const'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

export function getDeviceWidth (width) {
  return Math.round(width * DEVICE_WIDTH / DESIGN_WIDTH)
}

export function getDeviceHeight (height) {
  return Math.round(height * DEVICE_HEIGHT / DESIGN_HEIGHT)
}