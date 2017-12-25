//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import AutoHeightImage from 'react-native-auto-height-image';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import CampaignList from '@components/CampaignList'

import CircleImage from '@components/CircleImage'
import TitleImage from '@components/TitledImage'
import styles from './styles'
import I18n  from '@language'
import { getDeviceWidth, getDeviceHeight, calculateCount } from '@global'
import DFonts from '@theme/fonts'
import { BLUE_COLOR } from '../../../theme/colors';
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
  stories: [
    {
      items: [
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      ]
    },
    {
      items: [
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      ]
    },
    {
      items: [
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      ]
    }
  ]
}
// create a component
class ProfilePage extends Component {
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
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* user information */}
        <View style={styles.userInformationContainer}>
          <View style={styles.userInformation}>
            <CircleImage uri={data.user.photoURL} style={styles.userImage} radius={getDeviceWidth(177)}/>
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
        <View>
          <Text style={styles.collectionText}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
        </View>
        <View style={styles.collectionContainer}>
          <TouchableOpacity>
            <TitleImage style={styles.collection} uri={data.collections[0].uri} radius={8} title={'Hearted'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <TitleImage style={styles.collection} uri={data.collections[0].uri} radius={8} title={'Check-ins'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <TitleImage style={styles.collection} uri={data.collections[0].uri} radius={8} title={'Wish list'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <TitleImage style={styles.collection} uri={data.collections[0].uri} radius={8} title={'+\nView all\nCollections'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.StoryText}>{I18n.t('PROFILE_STORY_TITLE')}</Text>
        </View>
        <View style={styles.StoryContainer}>
          <View style={styles.StoryList}>
            <FlatList 
              data={data.stories[0].items}
              renderItem={({item}) => { return this._renderStoryItem(item)} }
            />
          </View>
          <View style={styles.StoryList}>
            <FlatList 
              data={data.stories[1].items}
              renderItem={({item}) => { return this._renderStoryItem(item)} }
            />
          </View>
          <View style={styles.StoryList}>
            <FlatList 
              data={data.stories[2].items}
              renderItem={({item}) => { return this._renderStoryItem(item)} }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}



//make this component available to the app
export default ProfilePage;
