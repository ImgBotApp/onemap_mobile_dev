//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import RNPlaces from 'react-native-google-places'
import Search from 'react-native-search-box';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import SearchResult from '@components/SearchResult'
import { getDeviceWidth } from '@global'
import styles from './styles'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
import { GET_PLACES_FROM_GOOGLEId } from '@graphql/places'
import { client } from '@root/main'

import 'whatwg-fetch'
import LoadingSpinner from '@components/LoadingSpinner'

import { Places } from 'google-places-web'
Places.apiKey = 'AIzaSyDs4M5G0eckEL14WLcCwuJ1S3LuNBAB5FE';
Places.debug = true;

// create a component
const stories = [
  {
    items: [
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg' },
    ]
  },
  {
    items: [
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg' },
    ]
  },
  {
    items: [
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg' },
      { uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg' },
    ]
  }
]
class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: false,
      keyword: '',
      isFeaching:false,
      pictureURLS:[],
      loading:false
    }
    console.log(props.user)
  }
  _renderStoryItem(item) {
    return (
      <View>
        <AutoHeightTitledImage uri={item.uri}
          width={getDeviceWidth(400)}
          title={'abc'} vAlign={'center'} hAlign={'left'} titleStyle={styles.storyItemTitle}
          style={{ marginBottom: 10 }}
        />
        {/* <AutoHeightImage imageURL={item.uri} width={getDeviceWidth(343)} style={{marginBottom: 10}} /> */}
      </View>
    )
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
          <ScrollView style={{ width: '100%' }}>
            <View style={styles.StoryContainer}>
              <View style={styles.StoryList}>
                <FlatList
                  keyExtractor={(item, index) => index}
                  data={stories[0].items}
                  renderItem={({ item }) => { return this._renderStoryItem(item) }}
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList
                  keyExtractor={(item, index) => index}
                  data={stories[1].items}
                  renderItem={({ item }) => { return this._renderStoryItem(item) }}
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList
                  keyExtractor={(item, index) => index}
                  data={stories[2].items}
                  renderItem={({ item }) => { return this._renderStoryItem(item) }}
                />
              </View>
            </View>
          </ScrollView>
          {this.state.result == true ? <SearchResult keyword={this.state.keyword}
            onUser={this.onUserItem.bind(this)}
            onKeywordItem={this.onKeywordItem.bind(this)}
            onPlace={this.onPlaceProfile.bind(this)} /> : null}
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
          return response.json();
        })
        .then( json => json.error ? reject(json) : resolve(json) )
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
