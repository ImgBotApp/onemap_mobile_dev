//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';

import SuggestUser from '@components/SuggestUser'
import FeedItem from '@components/FeedItem'
import FeedEvent from '@components/FeedEvent'
import FeedCampaign from '@components/FeedCampaign'
import SuggestPlace from '@components/SuggestPlace'
import TitleImage from '@components/TitledImage'

import styles from './style'
import I18n from '@language'
import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import { SMALL_FONT_SIZE } from '@theme/fonts';

import * as SCREEN from '@global/screenName'
import { clone } from '@global';
const PLACES_PER_PAGE = 8;

import { client } from '@root/main'
import { PAGINATED_PLACES } from "@graphql/places";
import { SUGGEST_USERS } from '@graphql/users'
import { GET_USER_COLLECTIONS, GET_MY_COLLECTIONS } from '@graphql/collections'

// create a component
class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestFlag: true,
      collectionModal: false,
      skip: 0,
      items: [],
      users: {
        id: 'a1',
        type: 'users',
        data: []
      },
      loading: false,
      refreshing: false,
      selectedCollections: []
    };
  }
  componentWillMount() {
    client.query({
      query: SUGGEST_USERS
    }).then((users) => {
      this.suggestUsers = {
        id: 'a1',
        type: 'users',
        data: users.data.allUsers.map((user) => {
          return {
            id: user.username,
            name: user.displayName,
            uri: user.photoURL,
            identify: user.id
          }
        })
      };
    })
    this.fetchFeedItems();
    this.getMyCollections();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.placeUpdated && nextProps.placeUpdated) {
      this.fetchFeedItems();
      this.props.placeUpdate(false);
    }
    // client.query({
    //   query: PAGINATED_PLACES,
    //   variables: {
    //     first: 10,
    //     skip: this.state.skip
    //   }
    // }).then((places) => {
    //   console.log(places)
    // })
  }
  fetchFeedItems = () => {
    client.query({
      query: PAGINATED_PLACES,
      variables: {
        first: 10,
        skip: this.state.skip
      }
    }).then((places) => {
      console.log(places)
      items = places.data.allPlaces.map((place) => {
        return {
          id: place.id,
          type: 'item',
          user: {
            name: place.createdBy.username,
            id: place.createdBy.id,
            uri: place.createdBy.photoURL || 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
            updated: new Date(place.updatedAt)
          },
          feedTitle: place.placeName,
          images: place.pictureURL.map(item => { return { uri: item } }),
          place: '',
          description: place.description || '',
          bookmark: this.isBookmarked(place),
          collectionIds: place.collections.map(collection => collection.id)//will be removed later
        }
      });
      this.setState({
        items: [this.suggestUsers, ...items],
        loading: false,
        refreshing: false
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }
  isBookmarked(place) {
    let marked = false;
    place.collections.forEach(collection => {
      if (collection.user.id === this.props.user.id) {
        marked = true;
      }
    });
    return marked;
  }
  addBookmark(id) {
    let tmp = this.state.selectedCollections;
    if (this.state.selectedCollections.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    this.setState({ selectedCollections: tmp });
  }
  addBookmarks() {
    this.props.addCollectionToPlace({
      variables: {
        id: this.state.selectedPlace.id,
        collectionIds: this.state.selectedCollections
      }
    }).then(places => {
      let tmpPlace = this.state.selectedPlace;
      tmpPlace.bookmark = true;
      tmpPlace.collectionIds = this.state.selectedCollections;
      let items = clone(this.state.items);
      items[this.state.selectedPlaceIndex] = tmpPlace;
      this.setState({ items, collectionModal: false });
      client.resetStore();
    });
  }
  removeBookmark(index) {
    let collectionIds = clone(this.state.items[index].collectionIds);
    collectionIds = collectionIds.filter(id => !this.props.collections.map(collection => collection.id).includes(id));
    this.props.removeCollectionFromPlace({
      variables: {
        id: this.state.items[index].id,
        collectionIds
      }
    }).then(places => {
      let items = clone(this.state.items);
      items[index].bookmark = false;
      items[index].collectionIds = collectionIds;
      this.setState({ items, collectionModal: false, selectedCollections: [] });
      client.resetStore();
    });
  }
  getMyCollections = () => {
    client.query({
      query: GET_MY_COLLECTIONS,
      variables: {
        id: this.props.user.id
      }
    }).then(collections => {
      this.props.saveCollections(collections.data.allCollections);
    })
  }
  closeSuggest() {
    this.setState({
      suggestFlag: false
    })
  }

  _renderSuggestedList(data) {
    if (this.state.suggestFlag == false) return null
    return (
      <View style={styles.topItem}>
        {/* Recommend text */}
        <View style={styles.recommendText}>
          <Text style={styles.recString}>{I18n.t('FEED_RECOMMEND_BY_ONEMAP')}</Text>
          <TouchableOpacity onPress={this.closeSuggest.bind(this)}>
            <EvilIcons name="close-o" size={24} color={LIGHT_GRAY_COLOR} />
          </TouchableOpacity>
        </View>
        {/* User list */}
        <FlatList
          style={styles.users}
          data={data}
          horizontal
          renderItem={({ item }) => <View style={{ marginRight: 15 }}>
            <SuggestUser uri={item.uri} name={item.name} id={item.id}
              onPress={this.onSuggestUser.bind(this)}
            /></View>}
        />
      </View>
    )
  }
  onSuggestUser(id) {
    this.props.navigator.push({
      screen: SCREEN.USERS_PROFILE_PAGE,
      title: I18n.t('PROFILE_PAGE_TITLE'),
      animated: true,
      passProps: {
        placeID: id,
      }
    })
  }
  _renderFeedItem(data, index) {
    return (
      <View style={styles.feedItem}>
        <FeedItem
          data={data}
          onPress={this.onPressUserProfile}
          onBookMarker={() => this.onBookMarker(data, index)}
          onPlace={() => this.onPlace(data, index)}
        />
      </View>
    )
  }

  _renderFeedEvent(data) {
    return (
      <View style={styles.feedItem}>
        <FeedEvent data={data} />
      </View>
    )
  }

  onVisitProfile = (CampaignId) => {
  }

  _renderFeedCampaign(data) {
    return (
      <View style={styles.feedItem}>
        <FeedCampaign data={data} onVisitProfile={this.onVisitProfile.bind(this)} />
      </View>
    )
  }

  _renderSuggestPlace(data) {
    return (
      <View style={styles.feedItem}>
        <SuggestPlace data={data} />
      </View>
    )
  }
  _renderItem = ({ item, index }) => {
    switch (item.type) {
      case 'users':
        return this._renderSuggestedList(item.data)
      case 'item':
        return this._renderFeedItem(item, index)
      case 'event':
        return this._renderFeedEvent(item)
      case 'campaign':
        return this._renderFeedCampaign(item)
      case 'place':
        return this._renderSuggestPlace(item)
    }
  }

  onPressUserProfile = (id) => {
    this.props.navigator.push({
      screen: SCREEN.USERS_PROFILE_PAGE,
      title: I18n.t('PROFILE_PAGE_TITLE'),
      animated: true,
      passProps: {
        placeID: id
      }
    })
  }

  onPlace(data, index) {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: I18n.t('PLACE_TITLE'),
      animated: true,
      passProps: {
        place: data,
        onPlaceUpdate: place => this.onPlaceUpdate(place, index),
      }
    })
  }

  onPlaceUpdate = (place, index) => {
    let items = clone(this.state.items);
    items[index] = place;
    this.setState({ items });
  }

  onBookMarker(place, index) {
    if (place.bookmark) {
      this.removeBookmark(index);
    } else {
      this.setState({
        selectedPlace: place,
        selectedPlaceIndex: index,
        selectedCollections: [],
        collectionModal: true,
      });
    }
  }
  onAddCollection = () => {
    this.setState({
      collectionModal: false
    })
    this.props.navigator.push({
      screen: SCREEN.FEED_NEW_COLLECTION,
      title: I18n.t('COLLECTION_CREATE_NEW'),
    })
  }
  handlerefresh = () => {
    this.setState({
      skip: this.state.skip + 10,
      refreshing: true
    }, () => {
      // alert('a')
      this.setState({
        refreshing: false
      })
    })
  }
  renderFooter = () => {
    // if(!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }} >
        <ActivityIndicator animating size="large" />
      </View>
    )
  };
  handleLoadMore = () => {
    this.setState({
      skip: this.state.skip + 10,
      refreshing: true
    }, () => {
      this.fetchFeedItems();
      this.setState({
        refreshing: false
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%', height: '100%' }}
          data={this.state.items}
          initialNumToRender={10}
          renderItem={this._renderItem}
          // ListFooterComponent={this.renderFooter}
          // refreshing={this.state.refreshing}
          // onRefresh={this.handlerefresh}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
        />
        <Modal
          style={styles.collectionModal}
          isOpen={this.state.collectionModal}
          backdropPressToClose={true}
          position={'bottom'}
          backdrop={true}
          backdropOpacity={0.5}
          backdropColor={'lightgray'}
          onClosed={() => this.setState({ collectionModal: false })}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={this.onAddCollection}>
              <Text style={styles.plusButton}>{'+'}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
            <TouchableOpacity disabled={!this.state.selectedCollections.length} onPress={() => this.addBookmarks()}>
              <Text style={styles.plusButton}>{'Done'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatebar}></View>
          <ScrollView horizontal={true} style={styles.Collections}>
            {this.props.collections
              .filter(collection => collection.type === 'USER')
              .map((collection, index) => (
                <TouchableOpacity key={index} style={styles.collectionContainer} onPress={() => this.addBookmark(collection.id)}>
                  <TitleImage
                    style={styles.collection}
                    uri={collection.pictureURL ? collection.pictureURL : 'https://placeimg.com/640/480/any'}
                    title={collection.name}
                    radius={8}
                    vAlign={'center'}
                    hAlign={'center'}
                    titleStyle={styles.collectionItemTitle}
                    disabled={true}
                  />
                  {this.state.selectedCollections.includes(collection.id) &&
                    <IonIcons
                      name='ios-checkmark-circle'
                      size={30}
                      style={{ position: 'absolute', backgroundColor: 'transparent' }}
                    />}
                </TouchableOpacity>
              ))}
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

//make this component available to the app
export default FeedPage;
