import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import I18n from '@i18n';

import { ifIphoneX } from 'react-native-iphone-x-helper';

import ExtraDimensions from 'react-native-extra-dimensions-android';

export const { width: screenWidthIOS, height: screenHeightIOS } = Dimensions.get('window');

export const RealWidth = ExtraDimensions.get('REAL_WINDOW_WIDTH');
export const RealHeight = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
export const softMenubarHeight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
export const statusbarHeight = ExtraDimensions.get('STATUS_BAR_HEIGHT');
export const smartbarHeight = ExtraDimensions.get('SMART_BAR_HEIGHT');

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(44, 30) : 0;

function getScreenHeight() {
  if (Platform.OS === "ios") {
      return screenHeightIOS;
  }
  else {
      return RealHeight - softMenubarHeight - statusbarHeight - smartbarHeight;
  }
}

function getScreenWidth() {
  if (Platform.OS === "ios") {
    return screenWidthIOS;
  }
  else {
    return RealWidth;
  }
}

export let screenHeight = getScreenHeight();
export let screenWidth = getScreenWidth();

export const menuHeight = 40 + STATUSBAR_HEIGHT;
export const tabBarHieght = 60;

export const screenNormalHeight = screenHeight - menuHeight;
export const screenSubHeight = screenHeight - menuHeight - tabBarHieght;
export const screenSubWidth = screenWidth * 0.9;

export const padding = screenWidth * 0.05;

export const DESIGN_WIDTH  = 1440;
export const DESIGN_HEIGHT = 2542;

export function getDeviceWidth (width) {
  return Math.round(width * screenWidth / DESIGN_WIDTH)
}

export function getDeviceHeight (height) {
  return Math.round(height * screenHeight / DESIGN_HEIGHT)
}



/*Color*/
export const ICON_SIZE = 24
export const BIGGER_FONT_SIZE = 20 //31.99
export const BIG_FONT_SIZE = 14 //28.79
export const NORMAL_FONT_SIZE = 12 //23.03
export const SMALL_FONT_SIZE = 9 //15.36
export const SMALLER_FONT_SIZE = 7 //11.52

export const DARK_GRAY_COLOR = '#454545';
export const GRAY_COLOR = '#8B8B8B';
export const BLUE_COLOR = 'rgb(0, 133, 200)';

export const menuColor = '#F2F2F2';
export const tabColor = 'rgb(246,248,249)';
export const backgroundColor = 'rgb(238, 237, 237)';

export const LIGHT_GRAY_COLOR = '#a8a7a8'

export const WHITE_COLOR = '#f4f4f5'

export const LIGHT_BLUE = '#007aff'

export const RED_COLOR = '#cb2d4b'

export const GREEN_COLOR = '#acd6a0'

export const BACKGROUNDCOLOR = '#f0efef'


export function calculateCount (count) {
  var ret;
  if (count > 999) {
    var c = Math.round( count / 100 ) / 10;
    ret = `${c} k`
  } else {
    ret = `${count}`
  }
  return ret;
}

export function calculateDuration (updateDate) {
  var one_day=1000*60*60*24;
  var today = new Date().getTime()
  var updatedTime = updateDate.getTime()
  var duration = Math.floor((today - updatedTime) / one_day)

  if ( duration == 0) return `${I18n.t('UPDATED_YESTERDAY')}`
  if ( duration < 31) return `${I18n.t('UPDATED')} ${duration} ${I18n.t('DAYS_AGO')}`
  var months = Math.floor(duration/30)
  if ( months == 0) return `${I18n.t('UPDATED_MONTH_AGO')}`
  if ( months < 12) return `${I18n.t('UPDATED')} ${months} ${I18n.t('MONTHS_AGO')}`
  var year = Math.floor(months/12)
  if ( year == 0) return `${I18n.t('UPDATED_YEAR_AGO')}`
  return `${I18n.t('Updated')} ${year} ${I18n.t('Years ago')}`
}