//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PropType from 'prop-types'
import moment from 'moment'

import styles from './styles'
import { getGrayImage } from '../../../global/cloudinary'
import FONTSTYLE from '../../../theme/fonts'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors'
import I18n from '@language'
// create a component
class UserBadgeStatusPage extends Component {
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

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

  }

  componentWillMount() {
    console.log(this.props)
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    } else {
    }
  }

  renderDetailPart() {
    return <View style={styles.detailContainer}>
      <Image style={styles.detailImage} source={this.props.badge.city.campaign.iconUrl ? {uri: this.props.badge.city.campaign.iconUrl} :require('@assets/images/badge/badge.png')}/>
      <View style={styles.detailPart}>
        <Text style={[FONTSTYLE.Header, {color: LIGHT_GRAY_COLOR}]} numberOfLines={2} ellipsizeMode={'tail'}>
          {this.props.badge.city.campaign.title}
        </Text>
        <Text style={[FONTSTYLE.Regular, {color: LIGHT_GRAY_COLOR}]} numberOfLines={2} ellipsizeMode={'tail'}>
        {this.props.badge.receivedBy.length == 0 ? I18n.t('CAMPAIGN_BADGE_NOT_EARN') : 
        'You have earn '+ moment(this.props.badge.receivedBy[0].updatedAt).format('DD MMMM YYYY')
        }</Text>
      </View>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
      { this.renderDetailPart() }
        <Image source={this.getIconData()} style={styles.badgeImage} />
      </View>
    );
  }

  getIconData() {
    if (!this.props.badge.iconUrl) return require('@assets/images/badge/badge.png')
    let result = ''
    if (this.props.badge.receivedBy.length == 0) {
      result = getGrayImage(this.props.badge.iconUrl)
    } else {
      result = this.props.badge.iconUrl
    }
    return { uri: result }
  }
}

UserBadgeStatusPage.propTypes = {
  badge: PropType.shape({
    iconUrl: PropType.string,
    id: PropType.string,
    receivedBy: PropType.arrayOf(PropType.shape({
      createdAt: PropType.string,
      updatedAt: PropType.string,
    })),
    type: PropType.string,
    title: PropType.string,
    city: PropType.shape({
      campaign: PropType.shape({
        iconUrl: PropType.string,
        title: PropType.string
      })
    })
  })
}


//make this component available to the app
export default UserBadgeStatusPage;
