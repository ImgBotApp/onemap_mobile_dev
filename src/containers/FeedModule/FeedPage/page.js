//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SuggestUser from '@components/SuggestUser'
import FeedItem from '@components/FeedItem'
import FeedEvent from '@components/FeedEvent'
import FeedCampaign from '@components/FeedCampaign'
import SuggestPlace from '@components/SuggestPlace'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './style'
import I18n from '@language'
import { LIGHT_GRAY_COLOR } from '../../../theme/colors';
const data = [
  {
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
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    bookmark: true,
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
  {
    type: 'place',
    uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
  },
  {
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    bookmark: true,
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
  {
    type: 'campaign',
    title: 'TAT Thailand',
    mark: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on',
    image: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
  },
  {
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
  {
    type: 'event',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    placeUrl: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    title: 'Gramercy Tavern'
  },
  {
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
  {
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    bookmark: true,
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
  {
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
  {
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
  {
    type: 'item',
    user: {
      name: 'Alexandra',
      uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
      updated: new Date()
    },
    feedTitle: 'GRAMERCY TAVERN',
    images: [
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
      }
    ],
    place: 'American Restaurant',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on'
  },
]
// create a component
class FeedPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestFlag: true
    }
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
        <FeedItem data={data} onPress={this.onPressUserProfile.bind(this)}/>
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

  _renderFeedCampaign (data) {
    return (
      <View style={styles.feedItem}>
        <FeedCampaign data={data} />
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

  onPressUserProfile = (id) => {
    this.props.navigation.navigate('ProfilePage',{id: id})
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          style={{width: '100%', height: '100%'}}
          data = {data}
          renderItem={this._renderItem.bind(this)}
        />
      </View>
    );
  }
}



//make this component available to the app
export default FeedPage;
