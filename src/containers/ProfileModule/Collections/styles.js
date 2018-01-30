import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR } from '../../../theme/colors';
import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../../theme/colors';
import { getDeviceHeight, getDeviceWidth } from '@global'
import { NORMAL_FONT_SIZE, BIG_FONT_SIZE, SMALL_FONT_SIZE } from '../../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  mainContainer: {
    width: getDeviceWidth(1223),
    marginTop: getDeviceHeight(223),
  },
  TabText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  TabSelected: {
    borderBottomWidth: 1,
    borderBottomColor: DARK_GRAY_COLOR
  },
  TabSelectedText: {
    color: DARK_GRAY_COLOR
  },
  Stories: {
    width: getDeviceWidth(1223),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  storyItemTitle: {
    fontFamily: 'Comfortaa-regular',
    fontSize: 12,
    textAlign: 'left'
  },
  CollectionContainer: {
    marginTop: 15,
    width: '100%'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapView: {
    width: '100%',
    height: getDeviceHeight(1911)
  },
  customView: {
    width: 160,
  },
  calloutcontainer: {
    flexDirection: 'column',
    bottom: 0,
  },
  bubble: {
    width: 160,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#4da2ab',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -8,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: 0,
  },
  mapmarker: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain'
  },
});

export default styles