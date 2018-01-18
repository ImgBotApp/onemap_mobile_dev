import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  campaign: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  logoView: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 20,
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
  title: {
    fontSize: commonStyles.BIGGER_FONT_SIZE,
    color: commonStyles.DARK_GRAY_COLOR,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.DARK_GRAY_COLOR,
  }
})