//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, ProviderPropType, Marker, Callout } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import ViewMoreText from '@components/ViewMoreText'
import { LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA } from '@global/const'
import { GetConditionByGroup } from '../../../graphql/condition'
import { GetBadgesByCondtionGroup, GetBadgesByCity } from '../../../graphql/badge'
import { GetSuggestPlaces } from '../../../graphql/places'
import PropTypes from 'prop-types'
import CardView from 'react-native-cardview'
import FontStyle from '../../../theme/fonts'
import I18n from '@language'
import styles from './styles'
import SuggestPlaceItem from '../../../components/CampaignSuggestPlace'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import * as SCREEN from '../../../global/screenName'
const SuggestPlace = [{
  id: 'cjdjefc2anqin0180hlr8msd8',
  name: 'Khad Khong Tha  Lampang',
  images: [
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any'
  ],
  address: 'Talad Gao Rd, Suan Dok, Mueang Lampang, Lampang  52100'
},{
  id: 'cjdjecsnvnq0a0180zs953ez2',
  name: 'Khad Khong Tha  Lampang',
  images: [
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any'
  ],
  address: 'Talad Gao Rd, Suan Dok, Mueang Lampang, Lampang  52100'
}
]
// create a component
class CampaignPage extends Component {
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

    this.state = {
      lat: LATITUDE,
      long: LONGITUDE,
      lat_delta: LATITUDE_DELTA,
      long_delta: LONGITUDE_DELTA,
      conditions: [],
      shortFlag: false,
      badges: [],
      suggestPlaces: []
    }
    this.FetchBadgeData()
    this.FetchSuggestPlace()
  }

  componentWillMount = () => {
  }

  onNaviagtorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    } else {
    }
  }

  componentDidUpdate = () => {
    this.fitMarkers()
  }

  FetchBadgeData() {
    GetBadgesByCity(this.props.id)
    .then(res => {
      this.setState({
        badges: res
      })
    })
  }

  FetchSuggestPlace() {
    GetSuggestPlaces()
    .then(res => {
      console.log('Suggest Place', res)
      this.setState({
        suggestPlaces: res
      })
    })
  }

  fitMarkers = () => {
    const makers = this.state.badges.map((item, index) => {
      return {
        latitude: item.locationLat,
        longitude: item.locationLong
      }
    })
    this.map.fitToCoordinates(makers, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    })
  }

  onNavigatePlaceDetail(index) {
    // this.props.navigator.push({
    //   screen: SCREEN.CAMPAIGN_PLACE_DETAIL_PAGE,
    //   title: I18n.t('CAMPAIGN_PLACE_DETAIL'),
    //   passProps: detail
    // })
    console.log(index)
  }

  renderShortPart = () => {
    return (
      <TouchableOpacity onPress={() => this.setState({shortFlag: !this.state.shortFlag})}>
      <View style={styles.conditionGroupInfo}>
        <Image source={this.props.icon ? {uri: this.props.icon} : require('@assets/images/badge/badge.png')} style={styles.conditionGroupImage}/>
        <View style={styles.conditionGroupShort}>
          <Text style={[FontStyle.Header, styles.conditionGroupTitle]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
          <Text style={[FontStyle.SubContent, styles.conditionGroupTitle]} numberOfLines={2} ellipsizeMode={'tail'} >{this.props.subtitle}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  renderSuggestedPlace() {
    return (
      <View style={styles.SuggestPlaceContainer}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={this.state.suggestPlaces}
          horizontal
          renderItem={({ item }) => (
            <CardView cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.SPlaceItem}
            >
              <SuggestPlaceItem id={item.id} name={item.placeName} address={item.address} images={item.pictureURL} onPress={(id) => this.onNavigatePlaceDetail(item)}/>
            </CardView>
          )}
        />
      </View>
    )
  }

  renderCampaignBadge() {
    return (
      <View style={styles.badgeContainer}>
        <FlatList 
          keyExtractor={(item, index) => index}
          data={this.state.badges}
          horizontal
          renderItem={({item}) => (
            <CardView cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={15}
              style={styles.BadgeItem}
            >
              <Image source={item.iconUrl ? {uri: item.iconUrl} : require('@assets/images/badge/badge.png')} style={styles.badgeImage}/>
            </CardView>
          )}
        />
      </View>
    )
  }

  renderFullPart = () => {
    return (
      <View style={styles.conditionGroupFullInfo}>
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={(onPress) => (<Text onPress={onPress} style={[FontStyle.SubContent, styles.additionalText]}>read more</Text>)}
          renderViewLess={(onPress) => (<Text onPress={onPress} style={[FontStyle.SubContent, styles.additionalText]}>read less</Text>)}
          textStyle={[FontStyle.SubContent, styles.description]}>
          {this.props.description}
        </ViewMoreText>
        <Text style={[FontStyle.Title, styles.SuggestPlace]}>{I18n.t('CAMPAIGN_SUUGESTED_PLACE')}</Text>
        { this.renderSuggestedPlace() }
        <Text style={[FontStyle.Title, styles.Badges]}>{I18n.t('CAMPAIGN_BADGE')}</Text>
        { this.renderCampaignBadge() }
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.long,
            latitudeDelta: this.state.lat_delta,
            longitudeDelta: this.state.long_delta,
          }}
          onLayout={() => this.fitMarkers()}
          ref={ref => { this.map = ref }}
          // scrollEnabled={false}
        >
        {
          this.state.badges && this.state.badges.map((condition, index) => {
            return (
              <Marker
                identifier = { 'conditionGroup' + index }
                // title={condition.name}
                key={index}
                coordinate={{
                  latitude: condition.locationLat,
                  longitude: condition.locationLong
                }}
                onPress={() => this.onNavigatePlaceDetail({
                  id: condition.id,
                  name: condition.name,
                  campaignName: this.props.title
                })}
                image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
              >
              <Callout >
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 , maxHeight: 30}}>
                  <Text style={[FontStyle.Regular, {textAlign: 'center', width: '100%'}]}>{condition.name}</Text>
                </View>
              </Callout>
              {Platform.OS === 'ios' && (
                <Image source={require('@assets/images/map_pin.png')} style={styles.mapmarker} />
              )}
              </Marker>)
          })
        }
        </MapView>
        <CardView style={styles.conditionGroup}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={8}
        >
          <ScrollView>
          { this.renderShortPart()}
          { this.state.shortFlag ? this.renderFullPart() : null}
          </ScrollView>
        </CardView>
      </View>
    );
  }
}

CampaignPage.navigatorButtons = {
  leftButtons: [
    {
      title: '',
      id: 'backButton',
      buttonColor: DARK_GRAY_COLOR,
      disableIconTint: true
    }
  ]
}

CampaignPage.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  subtitle: PropTypes.string
}
//make this component available to the app
export default CampaignPage;
