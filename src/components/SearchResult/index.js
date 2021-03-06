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
import { PLACES_APIKEY } from '@global/const';
import DFonts from '@theme/fonts';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Places',
      places: [],
      keywords: [],
      users: [],
      loading: false,
      prevQuery: null,
      forceRefresh: false,
      isAutoComplete:false,
      placeSearchURL:'',
      nextToken:null
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
    let queryWords = this.props.keyword;

    if (this.state.loading)
      return;

    this.setState({ loading: true });

    if ((this.props.isAuto && this.state.page == 'Places' && this.state.prevQuery != queryWords) || this.state.forceRefresh) {
      this.state.prevQuery=queryWords; 
      this.state.forceRefresh = false;
      const radius = 10000;
      const language = 'en';
      const query = queryWords.replace(/\s/g, "+");

      if (this.props.coordinate == null) return;

      this.state.isAutoComplete = query.length == 1 ? true:false;
      
      let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=";
      if(!this.state.isAutoComplete)
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";

      const fetchURL = url + query + "&location=" + this.props.coordinate.latitude + "," + this.props.coordinate.longitude + "&radius=" + radius + "&key=" + PLACES_APIKEY;
      this.state.placeSearchURL = fetchURL;

      fetch(fetchURL, {
        method: 'GET',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      })
        .then((response) => response.json())
        .then((responseData) => {
          let placeData = [];
          this.setState({ loading: false })
          if(this.state.isAutoComplete)
          {
            if (responseData.predictions)
            {
              placeData = responseData.predictions.map(item => {
                return ({place_id:item.place_id,title:item.structured_formatting.main_text,subtitle:item.structured_formatting.secondary_text});
              });
            }
          }
          else{
            if(responseData.results)
            {
              placeData = responseData.results.map(item => {
                return ({place_id:item.place_id,title:item.name,subtitle:item.formatted_address});
              });
            }
          }
          this.state.nextToken = responseData.next_page_token?responseData.next_page_token:null;
          this.setState({ autoplaces: placeData});
          if(this.props.keyword != this.state.prevQuery)
            this.onTextSearchPlace();
        })
        .catch((error) => {
          this.setState({ loading: false })
        });
    } else {
      if (!this.props.isAuto && this.state.page == 'Keywords') {
        client.query({
          query: GET_FILTER_KEYWORDS,
          variables: {
            keyword: queryWords
          }
        }).then((users) => {
          let placeArray = [];
          if (users) {
            users.data.allKeywords.forEach(item => {
              if (item.places) {
                item.places.forEach(place => {
                  placeArray.push({ ...place, ...{ keyword: item.name } });
                })
              }
            });
          }
          this.setState({
            keywords: placeArray,
            loading: false
          })
        })
      }
      else if (!this.props.isAuto && this.state.page == 'People') {
        client.query({
          query: FILER_USERS,
          variables: {
            keyword: this.props.keyword,
            userId: this.props.userId,
            loading: false
          }
        }).then((users) => {
          this.setState({
            users: users.data.allUsers,
            loading: false
          })
        })
      } else {
        this.setState({ loading: false });
      }
    }
  }
  onEndReached() {
    if(this.state.nextToken && this.state.placeSearchURL&&this.state.autoplaces.length >= 19)
    {
      const fetchurl = this.state.placeSearchURL+"&pagetoken="+this.state.nextToken;
      
      this.state.nextToken = null;
      fetch(fetchurl, {
        method: 'GET',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      })
        .then((response) => response.json())
        .then((responseData) => {
          let placeData = [];
          if(responseData.results)
          {
            placeData = responseData.results.map(item => {
              return ({place_id:item.place_id,title:item.name,subtitle:item.formatted_address});
            });
          }

          this.state.nextToken = responseData.next_page_token;
          this.setState({ autoplaces: [...this.state.autoplaces,...placeData]});
        })
        .catch((error) => {
          
        });
    }
  }
  _renderTabHeader(text) {
    return (
      <Text name={text} style={[DFonts.Title, styles.TabText]} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>
    )
  }

  _onUserItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.onUser(item)} style={styles.userRow}>
        <View style={styles.useritem}>
          <CircleImage style={styles.profileImage} uri={item.photoURL} radius={getDeviceWidth(88)} />
          <View style={styles.userinfomation}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.username]}>{item.displayName}</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.bio]}>{item.username}</Text>
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
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.name]}>{item.title}</Text>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.subtitle]}>{item.subtitle}</Text>
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
          <Text style={[DFonts.Title, styles.name]}>{item.name}</Text>
          <Text style={[DFonts.SubTitle, styles.following]}>{item.following ? 'Follower' : null}</Text>
        </View>
      </View>
    )
  }
  _onKeywordItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.onKeywordItem(item)}>
        <View style={styles.item}>
          <CircleImage style={styles.profileImage} uri={item.createdBy.photoURL} radius={getDeviceWidth(88)} />
          <View style={styles.infomation}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.name]}>{item.placeName}</Text>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.following]}>{item.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )

  }
  _onRenderItem(item) {
    if (item == null) return;
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
        data={this.state.autoplaces}
        renderItem={({ item }) => this._onPlaceItem(item)}
        onEndReachedThreshold={0.5}
        onEndReached={() => this.onEndReached()}
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
  selectTabBar(el) {
    this.setState({ page: el.props.name })
    if (el.props.name == 'Places') {
      this.state.forceRefresh = true;
      this.onTextSearchPlace();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Tabs selected={this.state.page} style={styles.tabHeader}
            selectedStyle={{ color: 'red' }} onSelect={this.selectTabBar.bind(this)}>
            {this._renderTabHeader('Places')}
            {this._renderTabHeader('People')}
            {this._renderTabHeader('Keywords')}
          </Tabs>
        </View>
        <View style={styles.tabbody}>
          {
            this.state.loading ? (<ActivityIndicator style={{ marginTop: 10 }} size="small" color="#aaa" />) : null
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
