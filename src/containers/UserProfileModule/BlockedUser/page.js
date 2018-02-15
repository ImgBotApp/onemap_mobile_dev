//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox'
import { graphql } from "react-apollo";

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import CircleImage from '@components/CircleImage'

import styles from './style'
import I18n from '@language'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { TABBAR_HEIGHT } from '@global/const';
import { DARK_GRAY_COLOR } from '../../../theme/colors';
import { clone } from '@global'
import { GET_BLOCKUSRS,UNBLOCK_USER } from "@graphql/userprofile";
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as SCREEN from '@global/screenName'
import { client } from '@root/main'

const BLOCKUSERS_PER_PAGE = 20;

// create a component
class BlockedUser extends Component {
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
      modalVisible: false,
      selectedItem:null,
      blockedUsers:[]
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop()
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
  onUnBlockUser(){
    if(!this.state.selectedItem)
      return;
    
    this.props.unBlockUser({
      variables: {
        blockUserId: this.props.user.id,
        mainUserId:this.state.selectedItem.id
      }
    }).then(({ data }) => {
      let blocks = clone(this.state.blockedUsers);
      let index = blocks.indexOf(this.state.selectedItem);
      blocks.splice(index, 1);
      this.setState({ blockedUsers:blocks });
      client.resetStore();
    }).catch(err => alert(err));
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && (nextProps.data.User.blockUsers != this.state.blockedUsers)) {
      this.setState({ blockedUsers:nextProps.data.User.blockUsers });
    }
  }
  _keyExtractor = (item, index) => item.id;
  render() {

    return (
      <View style={styles.container}>
        <View style={{ height: '100%' }}>
          <SwipeListView
            keyExtractor={this._keyExtractor}
            useFlatList
            style={styles.userList}
            data={this.state.blockedUsers}
            renderItem={(data, rowMap) => (
              <TouchableOpacity style={styles.userRow} onPress={() => this.onPressUserProfile(data.item)}>
                <View style={styles.mainItem}>
                  <View style={{ flexDirection: 'row' }}>
                    <CircleImage style={styles.itemImage} uri={data.item.photoURL} radius={getDeviceWidth(88)} />
                    <View style={styles.itemInfo}>
                      <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.username}>{data.item.displayName}</Text>
                      <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.bio}>{data.item.bio}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View>
                <Text>Left</Text>
                <View style={styles.rightHidden}>
                  <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }} onPress={() => {
                    this.setState({
                      modalVisible: true,
                      selectedItem:data.item
                    })
                  }}>
                    <Text style={styles.rightHiddenText}>{I18n.t('UNBLOCK')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            leftOpenValue={70}
            disableRightSwipe={true}
            rightOpenValue={-75}
            onRowOpen={(data, secId, rowId) => {
            }}
            closeOnRowPress = {true}
            closeOnScroll = {true}
            closeOnRowBeginSwipe = {true}
            previewFirstRow={false}
          />
        </View>
        { this._renderBlockedUserModal() }
      </View>
    );
  }
  
  _renderBlockedUserModal() {
    return (
      <Modal style={styles.modalContainer} backdrop={true} position={'center'}
        isOpen={this.state.modalVisible}
        onClosed={() => this.setState({ modalVisible: false })}
      >
        <View style={styles.descriptionContainer}>
          <Text style={styles.modalTitle}>{I18n.t('UNBLOCK')}</Text>
          <Text style={styles.modalDescription}>{I18n.t('SETTING_UNBLOCKED_USER_DESCRIPTION')}</Text>
        </View>
        <View style={styles.FollowerBottom}>

          <View style={[styles.modalButton, { borderRightWidth: 1 }]}>
            <TouchableOpacity onPress={() => {
                this.setState({ modalVisible: false });
              }}>
              <Text style={styles.cancelStr}>{I18n.t('CANCEL_STR')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButton}>
            <TouchableOpacity onPress={() => {
                this.setState({ modalVisible: false });
                this.onUnBlockUser();
              }}>
              <Text style={styles.unblockStr}>{I18n.t('UNBLOCK')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

let container = graphql(UNBLOCK_USER, { name: 'unBlockUser' })(BlockedUser);
const ComponentWithQueries = graphql(GET_BLOCKUSRS, {
  options: (props) => ({
    variables: {
      userId: props.user.id,
      skip: 0,
      first: BLOCKUSERS_PER_PAGE
    },
  }),
})
  (container);
//make this component available to the app
export default ComponentWithQueries;
