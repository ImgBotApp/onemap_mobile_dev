//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { graphql } from "react-apollo";
import SuggestUser from '@components/SuggestUser'
import FeedItem from '@components/FeedItem'
import FeedEvent from '@components/FeedEvent'
import FeedCampaign from '@components/FeedCampaign'
import SuggestPlace from '@components/SuggestPlace'
import TitleImage from '@components/TitledImage'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './style'
import I18n from '@language'
import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../../theme/colors';
import * as SCREEN from '@global/screenName'
import Modal from 'react-native-modalbox';
import { PLACES_PAGINATED} from "../../../graphql/places";
import { SMALL_FONT_SIZE } from '../../../theme/fonts';
const PLACES_PER_PAGE = 8;
const data = [
  {
    id: 'a1',
    type: 'users',
    data: [
      {
        name: 'Rico',
        id: 'Rico.Halverson',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        name: 'Rico',
        id: 'Rico.Halverson',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        name: 'Rico',
        id: 'Rico.Halverson',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        name: 'Rico',
        id: 'Rico.Halverson',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        name: 'Rico',
        id: 'Rico.Halverson',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        name: 'Rico',
        id: 'Rico.Halverson',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        name: 'Rico',
        id: 'Rico.Halverson',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ]
  },
  {
    id: 'a3',
    type: 'place',
    uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
  },
  {
    id: 'a5',
    type: 'campaign',
    title: 'TAT Thailand',
    mark: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on',
    image: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
  },
  {
    id: 'a7',
    type: 'event',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    placeUrl: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    title: 'Gramercy Tavern'
  }
];
// create a component
class FeedPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      suggestFlag: true,
      collectionModal: false
    };
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  closeSuggest() {
    this.setState({
      suggestFlag: false
    })
  }

  _renderSuggestedList (data) {
    if ( this.state.suggestFlag == false ) return null
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
          data = {data}
          horizontal
          renderItem={({item}) => <View style={{marginRight: 15}}><SuggestUser uri={item.uri} name={item.name} id={item.id}/></View>}
        />
      </View>
    )
  }

  _renderFeedItem (data) {
    return (
      <View style={styles.feedItem}>
        <FeedItem data={data} onPress={this.onPressUserProfile.bind(this)} onBookMarker={this.onBookMarker.bind(this)} onPlace={this.onPlace.bind(this)}/>
      </View>
    )
  }

  _renderFeedEvent (data) {
    return (
      <View style={styles.feedItem}>
        <FeedEvent data={data} />
      </View>
    )
  }

  onVisitProfile = (CampaignId) => {
    // this.props.navigation.navigate('ProfilePage')
  }

  _renderFeedCampaign (data) {
    return (
      <View style={styles.feedItem}>
        <FeedCampaign data={data} onVisitProfile={this.onVisitProfile.bind(this)}/>
      </View>
    )
  }

  _renderSuggestPlace (data) {
    return (
      <View style={styles.feedItem}>
        <SuggestPlace data={data} />
      </View>
    )
  }
  _renderItem = ({item}) => {
    switch (item.type) {
      case 'users':
        return this._renderSuggestedList(item.data)
      case 'item':
        return this._renderFeedItem(item)
      case 'event' :
        return this._renderFeedEvent(item)
      case 'campaign':
        return this._renderFeedCampaign(item)
      case 'place':
        return this._renderSuggestPlace(item)
    }
  }

  onEndReached() {
    if (!this.props.data.loading) {
      const { data } = this.props;
      data.fetchMore({
        variables: {
          skip: data.allPlaces.length + PLACES_PER_PAGE,
          first: PLACES_PER_PAGE
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          console.log(fetchMoreResult)
          console.log(previousResult)
          if (!fetchMoreResult || fetchMoreResult.allPlaces.length === 0) {
            return previousResult;
          }
          return {
            allPlaces: previousResult.allPlaces.concat(fetchMoreResult.allPlaces),
          };
        }
      })
    }
  }

  onPressUserProfile = (id) => {
    this.props.navigator.push({
      screen: SCREEN.USERS_PROFILE_PAGE,
      title: I18n.t('PROFILE_PAGE_TITLE'),
      animated: true
    })
    // this.props.navigation.navigate('ProfilePage',{id: id})
  }

  onPlace = (title) => {
    // this.props.navigation.navigate('PlaceProfile', {title: title})
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: I18n.t('PLACE_TITLE'),
      animated: true
    })
  }

  onRefresh() {
    this.props.data.refetch({
      variables: {
        skip: 0,
        first: PLACES_PER_PAGE
      }
    });
  }

  onBookMarker = () => {
    this.setState({
      collectionModal: true
    })
  }
  onAddCollection = () => {
    this.setState({
      collectionModal: false
    })
    // this.props.navigation.navigate('AllCollection')
    this.props.navigator.push({
      screen: SCREEN.FEED_ALL_COLLECTION,
      title: I18n.t('COLLECTION_TITLE'),
      animated: true,
      navigatorStyle: {
        navBarTextColor: DARK_GRAY_COLOR,
        navBarTextFontSize: SMALL_FONT_SIZE
      }
    })
  }
  render() {
    let graphcoolData = [];
    if (!this.props.data.loading) {
      graphcoolData = this.props.data.allPlaces.map((place) => {
        return {
          id: place.id,
          type: 'item',
          user: {
            name: place.placeName,
            uri: place.pictureURL ? place.pictureURL[0] : '',
            updated: new Date(place.updatedAt)
          },
          feedTitle: place.placeName,
          images: place.pictureURL ? place.pictureURL.map((uri) => {
            return {uri}
          }) : [],
          place: place.placeName,
          description: place.description
        }
      });
    }
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item,index) => item.id}
          style={{width: '100%', height: '100%'}}
          data={[...data, ...graphcoolData]}
          initialNumToRender={8}
          renderItem={this._renderItem.bind(this)}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.props.data.networkStatus === 4}
          onRefresh={this.onRefresh}
        />
        <Modal
          style={styles.collectionModal}
          isOpen={this.state.collectionModal}
          backdropPressToClose={true}
          position={'bottom'}
          backdrop={true}
          backdropOpacity={0.5}
          backdropColor={'lightgray'}
          onClosed={() => this.setState({collectionModal: false})}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
            <TouchableOpacity onPress={this.onAddCollection.bind(this)}>
              <Text style={styles.plusButton}>{'+'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatebar}></View>
          <View style={styles.Collections}>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'Hearted'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'Check-Ins'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'Wish List'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'Adventure'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
          </View>
        </Modal>
      </View>
    );
  }
}

const ComponentWithQueries = graphql(PLACES_PAGINATED, {
  options: {
    variables: {
      skip: 0,
      first: PLACES_PER_PAGE
    }
  }
})
(FeedPage);

//make this component available to the app
export default ComponentWithQueries;
