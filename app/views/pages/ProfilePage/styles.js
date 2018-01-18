import {
  StyleSheet,
} from 'react-native';

import * as commonStyles from '@global/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.backgroundColor,
    height: commonStyles.screenSubHeight,
    width: commonStyles.screenWidth,
    paddingHorizontal: commonStyles.padding,
  },
  infoView: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  profileView: {
    width : 100,
    height: 100,
  },
  profileImage: {
    width : 100,
    height: 100,
  },
  checkImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  infoContainer: {
    marginHorizontal: commonStyles.padding/2,
    flex: 1,
  },
  title: {
    fontSize: commonStyles.BIGGER_FONT_SIZE,
    color: commonStyles.DARK_GRAY_COLOR,
  },
  email: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
  },
  followingContainer: {
    marginLeft: commonStyles.padding,
  },
  followers: {
    fontSize: commonStyles.NORMAL_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
  },
  followerCount: {
    fontSize: 19,
    color: commonStyles.GRAY_COLOR,
  },
  descriptionContainer: {

  },
  description: {
    fontSize: commonStyles.BIG_FONT_SIZE,
    color: commonStyles.GRAY_COLOR,
  },
  tabContainer: {
    marginTop: 20,
  },
  tabView: {
    backgroundColor: 'transparent', 
    position: 'relative',
    marginBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemText: {
    fontSize: 19,
    color: commonStyles.GRAY_COLOR,
  },
  tabSelectItemText: {
    fontSize: 19,
    color: commonStyles.DARK_GRAY_COLOR,
  },
  separate: {
    borderTopWidth: 1,
    borderColor: commonStyles.GRAY_COLOR,
    width: 50,
    marginTop: 5,
  },
  separateSelect: {
    borderTopWidth: 1,
    borderColor: commonStyles.DARK_GRAY_COLOR,
    width: 50,
    marginTop: 5,
  },
  mapContainer: {
    marginVertical: 10,
    width: '100%',
    height: '100%',
  },
})