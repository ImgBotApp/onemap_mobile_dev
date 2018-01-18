import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    width: commonStyles.screenSubWidth,
    height: 130,
    backgroundColor: commonStyles.tabColor,
    borderRadius: 10,
    borderColor: 'rgba(100, 100, 100, 0.1)',
    borderWidth: 1,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    shadowColor: 'black',
    marginBottom: 20,
    padding: 15,
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  day: {
    fontSize: 30,
    color: commonStyles.DARK_GRAY_COLOR,
    paddingHorizontal: 5,
  },
  year: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  titleView: {
    marginVertical: 5,
  },
  title: {
    fontSize: commonStyles.BIG_FONT_SIZE,
    color: commonStyles.BLUE_COLOR,
  },
  subTitle: {
    fontSize: commonStyles.SMALL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
  },
  switchView: {
    alignItems: 'flex-end',
  },
  switch: {
    transform: [{scaleX: 0.5}, {scaleY: 0.5}]
  }
})