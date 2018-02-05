import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE, BIGGER_FONT_SIZE, SMALL_FONT_SIZE } from '@theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUNDCOLOR,
  },
  topItem: {
    marginTop: getDeviceHeight(114)
  },
  recommendText: {
    marginLeft: getDeviceWidth(115),
    marginRight: getDeviceWidth(70),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  recString: {
    color: DARK_GRAY_COLOR,
  },
  users: {
    marginTop: getDeviceHeight(114),   
    marginLeft:  getDeviceHeight(20)
  },
  feedItem: {alignItems: 'center', marginTop: getDeviceHeight(84)},
  modalContainer: {
    padding: getDeviceWidth(42),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE,
  },
  plusButton: {
    color: DARK_GRAY_COLOR,
    fontSize: BIGGER_FONT_SIZE,
  },
  collectionModal: {
    height: getDeviceHeight(704),
    borderRadius: 15,
    borderColor: 'transparent',
    borderWidth: 1,
    alignItems: 'center'
  },
  separatebar: {
    width: getDeviceWidth(1335),
    borderWidth:1,
    borderColor: LIGHT_GRAY_COLOR
  },
  Collections: {
    marginTop: getDeviceHeight(66),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: getDeviceWidth(1338)
  },
  collectionItemTitle: {
    color: 'white',
    fontSize: SMALL_FONT_SIZE
  },
  collectionContainer: {
    width: getDeviceHeight(303),
    height: getDeviceHeight(303),
    marginHorizontal: getDeviceWidth(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  collection: {
    width: '100%',
    height: '100%'
  }
});

export default styles