import { StyleSheet } from 'react-native'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, RED_COLOR } from '@theme/colors';
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, NORMAL_FONT_SIZE } from '@theme/fonts';

const styles = StyleSheet.create({
  modalContainer: {
    width: getDeviceWidth(1200),
    height: getDeviceHeight(800),
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    height: getDeviceHeight(359),
    paddingTop: getDeviceWidth(50),
    paddingLeft: getDeviceWidth(30),
    paddingRight: getDeviceWidth(30)
  },
  title: {
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    alignSelf: 'center',
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: getDeviceWidth(50)
  },
  description: {
    width: getDeviceWidth(800),
    marginLeft: 10,
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  bottom: {
    height: getDeviceHeight(169),
    alignSelf: 'flex-end',
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
    color: BLUE_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  blockStr: {
    color: RED_COLOR,
    fontSize: BIG_FONT_SIZE
  },
});

export default styles