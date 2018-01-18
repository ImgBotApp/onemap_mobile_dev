import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Tabs from 'react-native-tabs'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';

export default class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      page: 'mapView',
    }
  }

  onMarker(data) {
    this.props.onPressMarker(data);
  }

  render() {
    const {data, currentLocation, radius} = this.props;
    return (
        <MapView
          style={[styles.map, {borderRadius: radius}]}
          initialRegion={currentLocation}
        >
        {data.map((marker, index) => (
          <MapView.Marker
            key={index}
            style={styles.mapmarker}
            image={require('@assets/images/marker.png')}
            coordinate={marker.coordinates}
            onPress={()=>this.onMarker(marker)}
          />
        ))}
        </MapView>
    );
  }
}
