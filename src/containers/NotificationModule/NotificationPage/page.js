//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import OneSignal from 'react-native-onesignal'
// import Component
import Notification from '../../../components/NotificationItem'

import styles from './styles'
import I18n from '@language'
import FONT from '../../../theme/fonts'
import * as SCREEN from '../../../global/screenName'
import { getProfile } from '../../../graphql/userprofile'
// create a component
class NotificationPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notifications: []
    }
  }

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
  }

  onReceived = (notification) => {
    this.setState({
      notifications: [
        notification.payload.additionalData,
        ...this.state.notifications
      ]
    })
    console.log('Notification Recieved: ', notification)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[FONT.Title, styles.activity]}>{I18n.t('NOTIFICATION_ACTIVITY')}</Text>
        <ScrollView>
          {
            this.state.notifications.map((item, index) => {
              return <Notification
                key={index}
                onPress={() => this.onNavigateProfilePage(item, index)}
                type={item.type}
                sImg={item.sImg}
                aImg={item.aImg}
                aName={item.aName}
                readAt={item.readAt}
                _createdAt={item.date} />
            })
          }
        </ScrollView>
      </View>
    );
  }

  onNavigateProfilePage = (item, index) => {
    let notifications = this.state.notifications
    notifications[index].readAt = new Date().toISOString()
    this.setState({
      notifications: notifications
    })
    switch (item.type) {
      case 'LIKE':
      case 'UNLIKE':
        return
      case 'FOLLOW':
      case 'UNFOLLOW':
        return getProfile(item.userId)
          .then(res => {
            this.props.navigator.push({
              screen: SCREEN.USERS_PROFILE_PAGE,
              title: I18n.t('PROFILE_PAGE_TITLE'),
              animated: true,
              passProps: {
                userInfo: {
                  id: res.id,
                  username: res.username,
                  firstName: res.firstName,
                  lastName: res.lastName,
                  displayName: res.displayName,
                  photoURL: res.photoURL,
                  playerId: res.playerId
                }
              }
            })
          })
    }
  }
}



//make this component available to the app
export default NotificationPage;
