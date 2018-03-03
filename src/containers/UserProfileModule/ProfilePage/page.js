//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles'

import { getDeviceHeight, getDeviceWidth } from '@global'
import CircleImage from '@components/CircleImage'
import Collections from '@components/Collections'
import StoryBoard from '@components/StoryBoard'
import CardView from 'react-native-cardview'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
import { DARK_GRAY_COLOR } from '@theme/colors';
import FONTSTYLE, { SMALL_FONT_SIZE, APPFONTNAME } from '@theme/fonts';

import { client } from '@root/main'
import { GET_FOLLOWS } from '@graphql/userprofile';
// related with  Camapagin Module
import campaignStyles from './campaingStyle'
import { fetchThumbFromCloudinary } from '@global/cloudinary'
import { getUserRewardCampaignBadge } from '@graphql/campaign'
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
      campaigns: [],
      totalPoints: 0
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  componentWillMount() {
    getUserRewardCampaignBadge(this.props.user.id)
      .then(res => {
        this.setState({
          campaigns: res
        }, () => {
          this.getMyTotalPoints()
        })
      })
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
        userId: this.props.user.id
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
            navBarTextFontFamily: APPFONTNAME.Bold,
            navBarTextColor: DARK_GRAY_COLOR,
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
        navBarTextFontFamily: APPFONTNAME.Bold,
        navBarTextColor: DARK_GRAY_COLOR,
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

  getMyTotalPoints() {
    let totalPoints = this.state.campaigns.reduce(function (current, item) {
      let result = current
      for (let i = 0; i < item.cities.length; i++) {
        let city = item.cities[i]
        for (let j = 0; j < city.badges.length; j++) {
          let badge = city.badges[j]
          result = result + badge.point
        }
      }
      return result
    }, 0)
    this.setState({
      totalPoints: totalPoints
    })
  }

  getMostBadge(campaign) {
    let cities = campaign.cities
    let points = 0
    let result = cities.reduce(function (current, item) {
      let result = [...current]
      if (current.length > 1) {
        for (let j = 0; j < item.badges.length; j++) {
          points = points + item.badges[j].point
        }
        return result
      }
      for (let i = 0; i < item.badges.length; i++) {
        points = points + item.badges[i].point
        if (current.indexOf(item.badges[i]) == -1) {
          result.push(item.badges[i])
        }
      }
      return result
    }, [])
    return { result, points }
  }

  renderCampaignItem(campaign) {
    let mostBadges = this.getMostBadge(campaign);
    let points = mostBadges.points;

    let totalBadgePoints = 0;
    this.props.user.receivedBadge.forEach(item => {
      totalBadgePoints += item.point;
    });

    return (
      <CardView cardElevation={1} cardMaxElevation={1} cornerRadius={5} style={campaignStyles.campaignItemCotainer}>
        <View style={campaignStyles.PointContainer}>
          <Text style={[FONTSTYLE.Header, campaignStyles.pointText]}>{I18n.t('POINTS_STR')}</Text>
          <Text style={[FONTSTYLE.MostBig, campaignStyles.pointText]}>{' ' + totalBadgePoints + ' '}</Text>
        </View>
        <View style={campaignStyles.badgeContainer}>
          {
            mostBadges.result.map((badge, index) => {
              return <Image key={index} source={{ uri: fetchThumbFromCloudinary(badge.iconUrl) }} style={campaignStyles.badgeStyle} />
            })
          }
          <TouchableOpacity onPress={() => this.onNavigateUserBadgeList(campaign)}>
            <Image source={require('@assets/images/badge/viewMore.png')} style={[campaignStyles.badgeStyle, { marginRight: 5 }]} />
          </TouchableOpacity>
        </View>
      </CardView>
    )
  }

  onNavigateUserBadgeList = (campaign) => {
    this.props.navigator.push({
      screen: SCREEN.CAMPAIGN_USER_BADGE_LIST_PAGE,
      animated: true,
      title: campaign.title,
      navigatorStyle: {

      },
      passProps: {
        id: campaign.id,
        title: campaign.title
      }
    })
  }

  renderCampagin() {
    return (
      <View style={styles.vCollections}>
        <Text style={styles.collectionTitle}>{I18n.t('PROFILE_CAMPAIGN')}</Text>
        {this.state.campaigns.length > 0 && this.renderCampaignItem(this.state.campaigns[0])}
      </View>
    )
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

    let totalBadgePoints = 0, totalPlacePoints = 0;
    this.props.user.receivedBadge.forEach(item => {
      totalBadgePoints += item.point;
    });
    this.props.user.checkIns.forEach(item => {
      totalPlacePoints += item.point;
    });

    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoView}>
          <View style={{ flexDirection: 'row' }}>
            <CircleImage style={styles.profileImage} uri={this.state.photoURL} radius={getDeviceWidth(171)} />
            {this.state.accountVerification &&
              <Image source={require('@assets/images/profileCircle.png')} style={styles.checkImage} />
            }
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.nameView}>
              <View>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.bigName}>{this.state.displayName}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.userId}>
                  {this.state.username}
                </Text>
                {/* User Points */}
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text style={[FONTSTYLE.Regular, styles.points]}>
                    {' ' + (totalBadgePoints + totalPlacePoints) + ' '}
                  </Text>
                  <Text style={[FONTSTYLE.Regular, { color: DARK_GRAY_COLOR }]}>
                    {' ' + I18n.t('POINTS_STR')}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={this.onEditProfile.bind(this)}>
                <View style={styles.editProfileContainer}>
                  <Text style={styles.editProfile}>{I18n.t('SETTING_EDIT_PROFILE')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.spec, { height: getDeviceWidth(342) }]}>
              <TouchableOpacity style={styles.spec} onPress={this.onFollowSetting}>
                <Text style={styles.specFont}>{I18n.t('PROFILE_FOLLOWING')}</Text>
                <Text style={styles.spec_val_Font}>{follow_cnt}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.spec} onPress={this.onFollowSetting}>
                <Text style={styles.specFont}>
                  {I18n.t('PROFILE_FOLLOWER')}
                </Text>
                <Text style={styles.spec_val_Font}>{follower_cnt}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.spec}>
                <Text style={styles.specFont}>
                  {I18n.t('PROFILE_VISITED')}
                </Text>
                <Text style={styles.spec_val_Font}>{checked_cnt}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bioText}>
          <Text style={styles.bio} numberOfLines={2} ellipsizeMode={'tail'}>{this.state.bio}</Text>
        </View>
        {/* Campaign Part */}
        {this.state.campaigns.length > 0 && this.renderCampagin()}
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
              <StoryBoard style={styles.StoryContainer} data={allStories}
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
  onStoryItem = story => {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: 'My Stories',
      passProps: {
        place: story.place
      },
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
