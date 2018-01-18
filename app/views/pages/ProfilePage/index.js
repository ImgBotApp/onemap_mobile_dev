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

import Container from '@layout/Container';
import MapPage from '../MapPage';
import EventPage from './SubTabViews/EventPage';
import BadgePage from './SubTabViews/BadgePage';

import CircleImage from '@components/CircleImage'

import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';
import { Actions } from 'react-native-router-flux';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      page: 'mapView',
    }
  }

  onPressMarker() {
    Actions.BadgeList();
  }

  render() {
    return (
      <Container title="Profile">
        <ScrollView style={styles.container}>
          <View style={styles.infoView}>
            <View style={styles.profileView}>
              <CircleImage style={styles.profileImage} uri={data.photoURL} radius={50} />
              <Image source={require('@assets/images/profileCircle.png')} style={styles.checkImage} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>
                {data.title}
              </Text>
              <Text style={styles.email}>
                {data.email}
              </Text>
            </View>
            <View style={styles.followingContainer}>
              <Text style={styles.followers}>
                Followers
              </Text>
              <Text style={styles.followerCount}>
                {data.followerCount}
              </Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}  ellipsizeMode={'middle'}>
              {data.description}
            </Text>
          </View>
          <View style={styles.tabContainer}>
            <Tabs selected={this.state.page} style={styles.tabView} onSelect={el => this.setState({page: el.props.name})} >
              <View style={styles.tabItem} name="mapView" >
                <Text style={this.state.page=='mapView' ? styles.tabSelectItemText : styles.tabItemText}> Map View </Text>
                <View style={this.state.page=='mapView' ? styles.separateSelect : styles.separate}></View>
              </View>
              <View style={styles.tabItem} name="events">
                <Text style={this.state.page=='events' ? styles.tabSelectItemText : styles.tabItemText}> Events </Text>
                <View style={this.state.page=='events' ? styles.separateSelect : styles.separate}></View>
              </View>
              <View style={styles.tabItem} name="badge">
                <Text style={this.state.page=='badge' ? styles.tabSelectItemText : styles.tabItemText}> Badge </Text>
                <View style={this.state.page=='badge' ? styles.separateSelect : styles.separate}></View>
              </View>
            </Tabs>
          </View>
          {this.state.page == 'mapView' && (
            <View style={styles.mapContainer}>
              <MapPage data={mapData} currentLocation={currentLocation} onPressMarker={(data)=>this.onPressMarker(data)} radius={10} />
            </View>
          )}
          {this.state.page == 'events' && (
            <View style={styles.mapContainer}>
              <EventPage />
            </View>
          )}
          {this.state.page == 'badge' && (
            <View style={styles.mapContainer}>
              <BadgePage />
            </View>
          )}
        </ScrollView>
      </Container>
    );
  }
}



const data = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: '@citieshiddengems.official',
  title: '12 Forbidden Cities missing',
  description: 'New Travel Experiencec Brings "12 Forbidden Cities ...Missing" Or 12  You can not say no. Bring the highlihghts and identity of the city.'
                + 'The Thai people have not recognized. To fall in love Thailand',
  city: 'Baku',
  country: 'Azerbaijian',
  followerCount: '54.2 k',
  photoURL: 'https://picsum.photos/800/300',
  registrationDate: new Date(),
  stories: [
    {
      id: 'a1',
      title: 'BAKUE',
      uri: 'https://picsum.photos/200/300'
    },
    {
      id: 'a2',
      title: 'PARIS',
      uri: 'https://picsum.photos/250/300'
    },
    {
      id: 'a3',
      title: 'BERLIN',
      uri: 'https://picsum.photos/300/300'
    },
    {
      id: 'a4',
      title: 'MOSCOW',
      uri: 'https://picsum.photos/350/300'
    },
    {
      id: 'a5',
      title: 'WARSAOW',
      uri: 'https://picsum.photos/400/300'
    },
    {
      id: 'a6',
      title: 'MADRID',
      uri: 'https://picsum.photos/550/300'
    },
    {
      id: 'a7',
      title: 'ROMA',
      uri: 'https://picsum.photos/600/300'
    },
    {
      id: 'a8',
      title: 'NEW YORK',
      uri: 'https://picsum.photos/750/300'
    },
    {
      id: 'a9',
      title: 'TOKYO',
      uri: 'https://picsum.photos/800/300'
    },
  ]
}

let currentLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

let mapData = [
  {
    coordinates: {
      latitude: currentLocation.latitude - 0.1,
      longitude: currentLocation.longitude - 0.05
    }
  },
  {
    coordinates: {
      latitude: currentLocation.latitude + 0.1,
      longitude: currentLocation.longitude + 0.1
    }
  },
  {
    coordinates: {
      latitude: currentLocation.latitude + 0.2,
      longitude: currentLocation.longitude - 0.1
    }
  }
];
