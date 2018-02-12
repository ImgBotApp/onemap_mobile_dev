//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

import styles from './styles'
// create a component
class MapViewPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MapViewPage</Text>
      </View>
    );
  }
}

MapViewPage.propTypes = {
  conditionGroupId: PropTypes.string
}

//make this component available to the app
export default MapViewPage;
