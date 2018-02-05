import { StyleSheet } from 'react-native';
import { DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '@theme/colors';

export default styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  imagePlaceholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: DARK_GRAY_COLOR
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#e2dfe1'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});