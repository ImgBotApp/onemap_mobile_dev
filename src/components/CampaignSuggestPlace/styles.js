import { StyleSheet, Platform } from 'react-native'

import { getDeviceWidth } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efeeee',
    width: getDeviceWidth(761),
    minHeight:  getDeviceWidth(457),
  },
  PlaceName: {
    marginTop: getDeviceWidth(31),
    marginLeft: getDeviceWidth(50),
    color: '#585958'
  },
  imageContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginLeft: getDeviceWidth(28),
    marginTop: getDeviceWidth(69)
  },
  ImageCard: {
    width: getDeviceWidth(263),
    height: getDeviceWidth(185),
    marginRight: 10
  },
  playButton: {
    position: "absolute",
    backgroundColor: "transparent",
    color: "white",
    fontSize: 20,
    right: Platform.OS == 'android' ? 15 : 5,
    bottom: Platform.OS == 'android' ? 18 : 5,
    fontWeight: "100"
  },
  ItemImage: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    resizeMode: 'cover'
  },
  DetailPart: {
    marginTop: getDeviceWidth(39),
    marginLeft: getDeviceWidth(28),
    marginBottom: 10,
    flexDirection: 'row',
  },
  address: {
    width: getDeviceWidth(450),
  },
  ViewMore: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#0c80fe',
    justifyContent: 'center',
    alignItems: 'center',
    width: getDeviceWidth(252),
    height: getDeviceWidth(57)
  }
});

export default styles