import { StyleSheet } from 'react-native'

import { getDeviceHeight, getDeviceWidth } from '@global'
import { APPFONTNAME } from '@theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vStories: {
    marginTop: getDeviceHeight(68),
    marginLeft: getDeviceWidth(96)
  },
  storyTitle: {
    fontFamily: APPFONTNAME.Regular,
    fontSize: 14,
    color: '#575858',
    marginBottom: getDeviceHeight(83)
  },
  StoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: getDeviceHeight(88),
  },
});

export default styles