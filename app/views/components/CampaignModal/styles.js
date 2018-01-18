import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  campaignModal: {
    width: '100%',
    // height:' 80%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 50,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    shadowColor: 'black',
    paddingVertical: 10,
  },
  descriptionView: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  textDescription: {
    color: commonStyles.DARK_GRAY_COLOR,
    fontSize: commonStyles.NORMAL_FONT_SIZE,
  },
  suggestPlaceView: {
    width: '100%',
  },
  textSuggest: {
    color: commonStyles.DARK_GRAY_COLOR,
    fontSize: 17,
    paddingHorizontal: 20,
  },
  suggestView: {
    marginVertical: 10,
  },
  slide: {
    width: commonStyles.screenSubWidth,
    alignItems: 'flex-start',
  },
})