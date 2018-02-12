//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types'

import styles from './styles'
// create a component
class BadgeTab extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.props.badges ?
        this.props.badges.map(badge => {
          return (
            <View style={styles.badgeContainer}>
              <Image source={ badge.photoURL ? {uri: badge.photoURL } : require('@assets/images/greenPin_old.png')} style={styles.badgeImage}/>
            </View>
          )
        })
        : null
      }
        
      </View>
    );
  }
}

BadgeTab.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    name: PropTypes.string,
    photoURL: PropTypes
  }))
}
//make this component available to the app
export default BadgeTab;
