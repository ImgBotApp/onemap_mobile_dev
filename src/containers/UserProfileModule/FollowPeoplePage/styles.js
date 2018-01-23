import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, RED_COLOR } from '../../../theme/colors';
import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '../../../theme/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: BACKGROUNDCOLOR,
  },
  modalContainer: {
    width: getDeviceWidth(1000),
    height: getDeviceHeight(621),
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    // padding: getDeviceWidth(30),
    justifyContent: 'space-between'
  },
  BlockTitle: {
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR,
  },
  BlockDescription: {
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    textAlign: 'center'
  },
  FollowerdescriptionContainer: {
    height: getDeviceHeight(359),
    paddingTop: getDeviceWidth(30),
    paddingLeft: getDeviceWidth(30),
    paddingRight: getDeviceWidth(30),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  FollowerBottom: {
    height: getDeviceHeight(169),
    alignSelf:'flex-end',
    width: '100%',
    borderColor: LIGHT_GRAY_COLOR,
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  modalButton: {
    flex: 1,
    borderColor: LIGHT_GRAY_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelStr: {
    color:  BLUE_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  blockStr: {
    color: RED_COLOR,
    fontSize: BIG_FONT_SIZE    
  }
});

export default styles