import { StyleSheet } from 'react-native'

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  text: {
    position: 'absolute',
    margin: 5,
    bottom: 10,
    backgroundColor: 'transparent',
    color: '#e2dfe1',
    width: '100%',
    textAlign: 'center'
  }
});


export default styles