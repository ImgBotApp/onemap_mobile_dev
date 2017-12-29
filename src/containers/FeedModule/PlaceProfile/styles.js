import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';

import { getDeviceWidth, getDeviceHeight } from '@global'
import { BIG_FONT_SIZE, SMALL_FONT_SIZE, SMALLER_FONT_SIZE, NORMAL_FONT_SIZE, BIGGER_FONT_SIZE } from '../../../theme/fonts';
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
    alignItems: 'center'
  },
  titleText: {
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  imageContainer: {
    marginTop: getDeviceHeight(89),
  },
  separatebar: {
    width: getDeviceWidth(1335),
    borderWidth:1,
    borderColor: LIGHT_GRAY_COLOR
  },
  Collections: {
    marginTop: getDeviceHeight(66),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getDeviceWidth(1338)
  },
  collection: {
    width: getDeviceWidth(303),
    height: getDeviceHeight(303)
  },
  imageItem: {
    width: getDeviceWidth(520),
    height:  getDeviceHeight(373),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 6
  },
  imageItemContainer: {
    width: getDeviceWidth(520),
    height:  getDeviceHeight(373),
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 6,
    marginRight: getDeviceWidth(30)
  },
  imageFlatList: {
    height:  getDeviceHeight(403)
  },
  description: {
    height: getDeviceHeight(91),
    paddingLeft: getDeviceWidth(76),
    paddingRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
  },
  descriptionText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  mapView: {
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
    height: getDeviceHeight(283)
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapmarker: {
    width: getDeviceWidth(79),
    height: getDeviceHeight(95)
  },
  informationText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  informationContainer: {
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
  },
  interestContainer: {
    marginLeft: getDeviceWidth(76),
    marginRight: getDeviceWidth(76),
    marginTop: getDeviceHeight(89),
    alignItems: 'center'
  },
  interestInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  interestText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: SMALL_FONT_SIZE
  },
  serparate: {
    width: '100%',
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
    marginTop: getDeviceHeight(89)    
  },
  buttonInterest: {
    marginTop: getDeviceHeight(89),
    width: getDeviceWidth(662),
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    fontSize: SMALLER_FONT_SIZE
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
    width: getDeviceWidth(1178),
    padding: getDeviceWidth(30),
    marginTop: getDeviceHeight(89),
  },
  storyWriterImage: {
    width: getDeviceWidth(134),
    height: getDeviceHeight(134)
  },
  storyWriterName: {
    marginLeft: getDeviceWidth(40),
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE
  },
  myImagesContainer: {
    marginTop: getDeviceHeight(89),    
    width: getDeviceWidth(1118),
    height: getDeviceHeight(393)
  },
  myImages: {
    width:  '100%',
    height: '100%'
  },
  commentDate: {
    fontSize: NORMAL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR,
    marginLeft: getDeviceWidth(40), 
  },
  commentDescription: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
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
    color: DARK_GRAY_COLOR,
    fontSize: BIG_FONT_SIZE,
    marginLeft: getDeviceWidth(492)
  },
  plusButton: {
    color: DARK_GRAY_COLOR,
    fontSize: BIGGER_FONT_SIZE,
    marginLeft: getDeviceWidth(346)
  },
});

export default styles