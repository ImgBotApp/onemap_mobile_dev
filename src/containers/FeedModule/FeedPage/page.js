//import liraries
import React, { Component, PureComponent } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, Vibration } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modalbox'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import Orientation from 'react-native-orientation'
import PropTypes from 'prop-types'

import SuggestUser from '@components/SuggestUser'
import FeedItem from '@components/FeedItem'
import FeedEvent from '@components/FeedEvent'
import FeedCampaign from '@components/FeedCampaign'
import SuggestPlace from '@components/SuggestPlace'
import TitleImage from '@components/TitledImage'

import styles from './style'
import I18n from '@language'
import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import DFonts, { SMALL_FONT_SIZE } from '@theme/fonts';

import * as SCREEN from '@global/screenName'
import { clone } from '@global';
const PLACES_PER_PAGE = 8;
const STORIES_PER_PAGE = 8;

import { client } from '@root/main'
import { graphql } from "react-apollo";
import { CREATE_NOTIFICATION } from '../../../graphql/notification'
import { GET_MY_COLLECTIONS } from '@graphql/collections'
import { getCampaignByUser } from '@graphql/campaign'

import { sendSingleNotification } from '../../../apis/onesignal'

class FeedPage extends PureComponent {
  static propTypes = {
    users: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      suggestFlag: true,
      collectionModal: false,
      skip: 0,
      suggestUsers: { data: [] },
      items: [],
      users: {
        id: 'a1',
        type: 'users',
        data: []
      },
      campaigns: [],
      refreshing: false,
      selectedCollections: [],
      loading: true
    };
    this.onRefresh = this.onRefresh.bind(this)
    Orientation.lockToPortrait();
  }
  componentWillMount() {
    this.getMyCollections();
    getCampaignByUser(this.props.user.id)
      .then(res => {
        const campaigns = res.map(item => ({
          ...item,
          type: 'campaign'
        }))
        this.setState({
          campaigns
        })
      })
  }
  componentWillReceiveProps(nextProps) {
    const { getSuggestUsers, getStoriesPaginated } = nextProps;
    if (!this.props.placeUpdated && nextProps.placeUpdated) {
      this.onRefresh();
      this.props.placeUpdate(false);
    } else {
      if (getSuggestUsers.allUsers) {
        if (getSuggestUsers.allUsers !== this.props.getSuggestUsers.allUsers) {
          this.setState({
            suggestUsers: getSuggestUsers.allUsers.length ? [{
              id: 'users' + Date.now(),
              type: 'users',
              data: getSuggestUsers.allUsers.map((user) => {
                return {
                  id: user.id,
                  username: user.username,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  playerId: user.playerId
                }
              })
            }] : []
          });
        }
      }
      if (getStoriesPaginated.allStories) {
        if (getStoriesPaginated.allStories != this.props.getStoriesPaginated.allStories || this.state.loading) {
          let graphcoolData = getStoriesPaginated.allStories.filter(story => story.place).map(story => {
            return {
              id: story.place.id,
              storyId: story.id,
              type: 'item',
              createdBy: {
                id: story.createdBy.id,
                displayName: story.createdBy.displayName,
                username: story.createdBy.username,
                photoURL: story.createdBy.photoURL,
                playerId: story.createdBy.playerId
              },
              likedByUser: story.likedByUser,
              updated: new Date(story.updatedAt),
              placeName: story.place.placeName,
              images: story.pictureURL ? story.pictureURL.map(uri => { return { uri } }) : [],
              title: story.title,
              description: story.story,
              bookmark: this.isBookmarked(story.place),
              collectionIds: story.place.collections.map(collection => collection.id)//will be removed later
            }
          });
          this.setState({ items: graphcoolData, loading: false });
        }
      }
    }

  }
  getMyCollections() {
    client.query({
      query: GET_MY_COLLECTIONS,
      variables: {
        id: this.props.user.id
      }
    }).then(collections => {
      this.props.saveCollections(collections.data.allCollections);
    })
  }
  isBookmarked(place) {
    let marked = false;
    place.collections.forEach(collection => {
      if (collection.user && collection.user.id === this.props.user.id) {
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
    let tmpPlace = clone(this.state.selectedPlace);
    tmpPlace.bookmark = true;
    tmpPlace.collectionIds = [...tmpPlace.collectionIds, ...this.state.selectedCollections];
    this.props.addCollectionToPlace({
      variables: {
        id: this.state.selectedPlace.id,
        collectionIds: tmpPlace.collectionIds
      }
    }).then(places => {
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
      items[index] = { bookmark: false, collectionIds };
      this.setState({ items, collectionModal: false, selectedCollections: [] });
      client.resetStore();
    });
  }
  likeStory(liked, item, index = -1) {
    console.log('Like Data: ', liked, item, index)
    if (liked) {
      Vibration.vibrate(200);
      this.props.likeStory({
        variables: {
          storyId: item.storyId,
          userId: this.props.user.id,
          lat: this.props.user.location ? this.props.user.location.latitude : 0,
          lng: this.props.user.location ? this.props.user.location.longitude : 0
        }
      }).then(({ data }) => {
        return client.mutate({
          mutation: CREATE_NOTIFICATION,
          variables: {
            actor: this.props.user.id,
            receiver: item.createdBy.id,
            story: item.id,
            type: 'LIKE',
            updateAt: new Date().toISOString()
          }
        });
      }).then(res => Promise.resolve(res.data))
      .then(res => Promise.resolve(res.createNotification))
      .then(res => {
          sendSingleNotification({
            en: `${this.props.user.username} likes your Story`
          }, item.createdBy.playerId, {
              type: 'LIKE',
              aImg: this.props.user.photoURL,
              aName: this.props.user.username,
              sImg: item.images.length > 1 ? item.images[0] : null,
              date: new Date().toISOString(),
              userId: this.props.user.id,
              storyId: item.id,
              storyName: item.title,
              receiverId: item.createdBy.id,
              id: res.id
            })
          client.resetStore().then(() => {
              this.onRefresh();
          })
        }).catch(err => alert(err));
    } else {
      this.props.unlikeStory({
        variables: {
          id: item.likedByUser.filter(item => item.user.id === this.props.user.id)[0].id
        }
      }).then(({ data }) => {
        return client.mutate({
          mutation: CREATE_NOTIFICATION,
          variables: {
            actor: this.props.user.id,
            receiver: item.createdBy.id,
            story: item.id,
            type: 'UNLIKE',
            updateAt: new Date().toISOString()
          }
        })
      })
      .then(res => Promise.resolve(res.data))
      .then(res => Promise.resolve(res.createNotification))
      .then(res => {
        sendSingleNotification({
          en: `${this.props.user.username} unlikes your Story`
        }, item.createdBy.playerId, {
            type: 'UNLIKE',
            aImg: this.props.user.photoURL,
            aName: this.props.user.username,
            sImg: item.images.length > 1 ? item.images[0] : null,
            date: new Date().toISOString(),
            userId: this.props.user.id,
            storyId: item.id,
            storyName: item.title,
            receiverId: item.createdBy.id,
            id: res.id
          })
          client.resetStore().then(() => {
            this.onRefresh();
          });
        }).catch(err => alert(err));
    }
  }
  closeSuggest() {
    this.setState({
      suggestFlag: false
    })
  }
  onRefresh() {
    this.props.getStoriesPaginated.refetch();
  }
  onEndReached() {
    const { getStoriesPaginated } = this.props;
    if (getStoriesPaginated && !getStoriesPaginated.loading) {
      getStoriesPaginated.fetchMore({
        variables: {
          skip: getStoriesPaginated.allStories.length + STORIES_PER_PAGE,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.allStories.length === 0) {
            return previousResult;
          }
          return {
            allStories: previousResult.allStories.concat(fetchMoreResult.allStories),
          };
        }
      });
    }
  }
  _renderSuggestedList(data) {
    if (this.state.suggestFlag == false) return <View />;
    return (
      <View style={styles.topItem}>
        {/* Recommend text */}
        <View style={styles.recommendText}>
          <Text style={[DFonts.Title, styles.recString]}>{I18n.t('FEED_RECOMMEND_BY_ONEMAP')}</Text>
          <TouchableOpacity onPress={this.closeSuggest.bind(this)}>
            <EvilIcons name="close-o" size={24} color={LIGHT_GRAY_COLOR} />
          </TouchableOpacity>
        </View>
        {/* User list */}
        <OptimizedFlatList
          keyExtractor={(item, index) => index}
          style={styles.users}
          data={data}
          horizontal
          renderItem={({ item }) =>
            <SuggestUser
              data={item}
              onPress={() => this.onPressUserProfile(item)}
            />
          }
        />
      </View>
    )
  }
  _renderFeedItem(data, index) {
    return (
      <View style={styles.feedItem}>
        <FeedItem
          data={data}
          onPress={place => this.onPressUserProfile(place.createdBy)}
          onBookMarker={() => this.onBookMarker(data, index)}
          onPlace={() => this.onPlace(data, index)}
          likeStory={(liked) => this.likeStory(liked, data, index)}
          userId={this.props.user.id}
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
    this.props.navigator.push({
      screen: SCREEN.CAMPAIGN_PROFILE_PAGE,
      title: I18n.t('CAMPAIGN_PROFILE_TITLE'),
      animated: true,
      passProps: {
        campaignId: CampaignId
      }
    })
  }

  _renderFeedCampaign(data) {
    return (
      <View style={styles.feedItem}>
        <FeedCampaign data={data} onVisitProfile={CampaignId => this.onVisitProfile(CampaignId)} />
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
    if (item && item.type) {
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
    return (<View />);
  }

  onPressUserProfile(userInfo) {
    if (userInfo.id === this.props.user.id) {
      this.props.navigator.switchToTab({ tabIndex: 2 });
    } else {
      this.props.navigator.push({
        screen: SCREEN.USERS_PROFILE_PAGE,
        title: I18n.t('PROFILE_PAGE_TITLE'),
        animated: true,
        passProps: {
          userInfo
        }
      })
    }
    console.log('userInfo', userInfo)
  }

  onPlace(data, index) {
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      animated: true,
      passProps: {
        place: {
          id: data.id,
          placeName: data.placeName
        },
        oneMapperId: data.createdBy.id !== this.props.user.id ? data.createdBy.id : '',
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

  render() {
    if (this.state.loading)
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#dddddd" />
        </View>
      );
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index}
          style={{ width: '100%', height: '100%' }}
          data={[...this.state.suggestUsers, ...this.state.campaigns, ...this.state.items]}
          renderItem={this._renderItem.bind(this)}
          onEndReached={() => this.onEndReached()}
          refreshing={this.props.getStoriesPaginated.networkStatus === 4}
          onRefresh={this.onRefresh}
          removeClippedSubviews={true}
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
              .map((collection, index) => (
                <TouchableOpacity key={index} style={styles.collectionContainer} onPress={() => this.addBookmark(collection.id)}>
                  <TitleImage
                    style={styles.collection}
                    uri={collection.pictureURL}
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

export default FeedPage;
