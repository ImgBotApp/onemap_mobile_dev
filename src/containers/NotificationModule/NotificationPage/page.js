//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import OneSignal from 'react-native-onesignal'
// import Component
import Notification from '../../../components/NotificationItem'

import styles from './styles'
import I18n from '@language'
import FONT from '../../../theme/fonts'
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
              onPress={() => {}}
              type={item.type} 
              sImg={item.sImg}
              aImg={item.aImg}
              aName={item.aName}
              _createdAt={item.date} />
          })
        }
        </ScrollView>
      </View>
    );
  }
}



//make this component available to the app
export default NotificationPage;
