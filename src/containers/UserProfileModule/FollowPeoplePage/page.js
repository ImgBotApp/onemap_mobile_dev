//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modalbox'
import Search from 'react-native-search-box'
import Tabs from 'react-native-tabs'
import FollowerList from '@components/FollowersList'
import FollowingItem from '@components/FollowingItem'
import { clone } from '@global'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
import { DARK_GRAY_COLOR } from '@theme/colors';
import styles from './styles'
import { SwipeListView } from 'react-native-swipe-list-view'
import DFonts from '@theme/fonts';
import { TABBAR_HEIGHT } from '@global/const';
import { client } from '@root/main'

// create a component
class FollowerPeople extends Component {
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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

    this.state = {
      page: 'followers',
      isFollowerDialog: false,
      isFollowingDialog: false,
      selectedIndex: 0,
      selectedUser:null,
      followerUsers:[]
    }
  }
  onNavigatorEvent = (event) => {
    if (event.type = 'BavBarButtonPress') {
      switch (event.id) {
        case 'backButton':
          this.props.navigator.pop({})
          return;
      }
    }
  }

  onPressUserProfile(user) {
    if(this.props.user.blockByUsers.length > 0)
    {
      let ids = this.props.user.blockByUsers.map(item => item.id);
      let index = ids.indexOf(user.id);
      if(index >=0 )
      {
        alert(I18n.t('UNREACHABLE_STR'));
        return;
      }
    }
    this.props.navigator.push({
      screen: SCREEN.USERS_PROFILE_PAGE,
      title: I18n.t('PROFILE_PAGE_TITLE'),
      animated: true,
      passProps: {
        userInfo: user
      }
    })
  }
  onFollowingPressed(item) {
    this.setState({
      isFollowingDialog: true,
      selectedUser: item
    })
  }
  onUnfollow() {
    if(!this.state.selectedUser)
      return;
    
    let followsIds = clone(this.props.follows.map(item => item.id));
    let index = followsIds.indexOf(this.state.selectedUser.id);
    
    followsIds.splice(index, 1);

    this.props.unfollowUser({
      variables: {
        id: this.props.user.id,
        followsIds
      }
    }).then(({ data }) => {
      this.props.saveUserFollows(data.updateUser.follows);
      this.forceUpdate();
      client.resetStore();
    }).catch(err => alert(err));
  }

  onFollowerBlock = (userData) => {
    this.setState({
      isFollowerDialog: true,
      selectedUser:userData
    })
  }

  onBlockUser(){
    if(!this.state.selectedUser)
      return;
    
    this.props.addBlockUser({
      variables: {
        mainUserId: this.props.user.id,
        blockUserId:this.state.selectedUser.id
      }
    }).then(({ data }) => {
      let followers = clone(this.state.followerUsers);
      let index = followers.indexOf(this.state.selectedUser);
      followers.splice(index, 1);
      this.setState({ followerUsers:followers });
      client.resetStore();
    }).catch(err => alert(err));
  }

  renderFollowItem = ({ item, index }) => {
    return (
      <FollowingItem
        data={item}
        onPress={() => this.onPressUserProfile(item)}
        onFollow={() => this.onFollowingPressed(index)}
      />
    )
  }
  componentWillReceiveProps(nextProps) {
    let followers = [];
    if (!nextProps.data.loading && (nextProps.data.User.followers != this.state.followerUsers)) {
      this.setState({ followerUsers:nextProps.data.User.followers });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ position: 'relative' }}>
          <Tabs selected={this.state.page} style={{ backgroundColor: 'white', position: 'relative' }}
            selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })} >
            <Text name="followers"> Followers </Text>
            <Text name="following"> Followings </Text>
          </Tabs>
        </View>
        <View style={{ height: '100%',paddingBottom:TABBAR_HEIGHT-8 }}>
          {/* <Search /> */}
          {
            this.state.page == 'followers' ?
              <FollowerList
                onPress={this.onPressUserProfile.bind(this)}
                onItemPress={this.onFollowerBlock.bind(this)}
                user={this.props.user}
                followerUsers={ this.state.followerUsers }
              /> :
              <SwipeListView
                keyExtractor={(item, index) => item.id}
                useFlatList
                data={this.props.follows}
                renderItem={this.renderFollowItem}
                renderHiddenItem={({ item,index }) => (
                  <View>
                    <Text>Left</Text>
                    <View style={styles.rightHidden}>
                      <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }} onPress={() => {
                        this.onFollowingPressed(item)
                      }}>
                        <Text style={[DFonts.Title, styles.rightHiddenText]}>{I18n.t('UNFOLLOW')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                leftOpenValue={70}
                disableRightSwipe={true}
                rightOpenValue={-77}
                onRowOpen={(rowKey, rowMap) => {
                  //rowMap[rowKey].closeRow();
                }}
                onRowClose={(rowKey, rowMap) => {
                  
                }}
                closeOnRowPress = {true}
                closeOnScroll = {true}
                closeOnRowBeginSwipe = {true}
                previewFirstRow={false}
              />
          }
        </View>
        {this._renderFollowerModal()}
        {this._renderFollowingModal()}
      </View>
    );
  }
  _renderFollowerModal() {
    return (
      <Modal style={styles.modalContainer} backdrop={true} position={'center'}
        isOpen={this.state.isFollowerDialog}
        onClosed={() => this.setState({ isFollowerDialog: false })}
      >
        <View style={styles.FollowerdescriptionContainer}>
          <Text style={styles.BlockTitle}>{I18n.t('BLOCKED_STR')}</Text>
          <Text style={styles.BlockDescription}>{I18n.t('SETTING_BLOCKED_USER_DESCRIPTION')}</Text>
        </View>
        <View style={styles.FollowerBottom}>

          <View style={[styles.modalButton, { borderRightWidth: 1 }]}>
            <TouchableOpacity onPress={() => {
                this.setState({ isFollowerDialog: false });
              }}>
              <Text style={styles.cancelStr}>{I18n.t('CANCEL_STR')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButton}>
            <TouchableOpacity onPress={() => {
                this.setState({ isFollowerDialog: false });
                this.onBlockUser();
              }}>
              <Text style={styles.blockStr}>{I18n.t('BLOCKED_STR')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  _renderFollowingModal() {
    return (
      <Modal style={styles.modalContainer} backdrop={true} position={'center'}
          isOpen={this.state.isFollowingDialog}
          onClosed={() => this.setState({ isFollowingDialog: false })}
        >
          <View style={styles.FollowerdescriptionContainer}>
            <Text style={styles.BlockTitle}>{I18n.t('UNFOLLOW')}</Text>
            <Text style={styles.BlockDescription}>{I18n.t('SETTING_UNFOLLOW_USER_DESCRIPTION')}</Text>
          </View>
          <View style={styles.FollowerBottom}>

            <View style={[styles.modalButton, { borderRightWidth: 1 }]}>
              <TouchableOpacity onPress={() => {
                  this.setState({ isFollowingDialog: false });
                }}>
                <Text style={styles.cancelStr}>{I18n.t('CANCEL_STR')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButton}>
              <TouchableOpacity onPress={() => {
                  this.setState({ isFollowingDialog: false });
                  this.onUnfollow();
                }}>
                <Text style={styles.blockStr}>{I18n.t('UNFOLLOW')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    )
  }
}

// define your styles


//make this component available to the app
export default FollowerPeople;
