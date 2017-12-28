//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
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

const data = {
  id : 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
  facebookUserId: '@testUser',
  email: 'test@user.com',
  firstName: 'test',
  lastName: 'user',
  displayName: 'test User',
  bio: 'always with you',
  gender: 'male',
  city: 'Baku',
  country: 'Azerbaijian',
  photoURL: 'https://placeimg.com/640/480/people',
  registrationDate: new Date(),
  stories: [
    {
      id: 'a1',
      title: 'BAKUE',
      uri : 'https://picsum.photos/200/300'
    },
    {
      id: 'a2',
      title: 'PARIS',
      uri : 'https://picsum.photos/250/300'
    },
    {
      id: 'a3',
      title: 'BERLIN',
      uri : 'https://picsum.photos/300/300'
    },
    {
      id: 'a4',
      title: 'MOSCOW',
      uri : 'https://picsum.photos/350/300'
    },
    {
      id: 'a5',
      title: 'WARSAOW',
      uri : 'https://picsum.photos/400/300'
    },
    {
      id: 'a6',
      title: 'MADRID',
      uri : 'https://picsum.photos/150/300'
    },
    {
      id: 'a7',
      title: 'ROMA',
      uri : 'https://picsum.photos/200/300'
    },
    {
      id: 'a8',
      title: 'NEW YORK',
      uri : 'https://picsum.photos/250/300'
    },
    {
      id: 'a9',
      title: 'TOKYO',
      uri : 'https://picsum.photos/300/300'
    },
  ]
}
// create a component
class ProfileComponent extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('@assets/images/setting.png'),
        id: 'Setting',
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent =(event) => {
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
  componentWillUpdate () {
  }
  onEditProfile () {
    this.props.navigation.navigate('AccountSetting')
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoView}>
          <View style={{flexDirection:'row'}}>
            <CircleImage style={styles.profileImage} uri={data.photoURL} radius={getDeviceWidth(171)}/>
            <Image source={require('@assets/images/profileCircle.png')} style={styles.checkImage}/>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.nameView}>
              <View>
                <Text style={styles.bigName}>{data.firstName} {data.lastName}</Text>
                <Text style={styles.userId}>@{data.id}</Text>
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
          <Text style={styles.bio} numberOfLines={2} ellipsizeMode={'tail'}>{data.bio}</Text>
        </View>
        {/* Collection Part */}
        <View style={styles.vCollections}>
          <Text style={styles.collectionTitle}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
          <View style={styles.collectionItems}>
            <Collections 
              onHearted={this.onHearted.bind(this)}
              onCheckIns={this.onCheckIns.bind(this)}
              onWishList={this.onWishList.bind(this)}
              onViewAll={this.onViewAll.bind(this)}
              />
          </View>
        </View>
        
        <View style={styles.vStories}>
          <Text style={styles.storyTitle}>{I18n.t('PROFILE_STORY_TITLE')}</Text>
          <StoryBoard style={styles.StoryContainer} subContainer={styles.StoryList} data={data.stories} width={343}
            onPressItem={this.onStoryItem.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }
  componentWillMount () {
    // this.props.navigation.setParams({
    //   openDrawerMenu: this._openDrawerMenu
    // })
  }
  onHearted =() => {

  }
  onCheckIns=() => {

  }
  onWishList=() => {

  }
  onViewAll=() => {

  }
  onStoryItem=(id) => {

  }
  _openDrawerMenu () {
    $this.props.navigation.navigate('DrawerOpen')
  }
}




//make this component available to the app
export default ProfileComponent;
