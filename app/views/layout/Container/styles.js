import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '../../../global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.backgroundColor,
    height: commonStyles.screenHeight,
    width: commonStyles.screenWidth
  },
  
  tabContainer: {
    backgroundColor: commonStyles.tabColor,
    height: commonStyles.tabBarHieght,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: commonStyles.padding,
  },
  tabIcon: {
    fontSize: 30,
    color: commonStyles.GRAY_COLOR,
    paddingBottom: 5,
  },
  tabSelectIcon: {
    fontSize: 30,
    color: 'rgb(0, 193, 241)',
    paddingBottom: 5,
  },
  tabPlusIcon: {
    backgroundColor: 'rgb(0, 193, 241)',
    width: 38,
    height: 38,
    borderRadius: 19,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabPlusIconText:{
    fontSize:40,
    color: 'white',
  }
})