import {
  StyleSheet,
  Platform,
} from 'react-native';

import * as commonStyles from '../../../global/styles/commonStyles';

const STATUSBAR_HEIGHT = commonStyles.STATUSBAR_HEIGHT;

export const styles = StyleSheet.create({
  container: {
    height: commonStyles.menuHeight - 2,
    width: commonStyles.screenWidth,
    backgroundColor: commonStyles.menuColor,
    paddingTop: STATUSBAR_HEIGHT,
    // borderBottomWidth: 2,
    // borderColor: '#D3D3D3',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    shadowColor: 'black',
    marginBottom: 2,
  },
  subContainer: {
    height: commonStyles.menuHeight - STATUSBAR_HEIGHT,
    paddingHorizontal: commonStyles.padding,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  menuTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: commonStyles.DARK_GRAY_COLOR,
  },
  backIconWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    color: commonStyles.DARK_GRAY_COLOR,
  },
});