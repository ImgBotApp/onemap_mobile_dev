import { StyleSheet } from 'react-native'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../theme/colors';
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: getDeviceWidth(1267),
    borderRadius: 5,
    paddingTop: getDeviceHeight(33),
    paddingLeft: getDeviceWidth(58),
    paddingRight: getDeviceWidth(59),
    paddingBottom: getDeviceHeight(51),
    
  },
  eventImage: {
    height: getDeviceHeight(310),
    width: getDeviceWidth(310),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userImage: {
    width: getDeviceWidth(141),
    height: getDeviceHeight(141),
    borderRadius: getDeviceHeight(70),
    borderWidth: 1,
    borderColor: 'transparent'
  },
  userInfo: {
    marginLeft: getDeviceWidth(38),
    justifyContent: 'space-between'
  },
  userName: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  update: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  collectionAdd: {
    color: DARK_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'bold'
  }
});

export default styles