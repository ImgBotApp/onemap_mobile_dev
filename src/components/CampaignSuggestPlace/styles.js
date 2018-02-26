import { StyleSheet, Platform } from 'react-native'

import { getDeviceWidth } from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efeeee',
    width: getDeviceWidth(761),
    minHeight:  getDeviceWidth(457),
    marginLeft: Platform.OS == 'ios' ? 0 : -5
  },
  PlaceName: {
    marginTop: getDeviceWidth(31),
    marginLeft: getDeviceWidth(50),
    color: '#585958'
  },
  imageContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginLeft: getDeviceWidth(50),
    marginTop: getDeviceWidth(69)
  },
  ImageCard: {
    width: getDeviceWidth(263),
    height: getDeviceWidth(185),
    marginRight: Platform.OS == 'ios' ? 10 : 0
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
    height: getDeviceWidth(185),
    width: getDeviceWidth(263),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    resizeMode: 'cover',
    marginRight: 10
  },
  DetailPart: {
    marginTop: getDeviceWidth(39),
    marginLeft: getDeviceWidth(50),
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
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
    height: getDeviceWidth(57),
    marginRight: Platform.OS == 'ios' ? 0 : getDeviceWidth(28),    
  }
});

export default styles