//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './style'
import { DARK_GRAY_COLOR } from '../../../theme/colors';

const data = {
  map: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  },
  title: 'GRAMERCY TAVERN',
  address: '42 E 20th St, New York, NY 10003, USA'
}
// create a component
class MapDetailPage extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if(event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.addressText}>{data.address}</Text>
        <View style={styles.mapView}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={data.map}
            region={data.map}
          >
            <MapView.Marker
              style={styles.mapmarker}
              title={data.title}
              image={require('@assets/images/marker.png')}
              coordinate={data.map}
            />
          </MapView>
        </View>
      </View>
    );
  }
}



//make this component available to the app
export default MapDetailPage;
