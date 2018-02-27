//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform,TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './style'
import { DARK_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getFormattedDistanceString } from '@global/const';
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
        title: '',
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  static navigatorStyle = {
    tabBarHidden: true
  };
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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  getDistance(){
    if(this.props.user.location)
    {
      const dist =geolib.getDistance(
                    this.props.user.location,
                    this.props.map
                );
      console.log("---distance:"+dist);
      return getFormattedDistanceString(dist);
    }else return "0 m";
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.props.map}
            region={this.props.map}
          >
            <MapView.Marker
              title={this.props.title}
              coordinate={this.props.map}
              image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
            >
              {Platform.OS === 'ios' && (
                <Image source={require('@assets/images/map_pin.png')} style={styles.mapmarker} />
              )}
            </MapView.Marker>
          </MapView>
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.titleText]}>{this.props.title}</Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.addressText]}>{this.props.address}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.status}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.distText}>{'Distance'}</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.distvalueText}>{this.getDistance()}</Text>
          </View>
          <View style = {styles.buttonGroup}>
            <TouchableOpacity>
              <Image source={require('@assets/google/google1.png')} style={styles.googleBtn} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('@assets/google/google2.png')} style={styles.googleBtn} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}



//make this component available to the app
export default MapDetailPage;
