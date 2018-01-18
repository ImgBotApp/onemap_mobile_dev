import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.backgroundColor,
    height: commonStyles.screenHeight,
    width: commonStyles.screenWidth
  },
  tabContainer: {
    backgroundColor: commonStyles.tabColor,
    height: commonStyles.tabBarHieght,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  tabIcon: {
    fontSize: 30,
    color: commonStyles.GRAY_COLOR
  },
  tabSelectIcon: {
    fontSize: 30,
    color: 'rgb(0, 193, 241)',
  },
  tabPlusIcon: {
    fontSize: 40,
    color: 'rgb(0, 193, 241)',
  }
})