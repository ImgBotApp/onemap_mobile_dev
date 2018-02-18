//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import FontStyle from '../../../theme/fonts'
import PropTypes from 'prop-types'
import styles from './styles'
import I18n from '@language'
import CardView from 'react-native-cardview'
import moment from 'moment'
import { GetPlaceByCondition, GetRulesByCondition, GetConditionDetail } from '../../../graphql/condition'
import { GetBadgeDetail } from '../../../graphql/badge'
import { getPlaceDetail } from '../../../graphql/places'
import SuggestPlaceItem from '../../../components/CampaignSuggestPlace'
import * as SCREEN from '../../../global/screenName'
import { fetchThumbFromCloudinary } from '../../../global/cloudinary'
// create a component
class PlaceDetailPage extends Component {
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

    this.state = {
      place: {},
      rules: {},
      detail: this.props.detail
    }
    this.props.navigator.setOnNavigatorEvent(this.onNaviagtorEvent.bind(this));
  }

  componentWillMount() {
    // this.FetchPlaceDetail()
  }

  FetchPlaceDetail = () => {
    GetBadgeDetail(this.props.id, this.props.user.id)
    .then(res => {
      this.setState({
        detail: res
      })
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

  renderBadgeDetail() {
    return (
      <View style={styles.detailPart}>
        <CardView cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={15}
          >
        <Image source={ this.state.detail.iconUrl ? { uri: this.state.detail.iconUrl} : require('@assets/images/badge/badge.png')}  style={styles.detailImage}/>
        </CardView>
        <View style={styles.detailContainer}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[FontStyle.Title, styles.detailName]} numberOfLines={2}>{this.state.detail.title}</Text>
            <Text style={[FontStyle.SubTitle, styles.detailName, {marginTop: 10}]} numberOfLines={1}>{this.state.detail.subtitle}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderPlaceDetail() {
    return (
      <View style={styles.placeContainer}>
        <CardView cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.placeDetailContainer}
          >
            <View style={styles.PlaceDetailCardContainer}>
              <Text style={[FontStyle.Title, styles.detailName]}>{this.state.detail.title}</Text>
              <View style={styles.PlaceDetailCardDestinationContainer}>
                <Text style={[FontStyle.SubTitle, styles.PlaceDetailCardDestinationText]}>
                  {I18n.t('CAMPAIGN_DISTANCE')}{' '}
                  {'100'}{'km'}
                  {'('}
                  {'30min'}
                  {')'}
                </Text>
                <TouchableOpacity style={styles.PlaceDetailCardCheckIn}>
                  <Text style={[FontStyle.SubTitle, styles.PlaceDetailCardCheckInText]}>{I18n.t('FEED_CHECK_IN')}</Text>
                </TouchableOpacity>
              </View>
              <FlatList 
                keyExtractor={(item, index) => index}
                data={this.state.detail.places.pictureURL ? this.state.detail.places.pictureURL : []}
                style={styles.placeDetail}
                horizontal
                renderItem={({ item }) => (
                  <Image source={{uri: fetchThumbFromCloudinary(item)}} style={styles.placeImage} />
                )}
              />
              <Text style={[FontStyle.SubContent, styles.PlaceDetailCardPlaceName]} numberOfLines={2}>{this.state.detail.places.placeName}</Text>
              <View style={styles.SperateBar}></View>
              <Text style={[FontStyle.SubTitle, styles.placeDescription]}>{this.state.detail.places.description}</Text>
              <TouchableOpacity onPress={() => this.onVisitPlaceProfile(this.state.detail.places.id)}
                style={{width: '30%'}}
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
          <Image source={require('@assets/images/badge/checkin.png')} style={styles.checkInImage}/>
          <Text style={[FontStyle.SubContent, styles.ruleText]}>{' '}{I18n.t('FEED_CHECK_IN')}{' '}{this.state.detail.distance}{' m'}</Text>
        </View>
        <View style={styles.eventType}>
          <Image source={require('@assets/images/badge/time.png')} style={styles.checkInImage}/>
          <View>
            <Text style={[FontStyle.SubContent, styles.ruleText]}>
              {' '}{ moment(this.state.detail.startDate).format('DD MMM YY')} {' - '} { moment(this.state.detail.endDate).format('DD MMM YY')} 
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
        { this.renderRuleItem()}
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
        { this.renderSuggestedPlace()}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>        
        { this.renderBadgeDetail() }
        { this.renderPlaceDetail() }
        { this.renderRules() }
        { this.renderSuggestPlaces() }
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
