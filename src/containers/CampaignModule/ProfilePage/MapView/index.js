//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, ProviderPropType, Marker } from 'react-native-maps';
import PropTypes from 'prop-types'
import styles from './styles'

import { LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA } from '@global/const'

// create a component
class MapTabView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: LATITUDE,
      long: LONGITUDE,
      lat_delta: LATITUDE_DELTA,
      long_delta: LONGITUDE_DELTA
    }
  }

  async fitMarkers() {
    const makers = await Promise.all(this.props.places.map(async (item, index) => {
      return Promise.resolve({
        latitude: item.lat,
        longitude: item.long
      })
    }))
    if (this.props.places.length) {
      const item = this.props.places[0]
    }
    this.map.fitToCoordinates(makers, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
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
          // scrollEnabled={false}
        >
        {
          this.props.places && this.props.places.map((item, index) => {
            return (
              <Marker
                identifier = { 'map' + index }
                title={item.name}
                key={index}
                coordinate={{
                  latitude: item.lat,
                  longitude: item.long
                }}
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

MapTabView.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    name: PropTypes.string
  })),
  provider: ProviderPropType
}

//make this component available to the app
export default MapTabView;
