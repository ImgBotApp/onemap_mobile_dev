import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  suggestView: {
    width: commonStyles.screenSubWidth,
    backgroundColor: '#EFEEEE',
    marginLeft: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(100, 100, 100, 0.1)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: 'black',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  imageSlideView: {
    width: '100%',
  },
  descsriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
  },
  descsription: { 
    flexDirection: 'row',
    width: commonStyles.screenSubWidth -20,
  },
  textDescription: {
    fontSize: commonStyles.SMALL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR, 
  },
  btnView: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    backgroundColor: '#EFEEEE',
    paddingLeft: 5,
  },
  textView: {
    fontSize: commonStyles.SMALL_FONT_SIZE,
    color: commonStyles.BLUE_COLOR,
  }
})