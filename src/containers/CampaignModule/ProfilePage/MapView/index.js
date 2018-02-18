//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, ProviderPropType, Marker, Callout } from 'react-native-maps';
import PropTypes from 'prop-types'
import styles from './styles'
import Fontstyle from '../../../../theme/fonts'
import { LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA } from '@global/const'

// create a component
class MapTabView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.places.length ? this.props.places[0].lat : LATITUDE,
      long: this.props.places.length ? this.props.places[0].long : LONGITUDE,
      lat_delta: LATITUDE_DELTA,
      long_delta: LONGITUDE_DELTA
    }

    console.log('Map Init: ', this.state)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      lat: this.props.places.length ? this.props.places[0].lat : LATITUDE,
      long: this.props.places.length ? this.props.places[0].long : LONGITUDE
    })
  }
  

  fitMarkers() {
    const makers = this.props.places.map((item, index) => {
      return {
        latitude: item.lat,
        longitude: item.long
      }
    })
    this.map.fitToCoordinates(makers, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }
    })
  }

  onConditionGroup = (id) => {
    this.props.onConditionGroup(id)
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
          scrollEnabled={true}
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
                onPress={() => this.onConditionGroup(item.id)}
                image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
              >
              <Callout >
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                  <Text style={[Fontstyle.Regular, {textAlign: 'center', width: '100%'}]}>{item.name}</Text>
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

MapTabView.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    name: PropTypes.string
  })),
  provider: ProviderPropType,
  onConditionGroup: PropTypes.func.isRequired
}

//make this component available to the app
export default MapTabView;
