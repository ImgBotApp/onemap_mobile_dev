//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles'

import { getDeviceWidth } from '@global'
import CircleImage from '@components/CircleImage'
import TitleImage from '@components/TitledImage'
import AutoHeightImage from 'react-native-auto-height-image';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import Collections from '@components/Collections'
import StoryBoard from '@components/StoryBoard'

import * as SCREEN from '@global/screenName'
import I18n from '@language'
import { DARK_GRAY_COLOR } from '@theme/colors';
import { SMALL_FONT_SIZE } from '@theme/fonts';

import { client } from '@root/main'
import { GET_FOLLOWS } from '@graphql/userprofile';

class ProfileComponent extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: '',
        id: 'Setting',
        disableIconTint: true
      }
    ]
  };
  constructor(props) {
    super(props)
    Ionicons.getImageSource('ios-settings-outline', 30, DARK_GRAY_COLOR).then(icon => {
      props.navigator.setButtons({
        rightButtons: [{
          icon,
          id: 'Setting',
          disableIconTint: true
        }]
      })
    })
    this.state = {
      ...props.user,
      displayName: props.user.displayName || props.user.firstName + " " + props.user.lastName,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  componentWillMount() {
    this.getMyFollows();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user != this.props.user) {
      this.setState({
        ...nextProps.user,
        displayName: nextProps.user.displayName || nextProps.user.firstName + " " + nextProps.user.lastName
      });
    }
  }

  getMyFollows = () => {
    client.query({
      query: GET_FOLLOWS,
      variables: {
        userId: this.props.user.id,
        blockUsersIds: []
      }
    }).then(({ data }) => {
      this.props.saveUserFollows(data.User.follows);
    }).catch(err => alert(err))
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'Setting') {
        this.props.navigator.push({
          screen: SCREEN.USER_ACCOUNT_SETTING,
          title: 'Account Settings',
          animated: true,
          navigatorStyle: {
            navBarTextColor: DARK_GRAY_COLOR,
            navBarTextFontFamily: 'Comfortaa-Regular'
          }
        })
      }
    }
  }
  onEditProfile() {
    this.props.navigator.push({
      screen: SCREEN.USER_PROFILE_EDIT,
      title: 'Edit Profile',
      animated: true,
      navigatorStyle: {
        navBarTextColor: DARK_GRAY_COLOR,
        navBarTextFontFamily: 'Comfortaa-Regular'
      }
    });
  }
  onFollowSetting = () => {
    this.props.navigator.push({
      screen: SCREEN.USER_FOLLOW_PAGE,
      title: 'Follow People',
      animated: true,
    })
  }
  render() {
    const { data: { loading, error, allStories }, GetFollowersList, follows, user } = this.props;
    if (loading) {
      return (
        <ActivityIndicator />
      )
    }
    if (!loading && error) {
      return <Text>{error}</Text>
    }

    const follow_cnt = follows ? follows.length : 0;

    let follower_cnt = 0;
    if (!GetFollowersList.loading && GetFollowersList.User.followers)
      follower_cnt = GetFollowersList.User.followers ? GetFollowersList.User.followers.length : 0;

    const checked_cnt = user.checkIns.length;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoView}>
          <View style={{ flexDirection: 'row' }}>
            <CircleImage style={styles.profileImage} uri={this.state.photoURL} radius={getDeviceWidth(171)} />
            <Image source={require('@assets/images/profileCircle.png')} style={styles.checkImage} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.nameView}>
              <View>
                <Text style={styles.bigName}>{this.state.displayName}</Text>
                <Text style={styles.userId}>
                  {this.state.username}
                </Text>
              </View>
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={this.onEditProfile.bind(this)}>
                <View style={styles.editProfileContainer}>
                  <Text style={styles.editProfile}>{I18n.t('SETTING_EDIT_PROFILE')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.spec}>
              <TouchableOpacity style={styles.spec} onPress={this.onFollowSetting}>
                <Text style={styles.specFont}>{I18n.t('PROFILE_FOLLOWING')}</Text>
                <Text style={styles.specFont}>{follow_cnt}</Text>
                <Text style={styles.specFont}>{I18n.t('PROFILE_FOLLOWER')}</Text>
                <Text style={styles.specFont}>{follower_cnt}</Text>
              </TouchableOpacity>
              <Text style={styles.specFont}>{I18n.t('PROFILE_VISITED')}</Text>
              <Text style={styles.specFont}>{checked_cnt}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bioText}>
          <Text style={styles.bio} numberOfLines={2} ellipsizeMode={'tail'}>{this.state.bio}</Text>
        </View>
        {/* Collection Part */}
        <View style={styles.vCollections}>
          <Text style={styles.collectionTitle}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
          <View style={styles.collectionItems}>
            <Collections
              onViewItem={this.onViewCollectionItem}
              onViewStories={this.onViewStories}
              onViewAll={this.onViewCollectionsAll}
            />
          </View>
        </View>
        {/* Stories Part */}
        <View style={styles.vStories}>
          <Text style={styles.storyTitle}>{I18n.t('PROFILE_STORY_TITLE')}</Text>
          {
            allStories ? (
              <StoryBoard style={styles.StoryContainer} data={allStories} width={375}
                onPressItem={this.onStoryItem}
              />) : null
          }
        </View>
      </ScrollView>
    );
  }

  onViewCollectionItem = (item) => {
    this.props.navigator.push({
      screen: SCREEN.COLLECTIONS_PAGE,
      animated: true,
      passProps: {
        type: item
      }
    })
  }
  onViewCollectionsAll = () => {
    this.props.navigator.push({
      screen: SCREEN.FEED_ALL_COLLECTION,
      title: I18n.t('COLLECTION_TITLE'),
      animated: true,
      passProps: {
        data: {
          allStories: this.props.data.allStories
        }
      }
    })
  }
  onViewStories = () => {
    this.props.navigator.push({
      screen: SCREEN.COLLECTIONS_PAGE,
      animated: true,
      passProps: {
        places: this.props.data.allStories.map(item => item.place)
      }
    })
  }
  onStoryItem = place => {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: 'My Stories',
      passProps: { place },
      navigatorbuttons: {
        rightButtons: [
          {
            icon: require('@assets/images/setting.png'),
            id: 'Setting',
            disableIconTint: true
          }
        ],
        leftButtons: [
          {
            title: '•••',
            id: 'detail',
            disableIconTint: true
          }
        ]
      },
    });
  }
  _openDrawerMenu() {
    $this.props.navigation.navigate('DrawerOpen')
  }
}




//make this component available to the app
export default ProfileComponent;
