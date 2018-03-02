import { StyleSheet } from 'react-native'
import { getDeviceWidth, getDeviceHeight } from '../../global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: getDeviceWidth(1318),
    height: getDeviceHeight(275),
    padding: getDeviceWidth(34),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15
  },
  sImg: {
    width: getDeviceWidth(204),
    height: getDeviceHeight(188)
  },
  aImg: {
    width: getDeviceWidth(119),
    height: getDeviceWidth(119),
    borderWidth: 1,
    borderRadius: getDeviceWidth(59),
    borderColor: 'transparent'
  },
  accountInformation: {
    marginLeft: getDeviceWidth(37),
    justifyContent: 'space-between'
  }
});


export default styles