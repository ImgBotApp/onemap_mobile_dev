import { Dimensions } from 'react-native'

import { DESIGN_WIDTH, DESIGN_HEIGHT } from './const'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

export function getDeviceWidth(width) {
  return Math.round(width * DEVICE_WIDTH / DESIGN_WIDTH)
}

export function getDeviceHeight(height) {
  return Math.round(height * DEVICE_HEIGHT / DESIGN_HEIGHT)
}

export function calculateDuration(updateDate) {
  var one_day = 1000 * 60 * 60 * 24;
  var today = new Date().getTime()
  console.log(today);
  var updatedTime = new Date(updateDate).getTime()
  console.log(updatedTime);
  var duration = Math.floor((today - updatedTime) / one_day)

  if (duration == 0) return `Updated yesterday`
  if (duration < 31) return `Updated ${duration} Days ago`
  var months = Math.floor(duration / 30)
  if (months == 0) return `Updated a Month ago`
  if (months < 12) return `Updated ${months} months ago`
  var year = Math.floor(months / 12)
  if (year == 0) return `Updated a Year ago`
  return `Updated ${year} years ago`
}

export function calculateCount(count) {
  var ret;
  if (!count) {
    ret = '0';
  } else if (count > 999) {
    var c = Math.round(count / 100) / 10;
    ret = `${c} k`
  } else {
    ret = `${count}`
  }
  return ret;
}

export function clone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  let copy = obj.constructor();
  for (let attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}
