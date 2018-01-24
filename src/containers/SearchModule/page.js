//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,Dimensions,Image,TouchableOpacity } from 'react-native';
import RNPlaces from 'react-native-google-places'
import RNGooglePlaces from 'react-native-google-places'
import Search from '@components/SearchBar';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import SearchResult from '@components/SearchResult'
import { getDeviceWidth,getDeviceHeight } from '@global'
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

Places.apiKey = 'AIzaSyDs4M5G0eckEL14WLcCwuJ1S3LuNBAB5FE';
Places.debug = true;

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.002;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: false,
      keyword: '',
      isFeaching:false,
      pictureURLS:[],
      loading:false,

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
      initialMarker: {
        latitude: 0,
        longitude: 0,
      },
    }
    console.log(props.user)
  }
  componentDidMount() {
    _this = this;
  }
  componentWillMount() {
    Permissions.check('location').then(response => {
      if(response != 'authorized')
      {
        Permissions.request('location').then(response => {
          if(response == 'authorized')
          {
            this.onSearchNearByPlace();
          }
        })
      }
      else this.onSearchNearByPlace();
    })
  }
  onSearchNearByPlace(){
    RNGooglePlaces.getCurrentPlace()
            .then((results) => {
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
              // this.setPinLocation(results);
              var getNearByLocationsPin = [];
              for (var i = 0; i < results.length; i++) {
                if(results[i].latitude && results[i].longitude)
                {
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
            .catch((error) => alert(error.message));
  }
  render() {
    if(this.state.isFeaching)
      this.onCreatePlace();
    return (
      <View style={styles.container}>
        <Search
          ref="search_box"
          backgroundColor={"#f3f3f3"}
          titleCancelColor={"#585958"}
          onChangeText={this.onShowResult.bind(this)}
          onSearch={this.onDismissResult.bind(this)}
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
                  key == 0 ?
                    <Marker
                      key={key}
                      image={require('@assets/images/greenPin.png')}
                      coordinate={this.state.initialMarker}
                      zIndex = {this.state.nearByPlacesPin.length+1000}
                    >
                      <Callout style={styles.customView} onPress={() => this.onPlaceProfile(marker.placeID)}>
                        <Text style={{ flexWrap: "nowrap" }}>{marker.title}</Text>
                      </Callout>
                    </Marker>
                    :
                    <Marker
                      key={key} 
                      image={require('@assets/images/marker.png')}
                      coordinate={marker.coordinates}
                      zIndex = {key}
                    >
                      <Callout style={styles.customView} onPress={() => this.onPlaceProfile(marker.placeID)}>
                        <Text style={{ flexWrap: "nowrap" }}>{marker.title}</Text>
                      </Callout>
                    </Marker>
                ))}

              </MapView>
            </View>
            {/* } */}
            <FlatList
              style = {{paddingTop:getDeviceHeight(50)}}
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
              onUser={this.onUserItem.bind(this)}
              onKeywordItem={this.onKeywordItem.bind(this)}
              onPlace={this.onPlaceProfile.bind(this)} />
          )
        }
        </View>
        {
          this.state.loading ? (<LoadingSpinner />) : null
        }
      </View>
    );
  }
  onUserItem(id) {
    this.props.navigator.push({
      screen: SCREEN.USERS_PROFILE_PAGE,
      title: I18n.t('USERPROFILE_TITLE'),
      animated: true
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
    if(!placeID) return;
    var ret_photos;
    this.setState({loading:true});
    RNPlaces.lookUpPlaceByID(placeID).then((result) =>
      {
        this.setState({placeInf:result});
        return Places.details({ placeid: placeID });
      }
    ).then((place)=>{
        ret_photos=  place.photos;
        return client.resetStore().then(()=>{
            return client.query({
              query: GET_PLACES_FROM_GOOGLEId,
              variables: {
                sourceId: placeID
              },
            })
        })
      }
    ).then( place =>
      {
        if ( !place.data.allPlaces || place.data.allPlaces.length <= 0 ) {
          this.onFetchGooglePictures(ret_photos?ret_photos:[]);
        } else {
          this.setState({loading:false});
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
    ).catch((error) => this.setState({loading:false}));
  }
  async onFetchGooglePictures(ret_photos){
    let redrictURLS = [];
    await Promise.all(
      ret_photos.map(photo => fetch("https://maps.googleapis.com/maps/api/place/photo?&maxwidth=1920&photoreference="+photo.photo_reference+"&key="+Places.apiKey)
        .then(response => {
          redrictURLS.push(response.url);
          Promise.resolve();
        })
        .catch(err => this.setState({loading:false}))
      )
    ).then(() => {
      this.setState({pictureURLS:redrictURLS,isFeaching:true});
    }, err => { this.setState({loading:false}); })
  }
  async onCreatePlace(){
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
        this.setState({isFeaching:false});
        this.setState({loading:false});
        this.props.navigator.push({
          screen: SCREEN.PLACE_PROFILE_PAGE,
          title: I18n.t('PLACE_TITLE'),
          animated: true,
          passProps: {
            place: result.data.createPlace
          }
        })
      }).catch((error) => this.setState({loading:false}));
  }
  onShowResult(val) {
    this.setState({
      keyword: val
    })
    if (val.length == 0) return this.setState({ result: false })
    else return this.setState({ result: true })
  }
  onDismissResult() {
    this.setState({
      result: false
    })
  }
}


//make this component available to the app
export default SearchPage;
