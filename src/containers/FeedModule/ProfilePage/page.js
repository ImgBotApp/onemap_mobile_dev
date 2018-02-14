//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image,Platform } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AutoHeightImage from 'react-native-auto-height-image';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import CampaignList from '@components/CampaignList'
import Collections from '@components/Collections'
import StoryBoard from '@components/StoryBoard'
import CircleImage from '@components/CircleImage'
import TitleImage from '@components/TitledImage'
import styles from './styles'
import I18n from '@language'
import { getDeviceWidth, getDeviceHeight, calculateCount, clone } from '@global'
import * as SCREEN from '@global/screenName'
import { BLUE_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts'

import { client } from '@root/main'
import { GET_ONEMAPPER_PROFILE } from '@graphql/userprofile'

class ProfilePage extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: '',
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };

  constructor(props) {
    super(props);

    Ionicons.getImageSource('ios-arrow-round-back', 35, DARK_GRAY_COLOR).then(icon => {
      props.navigator.setButtons({
        leftButtons: [{
          icon,
          id: 'backButton',
          disableIconTint: true
        }]
      })
    })

    this.state = {
      user: { ...props.userInfo },
      collections: [],
      stories: [],
      campaigns: []
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigateEvent.bind(this))
  }

  componentWillMount() {
    this.getProfile();
  }

  onNavigateEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop({})
      }
    }
  }

  getProfile() {
    client.query({
      query: GET_ONEMAPPER_PROFILE,
      variables: {
        userId: this.state.user.id
      }
    }).then(({ data: { User } }) => {
      let user = this.state.user;
      user.bio = User.bio;
      user.followers = User._followersMeta.count;
      user.checked = User._checkInsMeta.count;
      user.accountVerification = User.accountVerification;
      this.setState({ user, collections: User.collections.filter(item => !item.privacy), stories: User.stories });
    }).catch(err => alert(err))
  }

  onFollow(willFollow) {
    let followsIds = clone(this.props.follows.map(item => item.id));
    if (willFollow) {
      followsIds.push(this.state.user.id);
    } else {
      const index = followsIds.indexOf(this.state.user.id);
      followsIds.splice(index, 1);
    }

    this.props.followUser({
      variables: {
        id: this.props.user.id,
        followsIds
      }
    }).then(({ data }) => {
      this.props.saveUserFollows(data.updateUser.follows);
    }).catch(err => alert(err));
  }

  onCampaignPress(id) {
    alert(id)
  }

  onViewCollectionItem = (item) => {
    this.props.navigator.push({
      screen: SCREEN.COLLECTIONS_PAGE,
      animated: true,
      passProps: {
        type: item,
        userId: this.state.user.id
      }
    })
  }
  onViewCollectionsAll = () => {
    this.props.navigator.push({
      screen: SCREEN.FEED_ALL_COLLECTION,
      title: I18n.t('COLLECTION_TITLE'),
      animated: true,
      passProps: {
        collections: this.state.collections,
        data: {
          allStories: this.state.stories
        },
        userId: this.state.user.id
      }
    })
  }
  onViewStories = () => {
    this.props.navigator.push({
      screen: SCREEN.COLLECTIONS_PAGE,
      animated: true,
      passProps: {
        places: this.state.stories.map(item => item.place)
      }
    })
  }

  onStoryItem(place) {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: 'OneMapper Stories',
      passProps: { place },
    });
  }


  render() {
    const { user, collections, stories, campaigns } = this.state;
    const followed = this.props.follows && this.props.follows.map(item => item.id).includes(user.id);

    return (
      <ScrollView style={styles.container}>
        {/* user information */}
        <View style={styles.userInformationContainer}>
          <View style={styles.userInformation}>
            <View style={{ flexDirection: 'row' }}>
              <CircleImage uri={user.photoURL} style={styles.userImage} radius={getDeviceWidth(171)} />
              {user.accountVerification === 'YES' && <Image source={require('@assets/images/profileCircle.png')} style={styles.checkImage} />}
            </View>
            <View style={styles.userInfo}>
              <View>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.userName}>{user.displayName}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.userId}>{user.username}</Text>
              </View>
              <TouchableOpacity onPress={() => this.onFollow(!followed)}>
                <View style={styles.FollowingButton}>
                  <Text style={[DFonts.Regular, styles.FollowingText]}>{followed ? I18n.t('UNFOLLOW') : I18n.t('FEED_FOLLOW')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.propertyContainer}>
            <View style={styles.propertyView}>
              <Text style={[DFonts.Regular, styles.pText]}>{I18n.t('FEED_FOLLOWER_PROFILE_FOLLOWED')}</Text>
              {followed && <Entypo name="user" size={17} color={BLUE_COLOR} />}
            </View>
            <View style={styles.propertyView}>
              <Text style={[DFonts.Regular, styles.pText,{marginTop:Platform.OS=='android'?0:getDeviceHeight(30)}]}>
                {I18n.t('FEED_FOLLOWER_PROFILE_FOLLOWERS')}
              </Text>
              <Text style={[DFonts.Regular, styles.p_val_Text]}>{calculateCount(user.followers)}</Text>
            </View>
            <View style={styles.propertyView}>
              <Text style={[DFonts.Regular, styles.pText,{marginTop:Platform.OS=='android'?0:getDeviceHeight(30)}]}>
                {I18n.t('FEED_FOLLOWER_PROFILE_VISITED')}
              </Text>
              <Text style={[DFonts.Regular, styles.p_val_Text]}>{calculateCount(user.checked)}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={[DFonts.Regular, styles.about]}>{user.bio}</Text>
        </View>
        {/* Campaign list */}
        {campaigns.length > 0 &&
          <View>
            <Text style={[DFonts.Title, styles.collectionText]}>{I18n.t('PROFILE_CAMPAIGN')}</Text>
          </View>}
        {campaigns.length > 0 &&
          <View style={styles.collectionContainer}>
            <CampaignList data={campaigns} onViewMore={this.onCampaignPress.bind(this)} />
          </View>}
        {/* Collection list */}
        <View>
          <Text style={[DFonts.Title, styles.collectionText]}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
        </View>
        <View style={styles.collectionContainer}>
          <Collections
            collections={collections}
            onViewItem={this.onViewCollectionItem}
            onViewAll={this.onViewCollectionsAll}
            onViewStories={this.onViewStories}
          />
        </View>
        {/* Story board */}
        <View style={{ marginBottom: 15 }}>
          <Text style={[DFonts.Title, styles.StoryText]}>{I18n.t('PROFILE_STORY_TITLE')}</Text>
          <StoryBoard
            style={styles.StoryContainer}
            data={stories}
            onPressItem={this.onStoryItem.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }
}



//make this component available to the app
export default ProfilePage;
