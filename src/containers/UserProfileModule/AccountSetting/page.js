import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch, AsyncStorage, Alert } from 'react-native';
import { LoginManager } from 'react-native-fbsdk'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { APP_USER_KEY } from '@global/const'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
import { DARK_GRAY_COLOR } from '@theme/colors';
import styles from './styles'

class AccountSetting extends Component {

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
      privateAccount: false
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

  }
  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }
  componentDidMount() {

  }
  _onBack() {
  }

  onEditProfile() {
    this.props.navigator.push({
      screen: SCREEN.USER_PROFILE_EDIT,
      title: 'Edit Profile',
      animated: true,
      navigatorStyle: {
        navBarTextColor: DARK_GRAY_COLOR,
        navBarTextFontFamily: 'Comfortaa-Regular'
      }
    })
  }

  onBlockedUser() {
    this.props.navigator.push({
      screen: SCREEN.BLOCKED_USER_PAGE,
      title: 'Blocked User',
      animated: true
    })
  }

  onStorySetting() {
  }

  onLogOut = () => {
    Alert.alert(
      'OneMap',
      'Are you sure you want to logout?',
      [
        {
          text: 'OK', onPress: () => {
            AsyncStorage.setItem(APP_USER_KEY, '');
            LoginManager.logOut();
            this.props.logout();
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }
  onFollowSetting = () => {
    this.props.navigator.push({
      screen: SCREEN.USER_FOLLOW_PAGE,
      title: 'Follow People',
      animated: true,
    })
  }
  onRequestToBeModification = () => {

  }
  onTerms = () => {

  }
  render() {
    return (
      <View style={styles.container}>
        {/* Edit profile */}
        <TouchableOpacity onPress={this.onEditProfile.bind(this)}>
          <Text style={styles.buttons}>{I18n.t('SETTING_EDIT_PROFILE')}</Text>
        </TouchableOpacity>
        {/* Follow People */}
        <TouchableOpacity onPress={this.onFollowSetting.bind(this)}>
          <Text style={styles.buttons}>{I18n.t('DRAWER_FOLLOW_PEOPLE')}</Text>
        </TouchableOpacity>
        {/* Blocked User */}
        <TouchableOpacity onPress={this.onBlockedUser.bind(this)}>
          <Text style={styles.buttons}>{I18n.t('SETTING_BLOCKED_USER')}</Text>
        </TouchableOpacity>
        {/* Request to be modification */}
        <TouchableOpacity onPress={this.onRequestToBeModification.bind(this)}>
          <Text style={styles.buttons}>{I18n.t('USERPROFILE_USER_REQUSET_MODIFICATION')}</Text>
        </TouchableOpacity>
        {/* Terms */}
        <TouchableOpacity onPress={this.onTerms.bind(this)}>
          <Text style={styles.buttons}>{I18n.t('USERPROFILE_TERMS')}</Text>
        </TouchableOpacity>
        <View style={styles.privateAccount}>
          <Text style={styles.buttons}>{I18n.t('SETTING_PRIVATE_ACCOUNT')}</Text>
          <Switch style={styles.switchAccount} value={this.state.privateAccount} onValueChange={(val) => this.setState({ privateAccount: val })} />
        </View>
        <View style={styles.line}></View>
        <Text style={styles.privateText}>{I18n.t('SETTING_PRIVATE_TEXT')}</Text>
        <View style={styles.line}></View>
        <TouchableOpacity style={styles.logout} onPress={this.onLogOut.bind(this)}>
          <Text style={styles.buttons}>{I18n.t('LOGOUT')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



//make this component available to the app
export default AccountSetting;
