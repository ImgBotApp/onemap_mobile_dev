//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, Image, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import RNPlaces from 'react-native-google-places'
import RNGooglePlaces from 'react-native-google-places'
import Search from '@components/SearchBar';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import SearchResult from '@components/SearchResult'
import { getDeviceWidth, getDeviceHeight } from '@global'
import styles from './styles'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
import { GET_PLACES_FROM_GOOGLEId } from '@graphql/places'
import { client } from '@root/main'

import 'whatwg-fetch'
import LoadingSpinner from '@components/LoadingSpinner'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import Permissions from 'react-native-permissions'
import { Places } from 'google-places-web'
import { PLACES_APIKEY } from '@global/const';
import Toast, { DURATION } from 'react-native-easy-toast'
import axios from 'axios';

Places.apiKey = PLACES_APIKEY;
Places.debug = true;

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.002;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

class SearchPage extends Component {
  watchID;
  constructor(props) {
    super(props)
    this.state = {
      result: false,
      keyword: '',
      isFeaching: false,
      pictureURLS: [],
      loading: false,

      nearByPlaces: [],
      newNearByPlaces: [],
      title: '',
      address: '',
      isSearching: false,
      isSelected: false,
      searched: null,
      nearByPlacesPin: [],
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
      },
      initialMarker: null,
      myPosition: null,
      isCallingAPI: false,
    }
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.id == "bottomTabSelected") {
      /*
      Permissions.check('location').then(response => {
        if (response != 'authorized') {
          Permissions.request('location').then(response => {
            if (response == 'authorized') {
              this.onSearchNearByPlace();
            }
          })
        }
        else this.onSearchNearByPlace();
      })
      */
    }
  }
  componentDidMount() {
    _this = this;
    Permissions.check('location').then(response => {
      if (response != 'authorized') {
        if (Platform.OS == 'android') {

        }
        else {
          Permissions.request('location').then(response => {
            if (response == 'authorized') {
              this.setGeoPositionEvent();
            }
          })
        }
      }
      else this.setGeoPositionEvent();
    })
    //this.setGeoPositionEvent();
  }
  componentWillUnmount() {
    if (this.watchID != null)
      navigator.geolocation.clearWatch(this.watchID);
  }
  componentWillMount() {

  }

  setGeoPositionEvent() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ myPosition: position.coords });
        this.updateMapView();
        console.log("current position:" + position.coords.latitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 0.1 }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("watch position:" + position.coords.latitude);
      this.setState({ myPosition: position.coords });
      this.updateMapView();
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 0.1 });

  }
  updateMapView() {
    var getInitialRegion = {
      latitude: this.state.myPosition.latitude,
      longitude: this.state.myPosition.longitude,
      latitudeDelta: LATTITUDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA,
    }
    var getInitialRegionMaker = {
      latitude: this.state.myPosition.latitude,
      longitude: this.state.myPosition.longitude,
    }
    this.setState({
      initialPosition: getInitialRegion, initialMarker: getInitialRegionMaker,
    })
    this.onSearchNearByPlace();
  }
  async onSearchNearByPlace() {
    if (this.state.isCallingAPI)
      return;
    this.setState({ isCallingAPI: true });
    RNPlaces.getCurrentPlace()
      .then((results) => {
        this.setState({ isCallingAPI: false })
        //this.refs.toast.show('nearby search updated')
        if (!this.state.initialMarker) {
          var getInitialRegion = {
            latitude: results[0].latitude,
            longitude: results[0].longitude,
            latitudeDelta: LATTITUDE_DELTA,
            longitudeDelta: LONGTITUDE_DELTA,
          }
          var getInitialRegionMaker = {
            latitude: results[0].latitude,
            longitude: results[0].longitude,
          }
          this.setState({
            initialPosition: getInitialRegion, initialMarker: getInitialRegionMaker,
            title: results[0].name, address: results[0].address,
          })
        }
        // this.setPinLocation(results);
        var getNearByLocationsPin = [];
        for (var i = 0; i < results.length; i++) {
          if (results[i].latitude && results[i].longitude) {
            var obj = {
              coordinates: {
                latitude: results[i].latitude,
                longitude: results[i].longitude,
              },
              title: results[i].name,
              address: results[i].address,
              placeID: results[i].placeID
            }
            getNearByLocationsPin.push(obj);
          }
        }
        this.setState({
          nearByPlacesPin: getNearByLocationsPin
        })
        results.shift();
        this.setState({ nearByPlaces: results })
      })
      .catch((error) => {
        console.log("error:" + error);
        this.setState({ isCallingAPI: false })
      }
      );
  }
  render() {
    if (this.state.isFeaching)
      this.onCreatePlace();

    let curr_position;
    if (this.state.myPosition)
      curr_position = "lat:" + this.state.myPosition.latitude + " lng:" + this.state.myPosition.longitude;
    return (
      <View style={styles.container}>
        <Search
          ref="search_box"
          backgroundColor={"#f3f3f3"}
          titleCancelColor={"#585958"}
          //onChangeText={this.onShowResult.bind(this)}
          onSearch={this.onShowResult.bind(this)}
          onCancel={this.onDismissResult.bind(this)}
        />
        <View>
          {
            this.state.result == false ?
              (
                <View style={{ width: '100%' }}>
                  <View style={styles.mapView}>
                    <MapView
                      // showsUserLocation={true}
                      provider={PROVIDER_GOOGLE}
                      style={styles.map}
                      initialRegion={this.state.initialPosition}
                      region={this.state.initialPosition}
                      showsCompass={true}
                      loadingEnabled={true}
                      showsBuildings={true}
                    >
                      {this.state.nearByPlacesPin.map((marker, key) => (
                        <Marker
                          key={key}
                          coordinate={marker.coordinates}
                          zIndex={key}
                          image={Platform.OS == 'android' ? require('@assets/images/map_pin_android.png') : null}
                        >
                          {Platform.OS === 'ios' && (
                            <Image source={require('@assets/images/map_pin.png')} style={styles.mapmarker} />
                          )}
                          <Callout style={styles.customView} onPress={() => this.onPlaceProfile(marker.placeID)}>
                            <Text style={{ flexWrap: "nowrap" }}>{marker.title}</Text>
                          </Callout>
                        </Marker>
                      ))}
                      {
                        this.state.myPosition ? (
                          <Marker
                            coordinate={this.state.myPosition}
                            zIndex={this.state.nearByPlacesPin.length + 1000}
                            image={Platform.OS == 'android' ? require('@assets/images/map_position_android.png') : null}
                          >
                            {Platform.OS === 'ios' && (
                              <Image source={require('@assets/images/map_position.png')} style={styles.mapmarker} />
                            )}
                            <Callout style={styles.customView}>
                              <Text style={{ flexWrap: "nowrap" }}>{curr_position}</Text>
                            </Callout>
                          </Marker>
                        ) : null
                      }
                    </MapView>
                  </View>
                  {/* } */}
                  <FlatList
                    keyExtractor={(item, index) => index}
                    style={{ paddingTop: getDeviceHeight(50) }}
                    data={this.state.nearByPlaces}
                    renderItem={({ item }) =>
                      <View>
                        <View style={styles.item}>
                          <Image source={require('@assets/images/marker.png')} style={styles.placeImage} />
                          <View style={styles.infomation}>
                            <View>
                              <TouchableOpacity onPress={() => this.onPlaceProfile(item.placeID)}>
                                <Text style={styles.name}>{item.name}</Text>
                                {this.state.isSelected ?
                                  <Text style={styles.following}>{item.vicinity}</Text>
                                  : <Text style={styles.following}>{item.address}</Text>
                                }
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    }
                  />
                </View>
              )
              :
              (
                <SearchResult keyword={this.state.keyword}
                  coordinate={this.state.initialMarker}
                  onUser={this.onUserItem.bind(this)}
                  onKeywordItem={this.onKeywordItem.bind(this)}
                  onPlace={this.onPlaceProfile.bind(this)} />
              )
          }
        </View>
        {
          this.state.loading ? (<LoadingSpinner />) : null
        }
        <Toast ref="toast" />
      </View>
    );
  }
  onUserItem(userInfo) {
    this.props.navigator.push({
      screen: SCREEN.USERS_PROFILE_PAGE,
      title: I18n.t('USERPROFILE_TITLE'),
      animated: true,
      passProps: {
        userInfo
      }
    })
  }
  onKeywordItem(id) {
    if (!id) return;
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: I18n.t('PLACE_TITLE'),
      animated: true,
      passProps: {
        placeID: id
      }
    })
  }
  onPlaceProfile(placeID) {
    if (!placeID) return;
    var ret_photos;
    this.setState({ loading: true });
    RNPlaces.lookUpPlaceByID(placeID).then((result) => {
      this.setState({ placeInf: result });
      return Places.details({ placeid: placeID });
    }
    ).then((place) => {
      ret_photos = place.photos;
      return client.resetStore().then(() => {
        return client.query({
          query: GET_PLACES_FROM_GOOGLEId,
          variables: {
            sourceId: placeID
          },
        })
      })
    }
      ).then(place => {
        if (!place.data.allPlaces || place.data.allPlaces.length <= 0) {
          this.onFetchGooglePictures(ret_photos ? ret_photos : []);
        } else {
          this.setState({ loading: false });
          this.props.navigator.push({
            screen: SCREEN.PLACE_PROFILE_PAGE,
            title: I18n.t('PLACE_TITLE'),
            animated: true,
            passProps: {
              placeID: place.data.allPlaces[0].id
            }
          })
        }
      }
      ).catch((error) => { this.setState({ loading: false }) });
  }
  async onFetchGooglePictures(ret_photos) {
    let redrictURLS = [];
    await Promise.all(
      ret_photos.map(photo =>
        axios.get("https://maps.googleapis.com/maps/api/place/photo?&maxwidth=1920&photoreference=" + photo.photo_reference + "&key=" + Places.apiKey)
          .then(function (response) {
            redrictURLS.push(response.config.url);
          })
          .catch(function (error) {
            this.setState({ loading: false })
          })
      )
    ).then(() => {
      this.setState({ pictureURLS: redrictURLS, isFeaching: true });
    }, err => { this.setState({ loading: false }); })
  }
  onCreatePlace() {
    this.props.createPlace({
      variables: {
        createdById: this.props.user.id,
        source: 'GOOGLE_PLACE',// # GOOGLE_PLACE or ONEMAP
        status: 'ENABLE',// # ENABLE or DISABLE
        createSide: 'FRONTEND',// # FRONTEND or BACKEND
        description: '',
        sourceId: this.state.placeInf.placeID,// # GOOGLE place id if source is GOOGLE_PLACE
        placeName: this.state.placeInf.name,
        locationLat: this.state.placeInf.latitude,
        locationLong: this.state.placeInf.longitude,
        //addressAreaDistrict: String
        addressCityTown: this.state.placeInf.addressComponents ? this.state.placeInf.addressComponents.administrative_area_level_2 : '',
        //addressStateProvince: String
        addressCountry: this.state.placeInf.addressComponents ? this.state.placeInf.addressComponents.country : '',
        addressPostalCode: this.state.placeInf.addressComponents ? this.state.placeInf.addressComponents.postal_code : '',
        //addressStreet: String
        address: this.state.placeInf.address,
        phoneNumber: this.state.placeInf.phoneNumber || '',
        website: this.state.placeInf.website || '',
        facebook: this.state.placeInf.facebook || '',
        //line: String
        //openingHrs: String
        pictureURL: this.state.pictureURLS,// # leave blank [] if no picture
        //placeOwner: String
      },
    }).then(result => {
      this.setState({ isFeaching: false });
      this.setState({ loading: false });
      this.props.navigator.push({
        screen: SCREEN.PLACE_PROFILE_PAGE,
        title: I18n.t('PLACE_TITLE'),
        animated: true,
        passProps: {
          placeID: result.data.createPlace.id
        }
      })
    }).catch((error) => {
      this.setState({ loading: false })
    });
  }
  onShowResult(val) {
    this.setState({
      keyword: val
    })
    if (val.length == 0) return this.setState({ result: false })
    else return this.setState({ result: true })
    this.forceUpdate()
  }
  onDismissResult() {
    this.setState({
      result: false
    })
    this.forceUpdate()
  }
}


//make this component available to the app
export default SearchPage;
