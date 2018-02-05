import { StyleSheet } from 'react-native'
import { BLUE_COLOR } from './colors';

export default styles = StyleSheet.create({
  Header: {
    fontFamily: 'SukhumvitSet-Bold',
    fontSize: 20
  },
  Title: {
    fontFamily: 'SukhumvitSet-Medium',
    fontSize: 18
  },
  SubTitle: {
    fontFamily: 'SukhumvitSet-Light',
    fontSize: 10
  },
  Content: {
    fontFamily: 'SukhumvitSet-Medium',
    fontSize: 15
  },
  SubContent: {
    fontFamily: 'SukhumvitSet-Medium',
    fontSize: 13
  },
  Regular: {
    fontFamily: 'SukhumvitSet-Text',
    fontSize: 13
  },
  AdditionalText: {
    fontSize: SMALL_FONT_SIZE,
    color: BLUE_COLOR
  }
});

export const ICON_SIZE = 24

export const BIGGER_FONT_SIZE = 19 //31.99
export const BIG_FONT_SIZE = 17 //28.79
export const NORMAL_FONT_SIZE = 12 //23.03
export const SMALL_FONT_SIZE = 9 //15.36
export const SMALLER_FONT_SIZE = 7 //11.52