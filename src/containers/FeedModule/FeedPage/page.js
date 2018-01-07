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
import { client } from '@root/main'
import { PAGINATED_PLACES } from '@graphql/places'
import { SUGGEST_USERS } from '@graphql/users'

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
  }
];
// create a component
class FeedPage extends Component {
  constructor (props) {
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
      loading: true
    };
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }
  componentWillMount () {
    client.query({
      query: SUGGEST_USERS
    }).then((users) => {
      this.setState({
        users: {
          id: 'a1',
          type: 'users',
          data: users.data.allUsers.map((user) => {
            return {
              id: user.username,
              name: user.displayName,
              uri : user.photoURL,
              identify: user.id 
            }
          })
        }
      })
    })
    client.query({
      query: PAGINATED_PLACES,
      variables: {
        first: 10,
        skip: this.state.skip 
      }
    }).then((places) => {
      console.log(places)
      this.setState({
        items: places.data.allPlaces.map((place) => {
          return {
            id: place.id,
            type: 'item',
            user: {
              name: place.createdBy.username,
              id: place.createdBy.id,
              uri: place.createdBy.photoURL || 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
              updated: new Date(place.updatedAt)
            },
            bookmark: true,
            feedTitle: place.placeName,
            images: place.pictureURL.map(item => { return {uri: item}}),
            place: '',
            description: place.description || ''
          }
        }),
      skip: 10,
      loading: false
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    client.query({
      query: PAGINATED_PLACES,
      variables: {
        first: 10,
        skip: this.state.skip 
      }
    }).then((places) => {
      console.log(places)
    })
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

  onEndReached(distance) {
    if (distance.distanceFromEnd < -10) return
    if (this.state.loading == true) return;
    this.setState({
      loading: true
    })
    client.query({
      query: PAGINATED_PLACES,
      variables: {
        first: 10,
        skip: this.state.skip 
      }
    }).then((places) => {
      console.log("Added")
      console.log(places)
      if (places.data.allPlaces.length == 0) return
      this.setState({
        items: [
          ...this.state.items,
          ...places.data.allPlaces.map((place) => {
            return {
              id: place.id,
              type: 'item',
              user: {
                name: place.createdBy.username,
                id: place.createdBy.id,
                uri: place.createdBy.photoURL || 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
                updated: new Date(place.updatedAt)
              },
              bookmark: true,
              feedTitle: place.placeName,
              images: place.pictureURL.map(item => { return {uri: item}}),
              place: '',
              description: place.description || ''
            }
          })
        ],
        loading: false,
        skip: this.state.skip + 10
      })
    })
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
    // this.props.navigation.navigate('ProfilePage',{id: id})
  }

  onPlace = (id) => {
    // alert(title)
    // this.props.navigation.navigate('PlaceProfile', {title: title})
    this.props.navigator.push({
      screen: SCREEN.PLACE_PROFILE_PAGE,
      title: I18n.t('PLACE_TITLE'),
      animated: true,
      passProps: {
        placeID: id
      }
    })
  }

  onRefresh() {
    // this.props.data.refetch({
    //   variables: {
    //     skip: 0,
    //     first: PLACES_PER_PAGE
    //   }
    // });
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
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item,index) => item.id}
          style={{width: '100%', height: '100%'}}
          data={
            this.state.items.length != 0 ? 
            [this.state.users, ...this.state.items] :
            [this.state.users]
          }
          initialNumToRender={10}
          renderItem={this._renderItem.bind(this)}
          onEndReachedThreshold={0}
          onEndReached={this.onEndReached.bind(this)}
          // onRefresh={this.onRefresh.bind(this)}
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

//make this component available to the app
export default FeedPage;
