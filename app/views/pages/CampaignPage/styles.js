import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    height: commonStyles.screenSubHeight,
    width: commonStyles.screenWidth,
  },
  campaignItem: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    left: commonStyles.padding,
    width: commonStyles.screenSubWidth,
    borderRadius: 10,
    height: 100,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
    shadowColor: 'black',
  },
  modal: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
})