//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image, Platform } from 'react-native';
import Tabs from 'react-native-tabs';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import MapView from 'react-native-map-clustering';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR } from '@theme/colors';
import * as SCREEN from '@global/screenName'
import { clone } from '@global';
import I18n from '@language'
import styles from './styles'

import { client } from '@root/main';
import { graphql } from "react-apollo";
import { GET_COLLECTION_WITH_PLACES, GET_COLLECTIONS_WITH_PLACES } from '@graphql/collections';
import { GET_USER_WITH_CHECKED_PLACES, GET_USER_WITH_LIKED_PLACES } from '@graphql/userprofile'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

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
      loading: false
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
      }
    } else {
      this.props.navigator.setTitle({ title: I18n.t('DRAWER_STORIES') });
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
      this.setState({ places: data.User.likePlaces, loading: false });
    }).catch(err => alert(err))
  }
  getCheckedPlaces() {
    this.setState({ loading: true });
    client.query({
      query: GET_USER_WITH_CHECKED_PLACES,
      variables: {
        userId: this.props.userId ? this.props.userId : this.props.user.id,
      }
    }).then(({ data }) => {
      this.setState({ places: data.User.checkedIn, loading: false });
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
      this.setState({ places: data.Collection.places, loading: false });
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
      this.setState({ places, loading: false });
    }).catch(err => alert(err))
  }

  _renderTabHeader(text) {
    return (
      <Text name={text} style={styles.TabText} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>
    )
  }
  onCollectionItem(data) {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      animated: true,
      passProps: {
        place: data
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
            width={getDeviceWidth(375)}
            title={item.address}
            vAlign={'center'}
            radius={8}
            hAlign={'left'}
            titleStyle={styles.storyItemTitle}
            style={{ marginBottom: 10 }}
          />
        </TouchableOpacity>
      )
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
          region={{
            latitude: 23, longitude: 101,
            latitudeDelta: 10.8, longitudeDelta: 30.4
          }}
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
              <Callout style={styles.customView} onPress={() => this.openPlaceProfile(item.id)}>
                <Text style={{ flexWrap: "nowrap" }}>{item.address}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
    )
  }

  openPlaceProfile(id) {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      animated: true,
      passProps: {
        placeID: id
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
