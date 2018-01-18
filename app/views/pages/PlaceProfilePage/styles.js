import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    height: commonStyles.screenSubHeight,
    width: commonStyles.screenWidth,
  },
  subContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: commonStyles.padding,
    marginVertical: 10,
  },
  textTitle: {
    color: commonStyles.DARK_GRAY_COLOR,
    fontSize: commonStyles.BIGGER_FONT_SIZE
  },
  storySliderImageView: {
    marginVertical: 10,
  },
  sliderContainer: {
    marginVertical: 10,
    width: '100%',
  },
  //description
  descriptionContainer: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  textDescription: {
    color: commonStyles.GRAY_COLOR,
    fontSize: commonStyles.BIG_FONT_SIZE
  },
  textMore: {
    color: commonStyles.BLUE_COLOR,
    fontSize: commonStyles.NORMAL_FONT_SIZE
  },
  //map
  mapContainer: {
    marginVertical: 10,
    width: commonStyles.screenSubWidth,
    height: 100,
  },
  //information
  informationText: {
    color: commonStyles.GRAY_COLOR,
    fontSize: commonStyles.BIG_FONT_SIZE
  },
  informationContainer: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  informationItem: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 2,
  },
  title: {
    width: 130,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  //interest
  interestContainer: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: commonStyles.padding,
    alignItems: 'center'
  },
  interestInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  interestText: {
    color: commonStyles.GRAY_COLOR,
    fontSize: commonStyles.NORMAL_FONT_SIZE
  },
  serparate: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#DDD',
    marginVertical: 20,  
  },
  buttonInterest: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  //Keyword
  keywordsContainer: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  keywordTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keywordTitle: {
    color: commonStyles.DARK_GRAY_COLOR,
    fontSize: commonStyles.BIGGER_FONT_SIZE
  },
  keywordDone: {
    fontSize: commonStyles.BIG_FONT_SIZE,
    color: commonStyles.GRAY_COLOR
  },
  tagInputContainer: {
    width: '100%',
    minHeight: 70,
    backgroundColor: '#e9e8ea',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  KeywordInput: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    marginHorizontal: 3,
  },
  keywordTextStyle: {
    fontSize: commonStyles.NORMAL_FONT_SIZE
  },
  //Write story
  storyContainer: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: commonStyles.padding,
  },
  writeStoryMain: {
    width: commonStyles.screenSubWidth - 20,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  storyTitle: {
    width: '100%', 
    fontWeight: 'bold',
    color: commonStyles.DARK_GRAY_COLOR,
    marginTop: 20
  },
  storyDescription: {
    width: '100%', 
    color: commonStyles.DARK_GRAY_COLOR,
    marginBottom: 10
  },
  storyWriterImage: {
    width: 50,
    height: 50,
  },
  storyWriterName: {
    color: commonStyles.DARK_GRAY_COLOR,
    fontSize: commonStyles.BIGGER_FONT_SIZE,
    marginLeft: 10,
  },
  myImagesContainer: {
    marginVertical: 20,
    width: '100%',
    height: 100,
  },
  myImages: {
    width:  '100%',
    height: '100%'
  },
  //Story comment
  commentDate: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
    marginLeft: 10,
  },
  commentDescription: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
    marginTop: 10,
  },
})