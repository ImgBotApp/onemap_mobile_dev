//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
import { SMALL_FONT_SIZE } from '../../../theme/fonts';
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
    id: 'a2',
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
    id: 'a3',
    type: 'place',
    uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
  },
  {
    id: 'a4',
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
    id: 'a5',
    type: 'campaign',
    title: 'TAT Thailand',
    mark: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    description: 'The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on The Main Dining Room serves a fixed-price menu for dinner an a carte menu for lunch. Our Tavern serves an a lamenu and wecomes guests on a walk and so on',
    image: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
  },
  {
    id: 'a6',
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
    id: 'a7',
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
    id: 'a8',
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
    id: 'a9',
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
    id: 'a10',
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
    id: 'a11',
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
    id: 'a12',
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
      suggestFlag: true,
      collectionModal: false
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
          data = {data}
          renderItem={this._renderItem.bind(this)}
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
