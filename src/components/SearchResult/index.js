//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Tabs from 'react-native-tabs';
import CircleImage from '@components/CircleImage'

import styles from './styles'
import { getDeviceHeight, getDeviceWidth } from '@global'
import RNGooglePlaces from 'react-native-google-places'

import { client } from '@root/main'
import { GET_FILTER_KEYWORDS } from '@graphql/keywords'
import { FILER_USERS } from '@graphql/users'

import { Places } from 'google-places-web'
import { PLACES_APIKEY } from '@global/const';

Places.apiKey = PLACES_APIKEY;
Places.debug = true;

// create a component
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Places',
      places: [],
      keywords: [],
      users: [],
      loading:false,
      prevQuery:null
    };
  }
  componentWillMount() {
    if (this.props.keyword)
      this.onTextSearchPlace();
  }
  componentWillReceiveProps(nextProps) {
    this.onTextSearchPlace();
  }
  onTextSearchPlace() {
    if(this.props.keyword == this.state.prevQuery)
      return;
    this.setState({loading:true});
    const radius = 50000;
    const language = 'en';
    const query = this.props.keyword.replace(/\s/g, "+");

    if(this.props.coordinate == null) return;
    const placeTextSearchURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+this.props.keyword+"&location="+this.props.coordinate.latitude+","+this.props.coordinate.longitude+"&radius="+radius+"&key="+PLACES_APIKEY;

    fetch(placeTextSearchURL, { 
      method: 'GET',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    })
    .then((response) => response.json())
    .then((responseData) =>
    {
      //set your data here
      let query = this.props.keyword;
      this.setState({prevQuery:query});

      this.setState({loading:false})
      if(responseData.results)
        this.setState({
          places: responseData.results
        })
    })
    .catch((error) => {
      this.setState({loading:false})
    });
    

    client.query({
      query: GET_FILTER_KEYWORDS,
      variables: {
        keyword: this.props.keyword
      }
    }).then((users) => {
      this.setState({
        keywords: users.data.allKeywords
      })
    })
    client.query({
      query: FILER_USERS,
      variables: {
        keyword: this.props.keyword
      }
    }).then((users) => {
      this.setState({
        users: users.data.allUsers
      })
    })
  }
  _renderTabHeader(text) {
    return (
      <Text name={text} style={styles.TabText} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>
    )
  }

  _onUserItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.onUser(item)} >
        <View style={styles.item}>
          <CircleImage style={styles.profileImage} uri={item.photoURL} radius={getDeviceWidth(70)} />
          <View style={styles.infomation}>
            <Text style={styles.name}>{item.displayName}</Text>
            <Text style={styles.following}>{item.username}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _onPlaceItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.onPlace(item.place_id)}>
        <View style={styles.item}>
          <Image source={require('@assets/images/marker.png')} style={styles.placeImage} />
          <View style={styles.infomation}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.following}>{item.formatted_address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  _onCampaignItem(item) {
    return (
      <View style={styles.item}>
        <Image source={require('@assets/images/bookmarker.png')} style={styles.placeImage} />
        <View style={styles.infomation}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.following}>{item.following ? 'Follower' : null}</Text>
        </View>
      </View>
    )
  }
  _onKeywordItem(item) {
    const placeId = item.places.length ? item.places[0].id : '';
    return (
      <TouchableOpacity onPress={() => this.props.onKeywordItem(placeId)}>
        <View style={styles.item}>
          <Image source={require('@assets/images/bookmarker.png')} style={styles.placeImage} />
          <View style={styles.infomation}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.following}>{item.following ? 'Follower' : null}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  _onRenderItem(item) {
    if(item == null)return;
    switch (item.type) {
      case 'user':
        return this._onUserItem(item)
      case 'place':
        return this._onPlaceItem(item)
      case 'campaign':
        return this._onCampaignItem(item)
    }
  }
  //this.state.places.sort(this.compareValues('name', 'asc')
  compareValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) ||
        !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ?
          (comparison * -1) : comparison
      );
    };
  }
  _renderPlaces() {
    return (
      <FlatList
        keyExtractor={(item, index) => index}
        style={styles.scrollView}
        data={this.state.places}
        renderItem={({ item }) => this._onPlaceItem(item)}
      />

    )
  }
  _renderKeywords() {
    return (

      <FlatList
        keyExtractor={(item, index) => index}
        style={styles.scrollView}
        data={this.state.keywords}
        renderItem={({ item }) => this._onKeywordItem(item)}
      />

    )
  }
  _renderUsers() {
    return (

      <FlatList
        keyExtractor={(item, index) => index}
        style={styles.scrollView}
        data={this.state.users}
        renderItem={({ item }) => this._onUserItem(item)}
      />

    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Tabs selected={this.state.page} style={styles.tabHeader}
            selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })}>
            {this._renderTabHeader('Places')}
            {this._renderTabHeader('People')}
            {this._renderTabHeader('Keywords')}
          </Tabs>
        </View>
        <View style={styles.tabbody}>
          {
            this.state.loading?(<ActivityIndicator style={{marginTop:10}} size="small" color="#aaa" />):null
          }
          {
            this.state.page == 'Places' ? this._renderPlaces() : null
          }
          {
            this.state.page == 'Keywords' ? this._renderKeywords() : null
          }
          {
            this.state.page == 'People' ? this._renderUsers() : null
          }
        </View>
      </View>
    );
  }
}


//make this component available to the app
export default SearchResult;