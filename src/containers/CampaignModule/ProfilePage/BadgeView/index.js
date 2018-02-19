//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import { getGrayImage } from '../../../../global/cloudinary'
import styles from './styles'
// create a component
class BadgeTab extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.badges)
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.props.badges ?
        this.props.badges.map((badge, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => this.props.onPress(badge.id, badge.type)}>
              <View style={styles.badgeContainer} >
                <Image source={ badge.iconUrl ? {uri: this.getBadgeWithStatus(badge) } : require('@assets/images/greenPin_old.png')} style={styles.badgeImage}/>
              </View>
            </TouchableOpacity>
          )
        })
        : null
      }
      {
        this.props.badges.length % 3 == 2 ? 
        (
          <View style={styles.emptyElement}>
          </View>
        )
        : null
      }
      </View>
    );
  }

  getBadgeWithStatus(badge) {
    if ( badge.receivedBy.length == 0 ) {
      return getGrayImage(badge.iconUrl)
    } else {
      return badge.iconUrl
    }
  }
}

BadgeTab.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    name: PropTypes.string,
    iconUrl: PropTypes.string,
    type: PropTypes.string
  })),
  onPress: PropTypes.func
}
//make this component available to the app
export default BadgeTab;
