//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';

import I18n from '@language'
import styles from './styles'
import { DARK_GRAY_COLOR } from '../../../theme/colors';

import * as SCREEN from '@global/screenName'

var $this
// create a component
class AccountSetting extends Component {

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
    $this = this
    this.state = {
      privateAccount: false
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent =(event) => {
    if (event.type == 'NavBarButtonPress') {
      if(event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }
  componentDidMount () {

  }
  _onBack () {
  }

  onEditProfile () {
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

  onBlockedUser () {
    this.props.navigator.push({
      screen: SCREEN.BLOCKED_USER_PAGE,
      title: 'Blocked User',
      animated: true
    })
  }

  onStorySetting () {
  }

  onLogOut=()=> {
    this.props.logout()
  }
  onFollowSetting=() => {
    this.props.navigator.push({
      screen: SCREEN.USER_FOLLOW_PAGE,
      title: 'Follow People',
      animated: true,
    })
  }
  onRequestToBeModification=() => {

  }
  onTerms=() => {

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
          <Switch style={styles.switchAccount} value={this.state.privateAccount} onValueChange={(val) => this.setState({privateAccount: val})}/>
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
