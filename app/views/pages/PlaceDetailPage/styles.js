import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    height: commonStyles.screenSubHeight,
    width: commonStyles.screenWidth,
    justifyContent: 'space-between',
  },
  topView: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: commonStyles.padding,
  },
  logoView: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 25,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 1,
    shadowColor: 'black',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  titleView: {
    height: 80,
    width: commonStyles.screenSubWidth - 110,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: commonStyles.BIGGER_FONT_SIZE,
    color: commonStyles.DARK_GRAY_COLOR,
  },
  subTitle: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
  },
  btnCheck: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: commonStyles.GRAY_COLOR,
    paddingVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCheck: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
  },
  textSuggest: {
    color: commonStyles.DARK_GRAY_COLOR,
    fontSize: 17,
    paddingHorizontal: 20,
  },
  suggestView: {
    marginVertical: 5,
  },
  slide: {
    alignItems: 'flex-start',
  },
  ruleView: {
    flexDirection: 'row',
    paddingHorizontal: commonStyles.padding,
  }
})