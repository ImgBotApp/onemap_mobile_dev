//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
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
import { getDeviceWidth, getDeviceHeight, calculateCount } from '@global'
import * as SCREEN from '@global/screenName'
import { BLUE_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts'

import { client } from '@root/main'
import { GET_ONEMAPPER_PROFILE } from '@graphql/userprofile'

const data = {
  campaign: [
    {
      id: 'a1',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      name: 'Fun Campaign',
      description: 'this is campaign description, Fun places and stories ... let\'s connect with this ',
      points: 234,
      badges: [
        {
          id: 'b1',
          uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
          name: 'fun'
        },
        {
          id: 'b1',
          uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
          name: 'fun'
        },
        {
          id: 'b1',
          uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
          name: 'fun'
        },
        {
          id: 'b1',
          uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
          name: 'fun'
        }
      ]
    },
    {
      id: 'a2',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      name: 'Fun Campaign',
      description: 'this is campaign description, Fun places and stories ... let\'s connect with this ',
      points: 123,
      badges: [
        {
          id: 'b1',
          uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
          name: 'fun'
        },
        {
          id: 'b1',
          uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
          name: 'fun'
        }
      ]
    }
  ],
}

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
    super(props)

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
      stories: []
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
    }).then(({ data }) => {
      let user = this.state.user;
      user.bio = data.User.bio;
      user.followers = data.User._followersMeta.count;
      this.setState({ user, collections: data.User.collections, stories: data.User.stories });
    }).catch(err => alert(err))
  }

  onCampaignPress(id) {
    alert(id)
  }
  onHearted = () => {
    // alert('Hearted')
  }

  onCheckIns = () => {
    // alert('Check-ins')
  }

  onWishList = () => {
    // alert('Wish list')
  }

  onViewAll = () => {
    this.props.navigator.push({
      screen: SCREEN.FEED_ALL_COLLECTION,
      title: I18n.t('COLLECTION_TITLE'),
      animated: true,
      passProps: {
        collections: this.state.collections
      }
    })
  }
  onStoryItem(id) {
    // this.props.navigator.push({
    //   screen: SCREEN.STORY_LIST_PAGE,
    //   passProps: {
    //     id
    //   }
    // })
  }


  _renderStoryItem(item) {
    return (
      <View>
        <AutoHeightTitledImage uri={item.uri}
          width={getDeviceWidth(343)}
          title={'abc'} vAlign={'center'} hAlign={'left'} titleStyle={styles.storyItemTitle}
          style={{ marginBottom: 10 }}
        />
      </View>
    )
  }

  render() {
    const { user, collections, stories } = this.state;
    const followed = this.props.follows.map(item => item.id).includes(user.id);

    return (
      <ScrollView style={styles.container}>
        {/* user information */}
        <View style={styles.userInformationContainer}>
          <View style={styles.userInformation}>
            <View style={{ flexDirection: 'row' }}>
              <CircleImage uri={user.uri} style={styles.userImage} radius={getDeviceWidth(177)} />
              <Image source={require('@assets/images/profileCircle.png')} style={styles.checkImage} />
            </View>
            <View style={styles.userInfo}>
              <View>
                <Text style={styles.userName}>{user.displayName}</Text>
                <Text style={styles.userId}>{user.name}</Text>
              </View>
              <TouchableOpacity>
                <View style={styles.FollowingButton}>
                  <Text style={styles.FollowingText}>{followed ? I18n.t('PROFILE_FOLLOWING') : I18n.t('FEED_FOLLOW')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.propertyContainer}>
            <View style={styles.propertyView}>
              <Text style={styles.pText}>{I18n.t('FEED_FOLLOWER_PROFILE_FOLLOWED')}</Text>
              {followed && <Entypo name="user" size={12} color={BLUE_COLOR} />}
            </View>
            <View style={styles.propertyView}>
              <Text style={styles.pText}>{I18n.t('FEED_FOLLOWER_PROFILE_FOLLOWERS')}</Text>
              <Text style={styles.pText}>{calculateCount(user.followers)}</Text>
            </View>
            <View style={styles.propertyView}>
              <Text style={styles.pText}>{I18n.t('FEED_FOLLOWER_PROFILE_VISITED')}</Text>
              <Text style={styles.pText}>{calculateCount(100)}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.about}>{user.bio}</Text>
        </View>
        {/* Campaign list */}
        <View>
          <Text style={styles.collectionText}>{I18n.t('PROFILE_CAMPAIGN')}</Text>
        </View>
        <View style={styles.collectionContainer}>
          <CampaignList data={data.campaign} onViewMore={this.onCampaignPress.bind(this)} />
        </View>
        {/* Collection list */}
        <View>
          <Text style={styles.collectionText}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
        </View>
        <View style={styles.collectionContainer}>
          <Collections
            collections={collections}
            onHearted={this.onHearted.bind(this)}
            onCheckIns={this.onCheckIns.bind(this)}
            onWishList={this.onWishList.bind(this)}
            onViewAll={this.onViewAll.bind(this)}
          />
        </View>
        {/* Story board */}
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.StoryText}>{I18n.t('PROFILE_STORY_TITLE')}</Text>
          <StoryBoard
            style={styles.StoryContainer}
            subContainer={styles.StoryList}
            data={stories}
            width={343}
            onPressItem={this.onStoryItem.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }
}



//make this component available to the app
export default ProfilePage;
