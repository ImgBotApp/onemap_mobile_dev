import { StyleSheet, Platform } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR } from '../../../theme/colors';

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, SMALLER_FONT_SIZE, NORMAL_FONT_SIZE, BIGGER_FONT_SIZE, APPFONTNAME } from '../../../theme/fonts';
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    paddingTop: getDeviceHeight(45)
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: getDeviceWidth(76),
    paddingRight: getDeviceWidth(76),
    alignItems: 'flex-start'
  },
  titleText: {
    color: DARK_GRAY_COLOR,
    fontSize: BIGGER_FONT_SIZE,
    width: getDeviceWidth(1100),
  },
  imageContainer: {
    marginTop: getDeviceHeight(89),
  },
  separatebar: {
    width: getDeviceWidth(1335),
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR
  },
  Collections: {
    marginTop: getDeviceHeight(66),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: getDeviceWidth(1338)
  },
  collectionContainer: {
    width: getDeviceHeight(303),
    height: getDeviceHeight(303),
    marginHorizontal: getDeviceWidth(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  collection: {
    width: '100%',
    height: '100%'
  },
  imageItem: {
    width: getDeviceWidth(520),
    height: getDeviceHeight(373),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 6
  },
  imageItemContainer: {
    width: getDeviceWidth(520),
    height: getDeviceHeight(373),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 6,
    marginRight: getDeviceWidth(30)
  },
  imageFlatList: {
    height: getDeviceHeight(403)
  },
  description: {
    // height: getDeviceHeight(91),
    paddingLeft: getDeviceWidth(76),
    paddingRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
  },
  descriptionText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE,
    fontFamily: APPFONTNAME.Regular
  },
  additionalText: {
    color: BLUE_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  mapView: {
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
    height: getDeviceHeight(323),
    overflow: 'hidden',
    zIndex: 10
  },
  mapWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -30,
    zIndex: 0
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapmarker: {
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain'
  },
  informationText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontFamily: APPFONTNAME.Regular,
    marginBottom: 2
  },
  informationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
  },
  informationLabel: {
    flex: 0.32
  },
  informationContent: {
    flex: 0.68
  },
  interestContainer: {
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
    alignItems: 'center'
  },
  interestItem: {
    flexDirection: 'row',
    marginLeft: getDeviceWidth(30),
    alignItems: 'center',
  },
  interestInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  interestLabel: {
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE - 1,
    fontFamily: APPFONTNAME.Regular
  },
  interestText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: NORMAL_FONT_SIZE - 1,
    fontFamily: APPFONTNAME.Regular,
    marginTop:15
  },
  serparate: {
    width: '100%',
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
  },
  buttonInterest: {
    marginTop: getDeviceHeight(89),
    width: getDeviceWidth(1267),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1
  },
  itemInterest:{
    justifyContent:'center',
    alignItems:'center'
  },
  actionBtn:{
    resizeMode:'contain',
    width:25,
    height:25
  },
  keyWords: {
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89)
  },
  keywordTitle: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  keywordDone: {
    fontSize: BIG_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
  keywordContainer: {
    marginTop: getDeviceHeight(50),
    height: getDeviceHeight(200),
    paddingLeft: 15,
    backgroundColor: '#e9e8ea',
    justifyContent: 'center'
  },
  KeywordInput: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  keywordTextStyle: {
    fontSize: NORMAL_FONT_SIZE
  },
  WriteStory: {
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
    alignItems: 'center'
  },
  writeStoryTitle: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE,
    width: '100%'
  },
  writeStoryMain: {
    width: getDeviceWidth(1267),
    padding: Platform.OS == 'android' ? getDeviceWidth(60) : getDeviceWidth(30),
    marginTop: getDeviceHeight(89),
  },
  storyWriterImage: {
    width: getDeviceWidth(134),
    height: getDeviceWidth(134)
  },
  userDescription: {
    marginLeft: getDeviceWidth(47),
    width: getDeviceWidth(800),
  },
  storyWriterName: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE,
  },
  myImagesContainer: {
    marginTop: getDeviceHeight(89),
    width: '100%',
    height: getDeviceHeight(393)
  },
  myImages: {
    width: '100%',
    height: '100%'
  },
  commentDate: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE,
  },
  commentTitle: {
    marginVertical: 5,
    fontSize: BIG_FONT_SIZE,
  },
  commentDescription: {
    fontSize: NORMAL_FONT_SIZE,
  },
  collectionModal: {
    height: getDeviceHeight(704),
    borderRadius: 15,
    borderColor: 'transparent',
    borderWidth: 1,
    alignItems: 'center'
  },
  modalContainer: {
    padding: getDeviceWidth(42),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE,
  },
  plusButton: {
    color: DARK_GRAY_COLOR,
    fontSize: BIGGER_FONT_SIZE,
  },
  overlayContainer: {
    position: 'absolute',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(153,153,153,0)',
    padding: 0,
  },
  overlayWrapper: {

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
  modalMediaView: {
    width: getDeviceWidth(1000),
    height: getDeviceHeight(750),
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    // padding: getDeviceWidth(30),
    justifyContent: 'space-between'
  },
  BlockTitle: {
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR,
  },
  modalMediaViewHeader: {
    height: getDeviceHeight(150),
    paddingTop: getDeviceWidth(30),
    paddingLeft: getDeviceWidth(30),
    paddingRight: getDeviceWidth(30),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modalItem: {
    height: getDeviceHeight(200),
    width: '100%',
    borderColor: LIGHT_GRAY_COLOR,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButton: {
    flex: 1,
    borderColor: LIGHT_GRAY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  cancelStr: {
    color: BLUE_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  buttonStr: {
    width: getDeviceWidth(800),
    color: 'black',
    fontSize: BIG_FONT_SIZE,
    width: '100%',
  },
  
});

export default styles
