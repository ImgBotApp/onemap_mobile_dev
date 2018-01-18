import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  suggestView: {
    width: 250,
    backgroundColor: '#EFEEEE',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(100, 100, 100, 0.1)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: 'black',
    borderRadius: 5,
    marginLeft: 20,
    marginVertical: 5,
    // justifyContent: 'space-between',
  },
  titleView: {
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.DARK_GRAY_COLOR,
  },
  imageSlideView: {
    width: '100%',
  },
  addressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
  },
  address: {
    flex: 1.
  },
  textAddress: {
    fontSize: commonStyles.SMALL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
  },
  btnView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: commonStyles.BLUE_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    fontSize: commonStyles.SMALL_FONT_SIZE,
    color: commonStyles.BLUE_COLOR,
  }
})