//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import styles from './styles'
// create a component
class MapViewPage extends Component {
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
    this.props.navigator.setOnNavigatorEvent(this.onNaviagtorEvent.bind(this));
  }
  onNaviagtorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    } else {
    }
  }
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

MapViewPage.navigatorButtons = {
  leftButtons: [
    {
      title: '',
      id: 'backButton',
      buttonColor: DARK_GRAY_COLOR,
      disableIconTint: true
    }
  ]
}
//make this component available to the app
export default MapViewPage;
