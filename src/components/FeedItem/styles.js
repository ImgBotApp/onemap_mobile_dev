import { StyleSheet } from 'react-native'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR } from '../../theme/colors';
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: getDeviceWidth(1267),
    paddingTop: getDeviceHeight(74),
    paddingLeft: getDeviceWidth(54),
    paddingRight: getDeviceWidth(42)
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  user: {
    width: getDeviceWidth(650),
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  userDescription: {
    marginLeft: getDeviceWidth(47)
  },
  profileImage: {
    width: getDeviceWidth(140),
    height: getDeviceWidth(140)
  },
  name: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  update: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  feedTitle: {
    marginTop: getDeviceHeight(78),
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR    
  },
  feedImages: {
    height: getDeviceHeight(365)
  },
  feedItemImage: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5
  },
  FeedImageItem: {
    marginTop: getDeviceHeight(50),    
    height: getDeviceHeight(340),
    width: getDeviceWidth(532),
    marginRight: getDeviceWidth(30),
  },
  placeTitle: {
    marginTop: getDeviceHeight(50),
    color: LIGHT_GRAY_COLOR
  },
  separate: {
    marginTop: getDeviceHeight(50),    
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR
  },
  description: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  additionalText: {
    color: BLUE_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  descriptionText: {
    marginTop: getDeviceHeight(50),        
  }
});


export default styles