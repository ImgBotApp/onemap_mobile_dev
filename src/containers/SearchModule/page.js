//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import Search from 'react-native-search-box';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import SearchResult from '@components/SearchResult'
import { getDeviceWidth } from '@global'
import RNGooglePlaces from 'react-native-google-places';
import styles from './styles'
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
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: [],
      result: false,
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
      },
      initialMarker: {
        latitude: 0,
        longitude: 0
      }
    }
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
    console.log(this.props);
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
                  data={stories[0].items}
                  renderItem={({ item }) => { return this._renderStoryItem(item) }}
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList
                  data={stories[1].items}
                  renderItem={({ item }) => { return this._renderStoryItem(item) }}
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList
                  data={stories[2].items}
                  renderItem={({ item }) => { return this._renderStoryItem(item) }}
                />
              </View>
            </View>
          </ScrollView>
          {this.state.result == true ? <SearchResult searchData={this.state.searchData} sendProps={this.props}/> : null}
        </View>
      </View>
    );
  }
  onShowResult(val) {
    if (val.length == 0) return this.setState({ result: false })
    else {
      // alert(val);
      console.log(val);
      RNGooglePlaces.getAutocompletePredictions(val, {
        // type: 'establishments',
        // latitude: 53.544389,
        // longitude: -113.490927,
        // radius: 10
      })
        .then((place) => {
          console.log(place);
          this.setState({searchData:place , result: true })
        })
        .catch(error => console.log(error.message));
    }
  }
  onDismissResult() {
    this.setState({
      result: false
    })
  }
}


//make this component available to the app
export default SearchPage;
