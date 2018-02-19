import { StyleSheet } from 'react-native'

import { getDeviceHeight, getDeviceWidth } from '@global'

const itemWidth = 335;

const styles = StyleSheet.create({
  main: {
    // alignItems: 'center'
  },
  firstContainer: {
    alignItems: 'center',
    marginTop: getDeviceHeight(94),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: getDeviceWidth((itemWidth + 1) * 4),
    alignSelf: 'center',
    marginTop: getDeviceHeight(20)
  },
  cell: {
    width: getDeviceWidth(itemWidth),
    height: getDeviceHeight(itemWidth)
  },
  collection: {
    width: getDeviceWidth(293),
    height: getDeviceWidth(293)
  }
});

export default styles