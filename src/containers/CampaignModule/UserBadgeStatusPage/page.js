//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from './styles'
// create a component
class UserBadgeStatusPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>UserBadgeStatusPage</Text>
      </View>
    );
  }
}


//make this component available to the app
export default UserBadgeStatusPage;
