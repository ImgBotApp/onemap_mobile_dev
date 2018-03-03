import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Vibration } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import CardView from 'react-native-cardview'
import Ionicons from 'react-native-vector-icons/Ionicons'
import geolib from 'geolib';
import { GetBadgeDetail } from '@graphql/badge'
import { GetPlaceByCondition, GetRulesByCondition, GetConditionDetail } from '@graphql/condition'
import { getPlaceDetail } from '@graphql/places'
import SuggestPlaceItem from '@components/CampaignSuggestPlace'
import { getTimeDiff, formattedDistance } from '@global'
import { fetchThumbFromCloudinary } from '@global/cloudinary'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
import { client } from '@root/main'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import FontStyle from '@theme/fonts'
import styles from './styles'

class PlaceDetailPage extends Component {
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
      place: {},
      rules: {},
      detail: props.detail
    };
    if (props.user.location) {
      this.state.distance = geolib.getDistance(props.user.location, {
        latitude: props.detail.locationLat,
        longitude: props.detail.locationLong
      });
    }
    if (props.detail.receivedBy.length) {
      this.lastChecked = props.detail.receivedBy[0].createdAt;
    }
    this.props.navigator.setOnNavigatorEvent(this.onNaviagtorEvent.bind(this));
  }

  componentWillMount() {
    // this.FetchPlaceDetail()
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps.user;
    if (this.state.detail.locationLat && location && (!this.props.user.location || location.latitude !== this.props.user.location.latitude || location.longitude !== this.props.user.location.longitude)) {
      const distance = geolib.getDistance(location, {
        latitude: this.state.detail.locationLat,
        longitude: this.state.detail.locationLong
      });
      this.setState({ distance });
    }
  }

  FetchPlaceDetail = () => {
    GetBadgeDetail(this.props.id, this.props.user.id)
      .then(res => {
        this.setState({
          detail: res
        });
      })
  }

  onNaviagtorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    } else {
    }
  }

  onVisitPlaceProfile = (id) => {
    getPlaceDetail(id)
      .then(res => {
        this.props.navigator.push({
          screen: SCREEN.PLACE_PROFILE_PAGE,
          passProps: {
            place: res
          }
        })
      })
  }

  onCheckIn = () => {
    Vibration.vibrate();

    const { detail } = this.state;
    this.props.receiveBadge({
      variables: {
        badgeId: detail.id,
        userId: this.props.user.id,
        point: detail.point
      }
    }).then(({ data }) => {
      this.lastChecked = data.createReceiveBadge.createdAt;
      this.props.saveUserInfo({ ...this.props.user, receivedBadge: [...this.props.user.receivedBadge, data.createReceiveBadge] });
    }).catch(err => alert(err));

    let placeData = this.state.placeData;
    this.props.checkInPlace({
      variables: {
        placeId: this.state.detail.place.id,
        userId: this.props.user.id,
        lat: this.props.user.location ? this.props.user.location.latitude : 0,
        lng: this.props.user.location ? this.props.user.location.longitude : 0,
        point: parseInt(this.props.settings.defaultCheckinPoint)
      }
    }).then(({ data }) => {
      this.props.saveUserInfo({ ...this.props.user, checkIns: [...this.props.user.checkIns, data.createCheckIn] });
      client.resetStore();
    }).catch(err => alert(err));
  }

  renderBadgeDetail() {
    return (
      <View style={styles.detailPart}>
        <CardView cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.CardBadgeImage}
        >
          <Image source={this.state.detail.iconUrl ? { uri: fetchThumbFromCloudinary(this.state.detail.iconUrl) } : require('@assets/images/badge/badge.png')} style={styles.detailImage} />
        </CardView>
        <View style={styles.detailContainer}>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={[FontStyle.Title, styles.detailName]} numberOfLines={2}>{this.state.detail.title}</Text>
            <Text style={[FontStyle.SubTitle, styles.detailName, { marginTop: 10 }]} numberOfLines={1}>{this.state.detail.subtitle}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderPlaceDetail() {
    const { detail } = this.state;
    const checkable = (this.state.distance && this.state.distance < detail.distance) && (!this.lastChecked || getTimeDiff(new Date(this.lastChecked), new Date()) > this.props.settings.checkinDelay/* * 60*/);

    return (
      <View style={styles.placeContainer}>
        <CardView cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.placeDetailContainer}
        >
          <View style={styles.PlaceDetailCardContainer}>
            <Text style={[FontStyle.Title, styles.detailName]}>{detail.title}</Text>
            <View style={styles.PlaceDetailCardDestinationContainer}>
              <Text style={[FontStyle.SubTitle, styles.PlaceDetailCardDestinationText]}>
                {I18n.t('CAMPAIGN_DISTANCE') + ' ' + formattedDistance(this.state.distance)}
                {' ('}{'30min'}{')'}
              </Text>
              <TouchableOpacity disabled={!checkable} style={[styles.PlaceDetailCardCheckIn, { borderColor: checkable ? '#007aff' : LIGHT_GRAY_COLOR }]} onPress={this.onCheckIn}>
                <Text style={[FontStyle.SubTitle, { color: checkable ? '#007aff' : LIGHT_GRAY_COLOR }]}>{I18n.t('FEED_CHECK_IN')}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              keyExtractor={(item, index) => index}
              data={detail.place.pictureURL ? detail.place.pictureURL : []}
              style={styles.placeDetail}
              horizontal
              renderItem={({ item }) => (
                <Image source={{ uri: fetchThumbFromCloudinary(item) }} style={styles.placeImage} />
              )}
            />
            <Text style={[FontStyle.SubContent, styles.PlaceDetailCardPlaceName]} numberOfLines={2}>{detail.place.placeName}</Text>
            <View style={styles.SperateBar}></View>
            <Text style={[FontStyle.SubTitle, styles.placeDescription]}>{detail.place.description}</Text>
            <TouchableOpacity onPress={() => this.onVisitPlaceProfile(detail.place.id)}
              style={{ width: '30%' }}
            >
              <Text style={[FontStyle.SubTitle, styles.placeMore]}>{I18n.t('PROFILE_VIEW_MORE')}</Text>
            </TouchableOpacity>
          </View>
        </CardView>
      </View>
    )
  }

  renderRuleItem() {
    return (
      <View style={styles.RuleItem} >
        <CardView cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.RuleContainerItem}
        >
          <Text style={[FontStyle.Content, styles.pointRewards]}>{this.state.detail.point}{' Points'}</Text>
          <View style={styles.eventType}>
            <Image source={require('@assets/images/badge/checkin.png')} style={styles.checkInImage} />
            <Text style={[FontStyle.SubContent, styles.ruleText]}>{' '}{I18n.t('FEED_CHECK_IN')}{' '}{this.state.detail.distance}{' m'}</Text>
          </View>
          <View style={styles.eventType}>
            <Image source={require('@assets/images/badge/time.png')} style={styles.checkInImage} />
            <View>
              <Text style={[FontStyle.SubContent, styles.ruleText]}>
                {' '}{moment(this.state.detail.startDate).format('DD MMM YY')} {' - '} {moment(this.state.detail.endDate).format('DD MMM YY')}
              </Text>
            </View>
          </View>
        </CardView>
      </View>
    )
  }

  renderRules() {
    return (
      <View style={styles.RuleContainer}>
        <Text style={[FontStyle.Header, styles.RuleLabel]}>{I18n.t('CAMPAGIN_RULES')}</Text>
        {this.renderRuleItem()}
      </View>
    )
  }

  renderSuggestedPlace() {
    return (
      <View style={styles.SuggestPlaceContainer}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={this.props.suggestPlaces}
          horizontal
          renderItem={({ item }) => (
            <CardView cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.SPlaceItem}
            >
              <SuggestPlaceItem id={item.id} name={item.placeName} address={item.address} images={item.pictureURL}
                onPress={() => this.onVisitPlaceProfile(item.id)}
              />
            </CardView>
          )}
        />
      </View>
    )
  }

  renderSuggestPlaces() {
    return (
      <View style={styles.SuggestContainer}>
        <Text style={[FontStyle.Header, styles.RuleLabel]}>{I18n.t('CAMPAIGN_SUUGESTED_PLACE')}</Text>
        {this.renderSuggestedPlace()}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderBadgeDetail()}
          {this.renderPlaceDetail()}
          {this.renderRules()}
          {this.renderSuggestPlaces()}
        </ScrollView>
      </View>
    );
  }
}

PlaceDetailPage.propTypes = {
  id: PropTypes.string,
  suggestPlaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    pictureURL: PropTypes.arrayOf(PropTypes.string),
    placeName: PropTypes.str
  })),
  name: PropTypes.string,
  campaignName: PropTypes.string
}

PlaceDetailPage.navigatorButtons = {
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
export default PlaceDetailPage;
