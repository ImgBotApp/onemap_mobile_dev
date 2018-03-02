//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CardView from 'react-native-cardview'
import PropType from 'prop-types'
import moment from 'moment'
import I18n from '@language'
import styles from './styles'
import THEME from '../../theme/fonts'
// create a component
class NotificationItem extends Component {
  render() {
    return (
      <CardView style={[styles.container, { backgroundColor: this.getBackgroundColor() }]} 
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
      >
        <View style={{justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={{uri: this.props.aImg}} style={styles.aImg}/>
            <View style={styles.accountInformation}>
              <Text style={[THEME.Title, { color: this.getTextColor()}]}>{this.props.aName}</Text>
              <Text style={[THEME.SubTitle, { color: '#a5a5a5'}]}>
                {'Updated '}{ moment(this.props._createdAt).fromNow() }
              </Text>
            </View>
          </View>
          <View>
            <Text style={[THEME.Title, { color: this.getTextColor()}]}>{this.getNotificationDescription()}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Image source={{uri: sImg}} style={styles.sImg}/>
        </View>
      </CardView>
    );
  }

  getBackgroundColor = () => {
    if (this.props.readAt == null || this.props.readAt == undefined || this.props.readAt == '')
      return '#7a7a7a'
    else
      return 'white'
  }

  getTextColor = () => {
    if (this.props.readAt == null || this.props.readAt == undefined || this.props.readAt == '')
      return 'white'
    else
      return '#7a7a7a'
  }

  getNotificationDescription = () => {
    switch (this.props.type) {
      case 'LIKE':
        return I18n.t('NOTIFICATION_LIKE')
      case 'UNLIKE':
        return I18n.t('NOTIFICATION_UNLIKE')
      case 'FOLLOW':
        return I18n.t('NOTIFICATION_FOLLOW')
      case 'UNFOLLOW':
        return I18n.t('NOTIFICATION_UNFOLLOW')
    }
  }
}

NotificationItem.propTypes = {
  readAt: PropType.string,
  sImg: PropType.string,
  type: PropType.string,
  aImg: PropType.string,
  aName: PropType.string,
  _createdAt: PropType.string
}
//make this component available to the app
export default NotificationItem;
