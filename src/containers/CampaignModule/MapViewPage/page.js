//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import MapView, { PROVIDER_GOOGLE, ProviderPropType, Marker } from 'react-native-maps';
import { LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA } from '@global/const'
import { GetConditionByGroup } from '../../../graphql/condition'
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
    GetConditionByGroup(this.props.conditionGroupId)
    .then(res => {
      console.log(res)
      this.setState({
        conditions: res
      },async () => {
        const makers = await Promise.all(this.state.conditions.map(async (item, index) => {
          return Promise.resolve({
            latitude: item.locationLat,
            longitude: item.locationLong
          })
        }))
        this.map.fitToCoordinates(makers, {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        })
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
          this.state.conditions && this.state.conditions.map((condtion, index) => {
            return (
              <Marker
                identifier = { 'condition' + index }
                title={condtion.name}
                key={index}
                coordinate={{
                  latitude: condtion.locationLat,
                  longitude: condtion.locationLong
                }}
                // onPress={() => this.onConditionGroup(condtion.id)}
                image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
              >
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
