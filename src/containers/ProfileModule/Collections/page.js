//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image, Platform } from 'react-native';
import Tabs from 'react-native-tabs';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import MapView from '@components/MapCluster';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts';
import * as SCREEN from '@global/screenName'
import { clone } from '@global';
import I18n from '@language'
import styles from './styles'

import { client } from '@root/main';
import { graphql } from "react-apollo";
import { GET_COLLECTION_WITH_PLACES, GET_COLLECTIONS_WITH_PLACES } from '@graphql/collections';
import { GET_CHECKED_PLACES } from '@graphql/places';
import { GET_USER_WITH_LIKED_PLACES } from '@graphql/userprofile'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'

const PLACES_PER_PAGE = 20;

const map = {
  latitude: 0,
  longitude: -180,
  latitudeDelta: 360,
  longitudeDelta: 180,
}

// create a component
class Collections extends Component {
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
    this.state = {
      page: 'Grid View',
      places: props.places ? props.places : [],
      loading: false,
      mapRegion: {
        latitude: 23, longitude: 101,
        latitudeDelta: 10.8, longitudeDelta: 30.4
      }
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount() {
    if (!this.state.places.length) {
      if (this.props.type === 'check') {
        this.props.navigator.setTitle({ title: 'Check-Ins' });
        this.getCheckedPlaces();
      } else if (this.props.type === 'like') {
        this.props.navigator.setTitle({ title: 'Hearted' });
        this.getLikedPlaces();
      } else if (this.props.collection) {
        this.props.navigator.setTitle({ title: this.props.collection.name });
        this.getCollectionPlaces();
      } else if (this.props.type === 'bookmark') {
        this.props.navigator.setTitle({ title: 'All' });
        this.getBookmarkedPlaces();
      } else {
        this.props.navigator.setTitle({ title: I18n.t('DRAWER_STORIES') });
      }
    } else {
      this.props.navigator.setTitle({ title: I18n.t('DRAWER_STORIES') });
      this.regionContainingPoints();
    }
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }

  getLikedPlaces() {
    this.setState({ loading: true });
    client.query({
      query: GET_USER_WITH_LIKED_PLACES,
      variables: {
        userId: this.props.userId ? this.props.userId : this.props.user.id,
      }
    }).then(({ data }) => {
      this.state.places = data.User.likePlaces;
      this.regionContainingPoints();
      this.setState({ loading: false });
    }).catch(err => alert(err))
  }
  getCheckedPlaces() {
    this.setState({ loading: true });
    client.query({
      query: GET_CHECKED_PLACES,
      variables: {
        userId: this.props.userId ? this.props.userId : this.props.user.id,
      }
    }).then(({ data }) => {
      this.state.places = data.allPlaces;
      this.regionContainingPoints();
      this.setState({ loading: false });
    }).catch(err => alert(err))
  }
  getCollectionPlaces() {
    this.setState({ loading: true });
    client.query({
      query: GET_COLLECTION_WITH_PLACES,
      variables: {
        id: this.props.collection.id,
        first: 50,
        skip: 0
      }
    }).then(({ data }) => {
      this.state.places = data.Collection.places;
      this.regionContainingPoints();
      this.setState({ loading: false });
    }).catch(err => alert(err))
  }
  getBookmarkedPlaces() {
    this.setState({ loading: true });
    client.query({
      query: GET_COLLECTIONS_WITH_PLACES,
      variables: {
        id: this.props.userId ? this.props.userId : this.props.user.id,
        first: 50,
        skip: 0
      }
    }).then(({ data }) => {
      let places = [];
      data.allCollections.forEach(item => {
        places = [...places, ...item.places];
      });
      this.state.places = places;
      this.regionContainingPoints();
      this.setState({ loading: false });
    }).catch(err => alert(err))
  }
  regionContainingPoints() {
    var minX, maxX, minY, maxY;

    if (this.state.places && this.state.places.length > 0) {
      // init first point
      ((point) => {
        minX = point.locationLat;
        maxX = point.locationLat;
        minY = point.locationLong;
        maxY = point.locationLong;
      })(this.state.places[0]);

      // calculate rect
      this.state.places.map((point) => {
        minX = Math.min(minX, point.locationLat);
        maxX = Math.max(maxX, point.locationLat);
        minY = Math.min(minY, point.locationLong);
        maxY = Math.max(maxY, point.locationLong);
      });

      var midX = (minX + maxX) / 2;
      var midY = (minY + maxY) / 2;
      var midPoint = [midX, midY];

      var deltaX = (maxX - minX);
      var deltaY = (maxY - minY);

      var padding = 0;
      this.state.mapRegion = {
        latitude: midX, longitude: midY,
        latitudeDelta: deltaX + padding, longitudeDelta: deltaY + padding
      };
    }
  }
  _renderTabHeader(text) {
    return (
      <Text name={text} style={[DFonts.Title, styles.TabText]} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>
    )
  }
  onCollectionItem(place) {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      animated: true,
      passProps: {
        place
      }
    })
  }
  onRemovePlace(data) {
    Alert.alert(
      data.item.address,
      'Do you want to remove this place?',
      [
        { text: 'OK', onPress: () => this.deletePlace(data) },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }
  deletePlace(data) {
    let places = clone(this.state.places);
    places.splice(data.index, 1);
    this.props.removePlace({
      variables: {
        id: this.props.collection.id,
        placeIds: places.map((item) => item.id)
      }
    }).then(collections => {
      this.setState({ places });
      this.props.placeUpdated(true);
    }).catch(err => alert(err));
  }
  _renderStoryItem(data, mode) {
    const { item, index } = data;
    if (index % 3 == mode)
      return (
        <TouchableOpacity
          onPress={() => this.onCollectionItem(item)}
          onLongPress={() => this.onRemovePlace(data)}
        >
          <AutoHeightTitledImage
            uri={item.pictureURL ? item.pictureURL[0] : ""}
            title={item.placeName}
            vAlign={'center'}
            radius={8}
            hAlign={'center'}
            titleStyle={styles.storyItemTitle}
            style={{ marginBottom: 10 }}
          />
        </TouchableOpacity>
      )
    return (<View />);
  }
  _keyExtractor = (item, index) => index;

  _renderHeartedView() {
    return (
      <View style={styles.Stories}>
        <View style={styles.subStory}>
          <OptimizedFlatList
            data={this.state.places}
            keyExtractor={this._keyExtractor}
            renderItem={data => this._renderStoryItem(data, 0)}
          />
        </View>

        <View style={styles.subStory}>
          <OptimizedFlatList
            data={this.state.places}
            keyExtractor={this._keyExtractor}
            renderItem={data => this._renderStoryItem(data, 1)}
          />
        </View>
        <View style={styles.subStory}>
          <OptimizedFlatList
            data={this.state.places}
            keyExtractor={this._keyExtractor}
            renderItem={data => this._renderStoryItem(data, 2)}
          />
        </View>
      </View>
    )
  }

  _renderMapView() {
    return (
      <View style={styles.mapView}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.mapRegion}
          clustering={true}
          clusterColor='#41C6F2'
          clusterTextColor='white'
          clusterBorderColor='#fff'
          clusterBorderWidth={0}
        >
          {this.state.places.map((item, index) =>
            <Marker
              key={index}
              coordinate={{ latitude: item.locationLat, longitude: item.locationLong }}
              image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
            >
              {Platform.OS === 'ios' && (
                <Image source={require('@assets/images/map_pin.png')} style={styles.mapmarker} />
              )}
              <Callout style={styles.customView} onPress={() => this.openPlaceProfile(item)}>
                <Text numberOfLines={2} ellipsizeMode={'tail'} style={[DFonts.Regular, { flexWrap: "nowrap", alignSelf: "center" }]}>{item.placeName}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
    )
  }

  openPlaceProfile(place) {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      animated: true,
      passProps: {
        place
      }
    });

  }
  render() {
    /*
    if (!this.props.data.loading) {
      this.setState({ places: this.props.data.Collection.places});
    }*/
    if (this.state.loading)
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#dddddd" />
        </View>
      );

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Tabs selected={this.state.page} style={styles.tabHeader}
            selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })}>
            {this._renderTabHeader('Grid View')}
            {this._renderTabHeader('Map View')}
          </Tabs>
        </View>
        <ScrollView style={styles.CollectionContainer}>
          {
            this.state.page == 'Grid View' ? this._renderHeartedView() : this._renderMapView()
          }
        </ScrollView>
      </View>
    );
  }
}

/*
const ComponentWithQueries = graphql(GET_COLLECTION_WITH_PLACES, {
  options: (props) => ({
    variables: {
      collectionId: props.collection.id,
    }
  })
})
  (Collections);
*/
//make this component available to the app
export default Collections;
