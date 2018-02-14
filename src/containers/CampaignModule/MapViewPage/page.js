//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import MapView, { PROVIDER_GOOGLE, ProviderPropType, Marker, Callout } from 'react-native-maps';
import { LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA } from '@global/const'
import * as SCREEN from '../../../global/screenName'
import I18n from '../../../languages'
import styles from './styles'
import Fontstyle from '../../../theme/fonts'
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

    this.state = {
      lat: LATITUDE,
      long: LONGITUDE,
      lat_delta: LATITUDE_DELTA,
      long_delta: LONGITUDE_DELTA,
      conditions: []
    }
  }

  componentWillMount() {

  }

  fitMarkers = () => {
    const makers = this.props.conditionGroups.map((item, index) => {
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

  onNaviagtorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    } else {
    }
  }

  onNavigateCondition = (conditionGroupData) => {
    this.props.navigator.push({
      screen: SCREEN.CAMPAIGN_MAIN_PAGE,
      title: I18n.t('PROFILE_CAMPAIGN'),
      passProps: conditionGroupData
    })
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
        >
        {
          this.props.conditionGroups && this.props.conditionGroups.map((conditionGroup, index) => {
            return (
              <Marker
                identifier = { 'conditionGroup' + index }
                // title={conditionGroup.title}
                key={index}
                coordinate={{
                  latitude: conditionGroup.locationLat,
                  longitude: conditionGroup.locationLong
                }}
                onPress={() => this.onNavigateCondition({
                  id: conditionGroup.id,
                  title: conditionGroup.title,
                  subtitle: conditionGroup.subtitle,
                  description: conditionGroup.description,
                  icon: conditionGroup.iconUrl
                })}
                image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
              >
              <Callout >
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                  <Text style={[Fontstyle.Regular, {textAlign: 'center', width: '100%'}]}>{conditionGroup.title}</Text>
                </View>
              </Callout>
              {Platform.OS === 'ios' && (
                <Image source={require('@assets/images/map_pin.png')} style={styles.mapmarker} />
              )}
              </Marker>)
          })
        }
        </MapView>
      </View>
    );
  }
}

MapViewPage.propTypes = {
  conditionGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    locationLat: PropTypes.number,
    locationLong: PropTypes.number,
    title: PropTypes.string
  }))
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
