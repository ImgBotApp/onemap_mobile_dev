//import liraries
//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'

import {getDeviceWidth, getDeviceHeight} from '@global'
import CircleImage from '@components/CircleImage'
import TitleImage from '@components/TitledImage'
import AutoHeightImage from 'react-native-auto-height-image';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
// import TitleImage from 'titledimage'
import I18n from '@language'

const testImage = 'https://s17.postimg.org/nnar4n263/images3.jpg'
const testImage1 = 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'

const collections = [
  {uri : 'https://placeimg.com/640/480/any'},
  {uri : 'https://placeimg.com/640/480/any'},
  {uri : 'https://placeimg.com/640/480/any'},        
  {uri : 'https://placeimg.com/640/480/any'},        
]

const stories= [
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
var $this
// create a component
class Profile extends Component {
  constructor (props) {
    super(props)
    $this = this
  }
  componentWillUpdate () {
    $this = this
  }
  onEditProfile () {
    this.props.navigation.navigate('AccountSetting')
  }
  onViewAllCollections = () => {
    this.props.navigation.navigate('UserCollection')
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
        <View style={styles.infoView}>
          <CircleImage style={styles.profileImage} uri={testImage} radius={getDeviceWidth(171)}/>
          <Text style={styles.checkIcon}>
            <Ionicons name="ios-checkmark-circle" size={30} />
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.nameView}>
              <View>
                <Text style={styles.bigName}>{'Minna Hamilton'}</Text>
                <Text style={styles.userId}>@userid</Text>
              </View>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={this.onEditProfile.bind(this)}>
                <View style={styles.editProfileContainer}>
                  <Text style={styles.editProfile}>{I18n.t('SETTING_EDIT_PROFILE')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.spec}>
              <Text style={styles.specFont}>{I18n.t('PROFILE_FOLLOWING')}</Text>
              <Text style={styles.specFont}>290</Text>
              <Text style={styles.specFont}>{I18n.t('PROFILE_FOLLOWER')}</Text>
              <Text style={styles.specFont}>54.2 K</Text>
              <Text style={styles.specFont}>{I18n.t('PROFILE_VISITED')}</Text>
              <Text style={styles.specFont}>636</Text>
            </View>
          </View>
        </View>
        <View style={styles.bioText}>
          <Text style={styles.bio} numberOfLines={2} ellipsizeMode={'tail'}>The girl never sleeps Please keep quite and follow me</Text>
        </View>
        <View style={styles.vCollections}>
          <Text style={styles.collectionTitle}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
          <View style={styles.collectionItems}>
            <TitleImage style={styles.collection} uri={collections[0].uri} radius={8}  title={'abc'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={collections[1].uri} radius={8}  title={'abc'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={collections[2].uri} radius={8}  title={'abc'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TouchableOpacity onPress={this.onViewAllCollections.bind(this)}>
              <TitleImage style={styles.collection} uri={collections[3].uri} radius={8}  title={'+\nView all\nCollections'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.vStories}>
          <Text style={styles.storyTitle}>{I18n.t('PROFILE_STORY_TITLE')}</Text>
          <View style={styles.Stories}>
            <View style={styles.subStory}>
              <FlatList 
                data={stories[0].items}
                renderItem={({item}) => { return this._renderStoryItem(item)} }
              />          
            </View>
            
            <View style={styles.subStory}>
              <FlatList 
                data={stories[1].items}
                renderItem={({item}) => { return this._renderStoryItem(item)} }
              />  
            </View>
            <View style={styles.subStory}>
              <FlatList 
                data={stories[2].items}
                renderItem={({item}) => { return this._renderStoryItem(item)} }
              />  
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  _openDrawerMenu () {
    $this.props.navigation.navigate('DrawerOpen')
  }
}


//make this component available to the app
export default Profile;
