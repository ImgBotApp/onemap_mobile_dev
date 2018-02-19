//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Tabs from 'react-native-tabs'

import CircleImage from '../../../components/CircleImage'

import { getCampaignDetail } from '../../../graphql/campaign'
import { GetBadgesByCampaign, GetBadgeDetail } from '../../../graphql/badge'
import { GetSuggestPlaces } from '../../../graphql/places'
import { GetBadgesByCity } from '../../../graphql/badge'
import styles from './styles'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors'
import { getDeviceWidth } from '../../../global'
import I18n from '@language'
import FontStyle from '../../../theme/fonts'
// Tab View
import MapTabView from './MapView'
import BadgeTabView from './BadgeView'

import { CAMPAIGN_CONDITION_GROUP_PAGE, CAMPAIGN_BADGE_DETAIL_PAGE, CAMPAIGN_MAIN_PAGE } from '../../../global/screenName'
// create a component
class CampaignProfilePage extends Component {

  constructor (props) {
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

    this.state = {
      campaignId : props.campaignId,
      detail: {
        partner: {
          _followersMeta: {}
        },
        _joinedByMeta: {}
      },
      badges: [],
      page: ''
    }
    this.FetchCampaignDetail(props.campaignId)
    this.FetchBadgesByCampaign(props.campaignId, props.user.id)
  }

  onNaviagtorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    }
  }

  FetchCampaignDetail(campaignId) {
    getCampaignDetail(campaignId)
    .then(res => {
      this.setState({
        detail: res,
        page: 'mapView'
      })
    })
  }

  FetchBadgesByCampaign(campaignId, userId) {
    GetBadgesByCampaign(campaignId, userId)
    .then(res => {
      this.setState({
        badges: res
      })
    })
  }

  onNavigateConditionGroupPage = (id) => {
    this.props.navigator.push({
      screen: CAMPAIGN_CONDITION_GROUP_PAGE,
      title: I18n.t('CAMPAGIN_ALL_BADGES'),
      passProps: {
        conditionGroups: this.state.detail.cities
      }
    })
  }

  onNavigateBadgeDetailPage = (id, type) => {

    if (type == 'CITY') {
      return
    }

    Promise.all([GetBadgeDetail(id, this.props.user.id), GetSuggestPlaces()])
    .then(ress => {
      this.props.navigator.push({
        screen: CAMPAIGN_BADGE_DETAIL_PAGE,
        title: I18n.t('CAMPAIGN_BADGE_DETAIL'),
        passProps: {
          suggestPlaces: ress[1],
          id: id,
          detail: ress[0]
        }
      })
    })
  }

  onNavigateCity = (data) => {
    GetBadgesByCity(data.id, this.props.user.id)
    .then(res => {
      this.props.navigator.push({
        screen: CAMPAIGN_MAIN_PAGE,
        title: I18n.t('PROFILE_CAMPAIGN'),
        passProps: {
          ...data,
          badges: res
        }
      })
    })
  }

  _renderHeaderPart() {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.profileImage}>
          <CircleImage uri={this.state.detail.iconUrl} radius={getDeviceWidth(170)}/>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={[FontStyle.Title,styles.campaignName]}>{this.state.detail.name}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={[FontStyle.SubTitle, styles.followerText]}>{I18n.t('CAMPAIGN_JOINED')}</Text>
          <Text style={[FontStyle.Content, styles.followerCount]}>{this.state.detail._joinedByMeta.count}</Text>
        </View>
      </View>
    )
  }
  
  _renderDescription() {
    return (
      <View style={styles.descriptionContainer}>
        <Text style={[FontStyle.SubContent, styles.description]}>{this.state.detail.description}</Text>
      </View>
    )
  }

  _renderTabView() {
    return (
      <View style={styles.tabContainer}>
        <Tabs selected={this.state.page} style={styles.tabView} onSelect={el => this.setState({page: el.props.name})} >
          <View style={styles.tabItem} name="mapView" >
            <Text style={[FontStyle.Content, this.state.page=='mapView' ? styles.tabSelectItemText : styles.tabItemText]}> {I18n.t('CAMPAIGN_MAP_VIEW')} </Text>
            <View style={this.state.page=='mapView' ? styles.separateSelect : styles.separate}></View>
          </View>
          <View style={styles.tabItem} name="badge">
            <Text style={[FontStyle.Content, this.state.page=='badge' ? styles.tabSelectItemText : styles.tabItemText]}> {I18n.t('CAMPAIGN_BADGE_VIEW')} </Text>
            <View style={this.state.page=='badge' ? styles.separateSelect : styles.separate}></View>
          </View>
        </Tabs>
      </View>
    )
  }

  _renderMainPart() {
    if (this.state.page == 'mapView') {
      const cities = this.state.detail.cities.map(item => {
        return {
          id: item.id,
          lat: item.locationLat,
          long: item.locationLong,
          name: item.title,
          subtitle: item.subtitle,
          description: item.description,
          iconUrl: item.iconUrl
        }
      })
      return (
        <MapTabView  places = {cities} onConditionGroup={(id) => this.onNavigateConditionGroupPage(id)} onNavigateCity={(id) => this.onNavigateCity(id)}/>
      )
    }
    if (this.state.page == 'badge') {
      return (
        <BadgeTabView badges={this.state.badges} onPress={(id, type) => this.onNavigateBadgeDetailPage(id, type)}/>
      )
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
      <ScrollView>      
      <View style={styles.container}>
        { this._renderHeaderPart() }
        { this._renderDescription() }
        { this._renderTabView() }
        { this._renderMainPart() }
      </View>
      </ScrollView>
      </View>
    );
  }
}

CampaignProfilePage.navigatorButtons = {
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
export default CampaignProfilePage;
