import { StyleSheet, Platform } from 'react-native'
import { BACKGROUNDCOLOR, LIGHT_GRAY_COLOR, DARK_GRAY_COLOR, BLUE_COLOR } from '@theme/colors';

import { getDeviceHeight, getDeviceWidth } from '@global'
import { APPFONTNAME, BIG_FONT_SIZE, NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '@theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    paddingTop: getDeviceHeight(121),
    paddingLeft: getDeviceWidth(62),
    paddingRight: getDeviceWidth(62)
  },
  name: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  collectionInput: {
    marginTop: getDeviceHeight(76),
    //height: Platform.OS === 'android' ? getDeviceHeight(140) : getDeviceHeight(120),
    paddingLeft: getDeviceWidth(59),
    backgroundColor: '#e9e8ea'
  },
  privacyContainer: {
    marginTop: getDeviceHeight(166)
  },
  privacy: {
    marginTop: getDeviceHeight(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  privacyText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE
  },
  separate: {
    width: getDeviceWidth(1308),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
    marginTop: getDeviceHeight(50)
  },
  modalContainer: {
    height: getDeviceHeight(595),
    width: getDeviceWidth(926),
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: getDeviceHeight(48)
  },
  modalTitle: {
    alignSelf: 'center',
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  modalDescription: {
    marginTop: getDeviceHeight(70),
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
    textAlign: 'center',
    paddingLeft: getDeviceWidth(119),
    paddingRight: getDeviceWidth(119),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: getDeviceHeight(141),
    alignSelf: 'flex-end',
    borderTopColor: DARK_GRAY_COLOR,
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  modalButton: {
    width: getDeviceWidth(462),
    height: getDeviceHeight(141),
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: BIG_FONT_SIZE,

    color: BLUE_COLOR
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderLeftColor: DARK_GRAY_COLOR
  },
  imageItemContainer: {
    width: getDeviceHeight(600),
    height: getDeviceHeight(600),
    alignSelf: 'center',
    marginTop: getDeviceWidth(166)
  },
  imageItem: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  deleteContainer: {
    width: getDeviceWidth(600),
    height: getDeviceHeight(150),
    marginBottom: getDeviceHeight(100),
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#575858',
    borderRadius: 5
  },
  deleteText: {
    color: '#575858',
    textAlign: 'center',
    fontFamily: APPFONTNAME.Regular,
    fontSize: NORMAL_FONT_SIZE,
    padding: 0
  }
});


export default styles