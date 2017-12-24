import { StyleSheet, Platform } from 'react-native'
import { BACKGROUNDCOLOR } from '../../theme/colors';

import {getDeviceWidth, getDeviceHeight} from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    backgroundColor: BACKGROUNDCOLOR,
  },
  StoryContainer: {
    marginLeft: getDeviceWidth(50),
    marginRight: getDeviceWidth(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StoryList: {
    width: getDeviceWidth(400)
  }
});


export default styles;