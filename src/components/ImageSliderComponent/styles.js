import { StyleSheet } from 'react-native'

// define your styles
const styles = StyleSheet.create({
    backbutton:{
        position:'absolute',
        right:20,
        top:30,
        fontSize:35,
        color:"white"
    },
  container: {
    justifyContent: 'center',
    alignItems:'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  slider: {
    marginTop: 0,
  },
  sliderContentContainer: {
    alignItems: 'center',
    paddingVertical: 0, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 0,
    position:'absolute',
    bottom:20
  },
  paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0
  },
  slideInnerContainer: {
    paddingHorizontal: 0,
    paddingBottom: 0 // needed for shadow
  },
  imageContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.9)',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
  },
  imageContainerEven: {
      backgroundColor: 'rgba(0,0,0,0.9)'
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'contain',
      borderRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
  },
  // image's border radius is buggy on ios; let's hack it!
  radiusMask: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 0,
      backgroundColor: 'white'
  },
  radiusMaskEven: {
      backgroundColor: 'grey'
  },
});

export default styles