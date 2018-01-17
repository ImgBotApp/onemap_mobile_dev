//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Tabs from 'react-native-tabs';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import { PROVIDER_GOOGLE } from 'react-native-maps';

import MapView from 'react-native-map-clustering';
import { Marker, Callout } from 'react-native-maps';

import styles from './styles'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
import * as SCREEN from '../../../global/screenName'
import { clone } from '@global';
import I18n from '@language'

import { client } from '@root/main';
import { graphql } from "react-apollo";
import { GET_COLLECTION_WITH_PLACES } from '@graphql/collections';
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
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor(props) {
    super(props)
    this.state = {
      page: 'Hearted View',
      places: [],
      loading: true
    }
    this.props.navigator.setTitle({ title: props.collection ? props.collection.name : "Collection" });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount() {
    this.getCollectionPlaces();
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }

  getCollectionPlaces() {
    client.query({
      query: GET_COLLECTION_WITH_PLACES,
      variables: {
        id: this.props.collection.id,
        first: 50,
        skip: 0
      }
    }).then(collections => {
      this.setState({ places: collections.data.Collection.places, loading: false });
      client.resetStore();
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
      title: I18n.t('PLACE_TITLE'),
      animated: true,
      passProps: {
        place: data,
        // onPlaceUpdate: place => this.onPlaceUpdate(place, index),
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
    })
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
            uri={item.pictureURL ? item.pictureURL[0] : null}
            width={getDeviceWidth(343)}
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
          <FlatList
            data={this.state.places}
            keyExtractor={this._keyExtractor}
            renderItem={data => this._renderStoryItem(data, 0)}
          />
        </View>

        <View style={styles.subStory}>
          <FlatList
            data={this.state.places}
            keyExtractor={this._keyExtractor}
            renderItem={data => this._renderStoryItem(data, 1)}
          />
        </View>
        <View style={styles.subStory}>
          <FlatList
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
              image={require('@assets/images/marker.png')}
              coordinate={{ latitude: item.locationLat, longitude: item.locationLong }}
            >
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
    /*
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: I18n.t('PLACE_TITLE'),
      animated: true,
      passProps: {
        placeID: id
      }
    });
    */
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
            {this._renderTabHeader('Hearted View')}
            {this._renderTabHeader('Map View')}
          </Tabs>
        </View>
        <ScrollView style={styles.CollectionContainer}>
          {
            this.state.page == 'Hearted View' ? this._renderHeartedView() : this._renderMapView()
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

