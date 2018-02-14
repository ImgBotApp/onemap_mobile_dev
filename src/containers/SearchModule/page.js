//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, Image, TouchableOpacity, Platform,PermissionsAndroid } from 'react-native';
import RNPlaces from 'react-native-google-places'
import RNGooglePlaces from 'react-native-google-places'
import Search from '@components/SearchBar';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import SearchResult from '@components/SearchResult'
import { getDeviceWidth, getDeviceHeight } from '@global'
import styles from './styles'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
import DFonts from '@theme/fonts';
import { GET_PLACES_FROM_GOOGLEId } from '@graphql/places'
import { client } from '@root/main'

import 'whatwg-fetch'
import LoadingSpinner from '@components/LoadingSpinner'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import Permissions from 'react-native-permissions'

import Places from 'google-places-web'

import { PLACES_APIKEY,TABBAR_HEIGHT } from '@global/const';
import Toast, { DURATION } from 'react-native-easy-toast'
import axios from 'axios';

Places.apiKey = PLACES_APIKEY;
Places.debug = true;

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.01;
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
      title: '',
      address: '',
      isSearching: false,
      isSelected: false,
      searched: null,
      nearByPlacesPin: [],
      initialPosition: null,
      /*
      {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
      },
      */
      initialMarker: null,
      myPosition: {},
      isCallingAPI: false,
      placeInf: null,
    }
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.id == "bottomTabSelected" && event.selectedTabIndex == 1) {
      /*
      if (Platform.OS == 'android')
        this.requestLocationPermissionForAndroid();
      else {
        this.requestLocationPermissionForIOS();
      }
      */
    }
  }
  componentDidMount() {
    _this = this;
    Permissions.check('location').then(response => {
      if (response == 'authorized') {
        this.setGeoPositionEvent();
      }
    })
    //this.setGeoPositionEvent();
  }
  async requestLocationPermissionForIOS() {
    try {
      Permissions.check('location').then(response => {
        if (response != 'authorized') {
            console.log("request the Location")
            Permissions.request('location').then(response => {
              if (response == 'authorized') {
                console.log("You can get the Location")
                this.setGeoPositionEvent();
              }else {
                //Permissions.openSettings();
              }
            })
        }else this.setGeoPositionEvent();
      })
    } catch (err) {
      console.warn(err)
    }
  }
  async requestLocationPermissionForAndroid() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can get the Location")
        this.setGeoPositionEvent();
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
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
        if (position.coords) {
          console.log("current position:" + position.coords.latitude);
          this.setState({ myPosition: position.coords });
          this.updateMapView();
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 0.1 }
    );

    if(!this.watchID)
    {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        if (position.coords) {
          console.log("watch position:" + position.coords.latitude);
          this.setState({ myPosition: position.coords });
          this.updateMapView();
        }
      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 0.1 });
    }
  }
  updateMapView() {
    var getInitialRegion = {
      latitude: this.state.myPosition.latitude,
      longitude: this.state.myPosition.longitude,
      latitudeDelta: this.initialPosition?this.initialPosition.latitudeDelta:LATTITUDE_DELTA,
      longitudeDelta: this.initialPosition?this.initialPosition.longitudeDelta:LONGTITUDE_DELTA,
    }
    var getInitialRegionMaker = {
      latitude: this.state.myPosition.latitude,
      longitude: this.state.myPosition.longitude,
    }
    if(!this.state.initialPosition)
      this.setState({ initialPosition: getInitialRegion });
    this.setState({ initialMarker: getInitialRegionMaker });
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

        var maxDiff_lat = 0, maxDiff_lng = 0;
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
            maxDiff_lat = Math.max(maxDiff_lat, Math.abs(this.state.myPosition.latitude - results[i].latitude));
            maxDiff_lng = Math.max(maxDiff_lng, Math.abs(this.state.myPosition.longitude - results[i].longitude));
          }
          getNearByLocationsPin.push(obj);
          maxDiff_lat = Math.max(maxDiff_lat, Math.abs(this.state.myPosition.latitude - results[i].latitude));
          maxDiff_lng = Math.max(maxDiff_lng, Math.abs(this.state.myPosition.longitude - results[i].longitude));
        }

        var getInitialRegion = {
          latitude: this.state.myPosition.latitude ? this.state.myPosition.latitude : results[0].latitude,
          longitude: this.state.myPosition.longitude ? this.state.myPosition.longitude : results[0].longitude,
          latitudeDelta: maxDiff_lat <= 0 ? LATTITUDE_DELTA : maxDiff_lat,
          longitudeDelta: maxDiff_lng <= 0 ? LONGTITUDE_DELTA : maxDiff_lng,
        }
        var getInitialRegionMaker = {
          latitude: results[0].latitude,
          longitude: results[0].longitude,
        }
        this.setState({
          initialPosition: getInitialRegion, initialMarker: getInitialRegionMaker,
          title: results[0].name, address: results[0].address,
        })
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
          onChangeText={this.onAutoShowResult.bind(this)}
          onSearch={this.onShowResult.bind(this)}
          onCancel={this.onDismissResult.bind(this)}
        />
        <View>
          {
            this.state.result == false ?
              (
                <View style={{ width: '100%',height:'100%',paddingBottom:TABBAR_HEIGHT }}>
                  <View style={[styles.mapView,{flex:0.75}]}>
                    <View style={styles.mapWrapper}>
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
                            image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
                          >
                            {Platform.OS === 'ios' && (
                              <Image source={require('@assets/images/map_pin.png')} style={styles.mapmarker} />
                            )}
                            <Callout style={styles.customView} onPress={() => this.onPlaceProfile(marker.placeID)}>
                              <Text style={[DFonts.Regular, { flexWrap: "nowrap" }]}>{marker.title}</Text>
                            </Callout>
                          </Marker>
                        ))}
                        {
                          this.state.myPosition.latitude ? (
                            <Marker
                              coordinate={this.state.myPosition}
                              zIndex={this.state.nearByPlacesPin.length + 1000}
                              image={Platform.OS == 'android' ? require('@assets/images/map_position.png') : null}
                            >
                              {Platform.OS === 'ios' && (
                                <Image source={require('@assets/images/map_position.png')} style={styles.mapmarker} />
                              )}
                              <Callout style={styles.customView}>
                                <Text style={[DFonts.Regular, { flexWrap: "nowrap" }]}>{curr_position}</Text>
                              </Callout>
                            </Marker>
                          ) : null
                        }
                      </MapView>
                    </View>
                  </View>
                  <FlatList
                    keyExtractor={(item, index) => index}
                    style={{ paddingTop: getDeviceHeight(50),flex:0.25}}
                    data={this.state.nearByPlaces}
                    renderItem={({ item }) =>
                      <View>
                        <View style={styles.item}>
                          <Image source={require('@assets/images/marker.png')} style={styles.placeImage} />
                          <View style={styles.infomation}>
                            <View>
                              <TouchableOpacity onPress={() => this.onPlaceProfile(item.placeID)}>
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.name]}>{item.name}</Text>
                                {this.state.isSelected ?
                                  <Text numberOfLines={2} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.following]}>{item.vicinity}</Text>
                                  : <Text numberOfLines={2} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.following]}>{item.address}</Text>
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
                <SearchResult
                  userId={this.props.user.id}
                  keyword={this.state.keyword}
                  isAuto={this.state.isAuto}
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
    RNGooglePlaces.lookUpPlaceByID(placeID).then((result) => {
      this.setState({ placeInf: result });
      return Places.details({ placeid: placeID });
    }
    ).then((place) => {
      ret_photos = place.photos;
      this.setState({ placeInf: { ...this.state.placeInf, ...place } });

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
      ret_photos.map(photo =>{
        const url = "https://maps.googleapis.com/maps/api/place/photo?&maxwidth=1920&photoreference=" + photo.photo_reference + "&key=" + PLACES_APIKEY;
        if(Platform.OS == 'android')
        {
          return axios.get(url)
            .then(function (response) {
              redrictURLS.push(response.request.responseURL);
            })
            .catch(function (error) {
              this.setState({ loading: false })
            })
        }else{
          return fetch(url)
            .then(function (response) {
              redrictURLS.push(response.url);
            })
            .catch(function (error) {
              this.setState({ loading: false })
            })
        }
      })
    ).then(() => {
      this.setState({ pictureURLS: redrictURLS, isFeaching: true });
    }, err => { this.setState({ loading: false }); })
  }
  onCreatePlace() {
    if (!this.state.placeInf || !this.state.placeInf.address_components)
      return;
    let pCode = '';
    let cityTown = '';
    let country = '';
    let street = '';
    let sublocality = '';
    let areaDistrict = '';

    this.state.placeInf.address_components.forEach(item => {
      if (item.types) {
        item.types.forEach(
          typeItem => {
            switch (typeItem) {
              case 'postal_code': {
                pCode = item.long_name;
                break;
              }
              case 'locality': {
                cityTown = item.long_name;
                break;
              }
              case 'country': {
                country = item.long_name;
                break;
              }
              case 'route': {
                street = item.long_name;
                break;
              }
              case 'sublocality': {
                sublocality = item.long_name;
                break;
              }
              case 'administrative_area_level_1': {
                areaDistrict = item.long_name;
                break;
              }
              default: {
                break;
              }
            }
          }
        );
      }
    });
    this.props.createPlace({
      variables: {
        createdById: this.props.user.id,
        source: 'GOOGLE_PLACE',// # GOOGLE_PLACE or ONEMAP
        status: 'ENABLE',// # ENABLE or DISABLE
        createSide: 'FRONTEND',// # FRONTEND or BACKEND
        description: '',
        sourceId: this.state.placeInf.place_id,// # GOOGLE place id if source is GOOGLE_PLACE
        placeName: this.state.placeInf.name,
        locationLat: this.state.placeInf.geometry.location.lat,
        locationLong: this.state.placeInf.geometry.location.lng,
        addressAreaDistrict: areaDistrict,
        addressCityTown: cityTown,
        addressStateProvince: sublocality,
        addressCountry: country,
        addressPostalCode: pCode,
        addressStreet: street,
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
    if(this.state.loading)
      return;
    this.setState({
      keyword: val,
      isAuto: false
    })
    //if (val.length == 0) return this.setState({ result: false })
    //else return this.setState({ result: true })
    this.forceUpdate()
  }
  onAutoShowResult(val){
    if(this.state.loading)
      return;
    this.setState({
      keyword: val,
      isAuto: true
    })
    //if (val.length == 0) return this.setState({ result: false })
    //else return this.setState({ result: true })
    if (val.length > 0) {
      this.setState({ result: true })
      this.forceUpdate()
    }
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
