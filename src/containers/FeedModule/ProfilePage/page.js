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
import I18n  from '@language'
import { getDeviceWidth, getDeviceHeight, calculateCount } from '@global'
import DFonts from '@theme/fonts'
import { BLUE_COLOR, DARK_GRAY_COLOR } from '../../../theme/colors';
const data = {
  user: {
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'AlexandraStorms',
    id: 'alexan.storms',
    followers: 24200,
    visited:  212,
    about: 'if you enjoy my travels, follow me, Let\'s explorer together.'
  },
  collections: [
    {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},        
  ],
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
  storyCollecton: [
    {
      id: 'a1',
      title: 'a1',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a2',
      title: 'a2',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a3',
      title: 'a3',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a4',
      title: 'a4',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a5',
      title: 'a5',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a6',
      title: 'a6',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a7',
      title: 'a7',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a8',
      title: 'a8',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
    {
      id: 'a9',
      title: 'a9',
      uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
    },
  ]
}
// create a component
class ProfilePage extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigateEvent.bind(this))
  }
  onNavigateEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop({})
      }
    }
  }
  onCampaignPress(id) {
    alert(id)
  }
  _renderStoryItem (item) {
    return (
      <View>
        <AutoHeightTitledImage uri={item.uri}
          width={getDeviceWidth(343)}
          title={'abc'} vAlign={'center'} hAlign={'left'} titleStyle={styles.storyItemTitle}
          style={{marginBottom: 10}}
        />
      </View>
    )
  }

  onHearted =() => {
    alert('Hearted')
  }

  onCheckIns =() => {
    alert('Check-ins')
  }

  onWishList =() => {
    alert('Wish list')
  }

  onViewAll =() => {
    alert('View All')
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* user information */}
        <View style={styles.userInformationContainer}>
          <View style={styles.userInformation}>
            <View style={{flexDirection: 'row'}}>
              <CircleImage uri={data.user.photoURL} style={styles.userImage} radius={getDeviceWidth(177)}/>
              <Image source={require('@assets/images/profileCircle.png')} style={styles.checkImage}/>
            </View>
            <View style={styles.userInfo}>
              <View>
                <Text style={styles.userName}>{data.user.name}</Text>
                <Text style={styles.userId}>{'@'}{data.user.id}</Text>
              </View>
              <TouchableOpacity>
                <View style={styles.FollowingButton}>
                  <Text style={styles.FollowingText}>{I18n.t('PROFILE_FOLLOWING')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.propertyContainer}>
            <View style={styles.propertyView}>
              <Text style={styles.pText}>{I18n.t('FEED_FOLLOWER_PROFILE_FOLLOWED')}</Text>
              <Entypo name="user" size={12} color={BLUE_COLOR} />
            </View>
            <View style={styles.propertyView}>
              <Text style={styles.pText}>{I18n.t('FEED_FOLLOWER_PROFILE_FOLLOWERS')}</Text>
              <Text style={styles.pText}>{calculateCount(data.user.followers)}</Text>
            </View>
            <View style={styles.propertyView}>
              <Text style={styles.pText}>{I18n.t('FEED_FOLLOWER_PROFILE_VISITED')}</Text>
              <Text style={styles.pText}>{calculateCount(data.user.visited)}</Text>              
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.about}>{data.user.about}</Text>
        </View>
        {/* Campaign list */}
        <View>
          <Text style={styles.collectionText}>{I18n.t('PROFILE_CAMPAIGN')}</Text>          
        </View>
        <View style={styles.collectionContainer}>
          <CampaignList data={data.campaign} onViewMore={this.onCampaignPress.bind(this)}/>
        </View>
        {/* Collection list */}
        <View>
          <Text style={styles.collectionText}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
        </View>
        <View style={styles.collectionContainer}>
          <Collections 
            onHearted={this.onHearted.bind(this)}
            onCheckIns={this.onCheckIns.bind(this)}
            onWishList={this.onWishList.bind(this)}
            onViewAll={this.onViewAll.bind(this)}
           />
        </View>
        {/* Story board */}
        <View>
          <Text style={styles.StoryText}>{I18n.t('PROFILE_STORY_TITLE')}</Text>
        </View>
        <StoryBoard style={styles.StoryContainer} subContainer={styles.StoryList} data={data.storyCollecton} width={343} 
          onPressItem={this.onStoryItem.bind(this)}
        />
      </ScrollView>
    );
  }
  onStoryItem(id) {
    alert(id)
  }
}



//make this component available to the app
export default ProfilePage;
