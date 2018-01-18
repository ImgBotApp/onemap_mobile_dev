import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  list: {
    
  },
  badgeImage: {
    width: commonStyles.screenSubWidth * 0.3,
    height: commonStyles.screenSubWidth * 0.3,
    marginBottom: commonStyles.screenSubWidth * 0.025,
    borderRadius: 5,
  }
})