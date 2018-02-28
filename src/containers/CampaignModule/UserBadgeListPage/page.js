//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PropType from 'prop-types'

import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors'
import { GetBadgesByCampaign } from '../../../graphql/badge'
import { getGrayImage } from '../../../global/cloudinary'
import * as SCREEN from '../../../global/screenName'
import I18n from '@language'
import styles from './styles'
// create a component
class UserPageListPage extends Component {
  
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

    this.state = {
      badges: []
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillMount() {
    GetBadgesByCampaign(this.props.id, this.props.user.id)
    .then(res => {
      this.setState({
        badges: res
      })
    })
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    } else {
    }
  }

  getBadgeWithStatus(badge) {
    if ( badge.receivedBy.length == 0 ) {
      return getGrayImage(badge.iconUrl)
    } else {
      return badge.iconUrl
    }
  }

  render() {
    return (
      
      <View style={styles.Page}>
      <ScrollView style={styles.container}>
      <View style={styles.badgeContainer}>
      {
        this.state.badges.map((badge, index) => {
          return (
            <TouchableOpacity style={styles.badgeItem} key={index} onPress={() => this.onNavigateBadgeStatusPage(badge)}>
              <Image source={badge.iconUrl ? { uri: this.getBadgeWithStatus(badge) } : require('@assets/images/badge/badge.png')} style={styles.badgeImage}/>
            </TouchableOpacity>
          )
        })
      }
      {
        this.state.badges.length % 3 == 2 ? <View style={styles.badgeItem}></View> : null
      }
      </View>
      </ScrollView>
      </View>
      
    );
  }

  onNavigateBadgeStatusPage = (badge) => {
    console.log('Badge : ', badge)
    this.props.navigator.push({
      screen: SCREEN.CAMPAIGN_USER_BADGE_STATUS_PAGE,
      title: I18n.t('BADGE_STR'),
      navigatorStyle: {
        navBarComponentAlignment: 'center'
      },
      passProps: {
        badge: badge
      }
    })
  }
}

UserPageListPage.propTypes = {
  id: PropType.string,
  title: PropType.string
}

UserPageListPage.navigatorButtons = {
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
export default UserPageListPage;
