//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from './styles'
import I18n from '@language'
import FONT from '../../../theme/fonts'
// create a component
class NotificationPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[FONT.Title, styles.activity]}>{I18n.t('NOTIFICATION_ACTIVITY')}</Text>
      </View>
    );
  }
}



//make this component available to the app
export default NotificationPage;
