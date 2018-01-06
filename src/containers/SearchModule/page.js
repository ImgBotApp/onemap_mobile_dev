//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,FlatList } from 'react-native';
import RNPlaces from 'react-native-google-places'
import Search from 'react-native-search-box';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import SearchResult from '@components/SearchResult'
import {getDeviceWidth} from '@global'
import styles from './styles'
import * as SCREEN from '@global/screenName'
import I18n from '@language'
// create a component
const stories = [
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
    ]
  },
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    ]
  },
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
    ]
  }
]
class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: false,
      keyword: ''
    }
    console.log(props.user)
  }
  _renderStoryItem (item) {
    return (
      <View>
        <AutoHeightTitledImage uri={item.uri}
          width={getDeviceWidth(400)}
          title={'abc'} vAlign={'center'} hAlign={'left'} titleStyle={styles.storyItemTitle}
          style={{marginBottom: 10}}
        />
        {/* <AutoHeightImage imageURL={item.uri} width={getDeviceWidth(343)} style={{marginBottom: 10}} /> */}
      </View>
    )
  }
  render() {
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
          <ScrollView style={{width: '100%'}}>
            <View style={styles.StoryContainer}>
              <View style={styles.StoryList}>
                <FlatList 
                  data={stories[0].items}
                  renderItem={({item}) => { return this._renderStoryItem(item)} }
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList 
                  data={stories[1].items}
                  renderItem={({item}) => { return this._renderStoryItem(item)} }
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList 
                  data={stories[2].items}
                  renderItem={({item}) => { return this._renderStoryItem(item)} }
                />
              </View>
            </View>
          </ScrollView>
          { this.state.result == true ? <SearchResult keyword={this.state.keyword} onPlace={this.onPlaceProfile.bind(this)}/> : null }
        </View>
      </View>
    );
  }
  onPlaceProfile(placeID) {
    RNPlaces.lookUpPlaceByID(placeID).then((result) => 
      this.props.createPlace({
        variables: {
        description: '', 
        sourceId: placeID, 
        placeName: result.name, 
        locationLat: result.latitude, 
        locationLong: result.longitude, 
        address: result.address, 
        phoneNumber: result.phoneNumber || '', 
        website: result.website || '', 
        facebook: result.facebook || '',
        addressCountry: result.addressComponents ? result.addressComponents.country : '',
        addressPostalCode: result.addressComponents ? result.addressComponents.postal_code : '',
        addressStateProvince: result.addressComponents ? result.addressComponents.administrative_area_level_1 : '',
        addressCityTown: result.addressComponents ? result.addressComponents.administrative_area_level_2 : ''
      }
    })).then((result) => {
      // console.log(result)
      this.props.navigator.push({
        screen: SCREEN.PLACE_PROFILE_PAGE,
        title: I18n.t('PLACE_TITLE'),
        animated: true,
        passProps: {
          placeID: result.data.createPlace.id
        }
      })
    }).catch((error) => console.log(error));
  }
  onShowResult(val) {
    this.setState({
      keyword: val
    })
    if ( val.length == 0) return this.setState({result: false})
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
