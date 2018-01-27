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
      selectedIndex: 0
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

  onPressUserProfile(index) {
    this.props.navigator.push({
      screen: SCREEN.USERS_PROFILE_PAGE,
      title: I18n.t('PROFILE_PAGE_TITLE'),
      animated: true,
      passProps: {
        userInfo: this.props.follows[index]
      }
    })
  }
  onFollowingPressed(index) {
    this.setState({
      isFollowingDialog: true,
      selectedIndex: index
    })
  }
  onUnfollow() {
    let followsIds = clone(this.props.follows.map(item => item.id));
    followsIds.splice(this.state.selectedIndex, 1);

    this.props.unfollowUser({
      variables: {
        id: this.props.user.id,
        followsIds
      }
    }).then(({ data }) => {
      this.props.saveUserFollows(data.updateUser.follows);
    }).catch(err => alert(err));
  }

  onFollowerBlock = (userData) => {
    this.setState({
      isFollowerDialog: true
    })
  }

  renderFollowItem = ({ item, index }) => {
    return (
      <FollowingItem
        data={item}
        onPress={() => this.onPressUserProfile(index)}
        onFollow={() => this.onFollowingPressed(index)}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ position: 'relative' }}>
          <Tabs selected={this.state.page} style={{ backgroundColor: 'white', position: 'relative' }}
            selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })} >
            <Text name="followers"> Followers </Text>
            <Text name="following"> Following </Text>
          </Tabs>
        </View>
        <View style={{ height: '100%' }}>
          {/* <Search /> */}
          {
            this.state.page == 'followers' ?
              <FollowerList
                onPress={this.onPressUserProfile.bind(this)}
                onItemPress={this.onFollowerBlock.bind(this)}
                userid={this.props.user.id}
              /> :
              <FlatList
                keyExtractor={(item, index) => index}
                data={this.props.follows}
                renderItem={this.renderFollowItem}
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
          <Text style={styles.BlockTitle}>{'Block: test'}</Text>
          <Text style={styles.BlockDescription}>{I18n.t('SETTING_BLOCKED_USER_DESCRIPTION')}</Text>
        </View>
        <View style={styles.FollowerBottom}>

          <View style={[styles.modalButton, { borderRightWidth: 1 }]}>
            <TouchableOpacity>
              <Text style={styles.cancelStr}>{I18n.t('CANCEL_STR')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButton}>
            <TouchableOpacity>
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
        onClosed={() => this.setState({ isFollowingDialog: false })} >
        <View style={styles.FollowerdescriptionContainer}>
          <Text style={styles.BlockTitle}>{'Unfollow'}</Text>
          <Text style={styles.BlockDescription}>{I18n.t('SETTING_UNFOLLOW_USER_DESCRIPTION')}</Text>
        </View>
        <View style={styles.FollowerBottom}>
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
