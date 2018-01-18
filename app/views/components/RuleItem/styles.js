import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  ruleView: {
    height: 90,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(100, 100, 100, 0.1)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: 'black',
    borderRadius: 5,
  },
  title: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.DARK_GRAY_COLOR,
  },
  subTitle: {
    fontSize: commonStyles.SMALL_FONT_SIZE,
    color: commonStyles.DARK_GRAY_COLOR,
  },
  item: {
    flexDirection: 'row',
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
    color: commonStyles.BLUE_COLOR,
  }
})