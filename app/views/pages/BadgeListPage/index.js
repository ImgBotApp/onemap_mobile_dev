import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';
import Container from '@layout/Container';
import MapPage from '../MapPage';

export default class BadgeListPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }

  onPressMarker() {
    Actions.Campaign();
  }
  
  render() {
    return (
      <Container title="All Badges">
        <View style={styles.container}>
          <MapPage data={mapData} currentLocation={currentLocation} onPressMarker={(data)=>this.onPressMarker(data)} radius={0} />
        </View>
      </Container>
    );
  }
}


let currentLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

let mapData = [
  {
    coordinates: {
      latitude: currentLocation.latitude - 0.01,
      longitude: currentLocation.longitude - 0.02
    }
  },
  {
    coordinates: {
      latitude: currentLocation.latitude + 0.02,
      longitude: currentLocation.longitude + 0.02
    }
  },
  {
    coordinates: {
      latitude: currentLocation.latitude + 0.02,
      longitude: currentLocation.longitude - 0.01
    }
  }
];
