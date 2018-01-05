//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Tabs from 'react-native-tabs';
import CircleImage from '@components/CircleImage'

import styles from './styles'
import { getDeviceHeight, getDeviceWidth } from '@global'
import { NavigationActions } from 'react-navigation';

const data = [
  {
    type: 'user',
    uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg',
    name: 'Guillaume',
    following: true
  },
  {
    type: 'place',
    name: 'Nai Circus School',
    address: 'Pai, Thailand'
  },
  {
    type: 'place',
    name: 'Nai Circus School',
    address: 'Pai, Thailand'
  },
  {
    type: 'place',
    name: 'Nai Circus School',
    address: 'Pai, Thailand'
  },
  {
    type: 'campaign',
    name: 'Nature',
    user: 'Minna'
  },
  {
    type: 'user',
    uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg',
    name: 'Guillaume',
    following: false
  }
]
// create a component
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'Places' };
  }
  _renderTabHeader(text) {
    return (
      <Text name={text} style={styles.TabText} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>
    )
  }

  _onUserItem(item) {
    return (
      <View style={styles.item}>
        <CircleImage style={styles.profileImage} uri={item.uri} radius={getDeviceWidth(70)} />
        <View style={styles.infomation}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.following}>{item.address}</Text>
        </View>
      </View>
    )
  }

  _dataSend(item) {
    // const { navigate } = this.props.sendProps.navigation;
    // navigate('PlaceProfile',item)
    alert(item.placeID)
  }
  _onPlaceItem(item) {
    console.log(this.props);
    return (
      <View style={styles.item}>
        <Image source={require('@assets/images/marker.png')} style={styles.placeImage} />
        <View style={styles.infomation}>
          <TouchableOpacity onPress={() => this._dataSend(item)}>
            <Text style={styles.name}>{item.primaryText}</Text>
            <Text style={styles.following}>{item.secondaryText}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  _onRenderItem(item) {
    // switch(item.type) {
    //   case 'user':
    // return this._onUserItem(item)
    //   case 'place':
    return this._onPlaceItem(item)
    //   case 'campaign':
    //     return this._onCampaignItem(item)
    // }
  }
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Tabs selected={this.state.page} style={styles.tabHeader}
            selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })}>
            {this._renderTabHeader('Recent')}
            {this._renderTabHeader('People')}
            {this._renderTabHeader('Keyword')}
            {this._renderTabHeader('Places')}
          </Tabs>
        </View>
        <View style={styles.scrollView}>
          <FlatList style={styles.scrollView}
            data={this.props.searchData}
            renderItem={({ item }) => this._onRenderItem(item)}
          />
        </View>
      </View>
    );
  }
}


//make this component available to the app
export default SearchResult;
