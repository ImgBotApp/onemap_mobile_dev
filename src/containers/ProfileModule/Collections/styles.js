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
  mainContainer: {
    width: getDeviceWidth(1223),
    marginTop: getDeviceHeight(223),
  },
  TabText: {
    color: LIGHT_GRAY_COLOR,
    fontSize:  BIG_FONT_SIZE
  },
  TabSelected: {
    borderBottomWidth: 1,
    borderBottomColor: DARK_GRAY_COLOR
  },
  TabSelectedText: {
    color: DARK_GRAY_COLOR
  },
  Stories: {
    marginLeft: getDeviceWidth(60),
    width: getDeviceWidth(1123),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
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
  }
});

export default styles