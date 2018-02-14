import { Dimensions } from 'react-native'
import Moment from 'moment';

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
  //console.log(today);
  var updatedTime = new Date(updateDate).getTime()
  //console.log(updatedTime);
  var duration = Math.floor((today - updatedTime) / one_day)

  if (duration == 0) return `Updated today`
  if (duration == 1) return `Updated yesterday`
  if (duration < 31) return `Updated ${duration} Days ago`
  var months = Math.floor(duration / 30)
  if (months == 0) return `Updated a Month ago`
  if (months < 12) return `Updated ${months} months ago`
  var year = Math.floor(months / 12)
  if (year == 0) return `Updated a Year ago`
  return `Updated ${year} years ago`
}

export function formattedTimeDiffString(time) {
  if (!time) return '';

  let diff = (Date.now() - Moment(time)) / 1000;

  const diffDate = Math.round(diff / (60 * 60 * 24));
  const diffDateString = diffDate + (diffDate > 1 ? ' days' : ' day');
  diff = diff % (60 * 60 * 24);

  const diffHour = Math.round(diff / (60 * 60));
  const diffHourString = diffHour + (diffHour > 1 ? ' hrs' : ' hr');
  diff = diff % (60 * 60);

  const diffMin = Math.round(diff / 60);
  const diffMinString = diffMin + (diffMin > 1 ? ' mins' : ' min');

  const diffSec = Math.round(diff % 60);
  const diffSecString = diffSec + (diffSec > 1 ? ' seconds' : ' second');

  let str;
  if (diffDate) {
    str = diffDateString;
  } else if (diffHour) {
    str = diffHourString + ' ' + diffMinString;
  } else if (diffMin) {
    str = diffMinString;
  } else {
    str = diffSecString;
  }

  return 'Updated ' + str + ' ago';
}

export function getTimeDiff(date1, date2) {
  return (date2.getTime() - date1.getTime()) / 1000;
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
