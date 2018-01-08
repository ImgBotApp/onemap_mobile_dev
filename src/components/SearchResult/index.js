//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Tabs from 'react-native-tabs';
import CircleImage from '@components/CircleImage'

import styles from './styles'
import { getDeviceHeight, getDeviceWidth } from '@global'
import RNGooglePlaces from 'react-native-google-places'

import { client } from '@root/main'
import { GET_FILTER_KEYWORDS } from '@graphql/keywords'
import { FILER_USERS } from '@graphql/users'
const data=[
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
  constructor(props){
    super(props);
    this.state = {
      page:'Recent',
      places: [],
      keywords: [],
      users: []
    };
  }
  componentWillReceiveProps(nextProps) {
    RNGooglePlaces.getAutocompletePredictions(nextProps.keyword).then((results) => {
      this.setState({
        places: results
      })
    }).catch((error) => console.log(error))
    client.query({
      query: GET_FILTER_KEYWORDS,
      variables: {
        keyword: nextProps.keyword
      }
    }).then((users) => {
      this.setState({
        keywords: users.data.allKeywords
      })
    })
    client.query({
      query: FILER_USERS,
      variables: {
        keyword: nextProps.keyword
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
      <TouchableOpacity onPress={() => this.props.onUser(item.id)} >
      <View style={styles.item}>
        <CircleImage style={styles.profileImage} uri={item.photoURL} radius={getDeviceWidth(70)}/>
        <View style={styles.infomation}>
          <Text style={styles.name}>{item.username}</Text>
          <Text style={styles.following}>{item.displayName}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  _onPlaceItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.onPlace(item.placeID)}>
        <View style={styles.item}>
          <Image source={require('@assets/images/marker.png')} style={styles.placeImage} />
          <View style={styles.infomation}>
            <Text style={styles.name}>{item.primaryText}</Text>
            <Text style={styles.following}>{item.secondaryText}</Text>
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
    return (
      <TouchableOpacity onPress={() => this.props.onKeywordItem(item.id)}>
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
    switch(item.type) {
      case 'user':
        return this._onUserItem(item)
      case 'place':
        return this._onPlaceItem(item)
      case 'campaign':
        return this._onCampaignItem(item)
    }
  }
  _renderPlaces () {
    return (
      <View style={styles.scrollView}>
      <FlatList style={styles.scrollView} 
          data={this.state.places}
        renderItem={({item}) => this._onPlaceItem(item)}
      />
    </View>
    )
  }
  _renderKeywords () {
    return (
      <View style={styles.scrollView}>
        <FlatList style={styles.scrollView} 
          data={this.state.keywords}
          renderItem={({item}) => this._onKeywordItem(item)}
        />
      </View>
      )
  }
  _renderUsers () {
    return (
      <View style={styles.scrollView}>
        <FlatList style={styles.scrollView} 
          data={this.state.users}
          renderItem={({item}) => this._onUserItem(item)}
        />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Tabs selected={this.state.page} style={styles.tabHeader}
                selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
            {this._renderTabHeader('Recent')}
            {this._renderTabHeader('People')}
            {this._renderTabHeader('Keywords')}
            {this._renderTabHeader('Places')}
          </Tabs>
        </View>
        {
          this.state.page == 'Places' ? this._renderPlaces() : null
        }
        {
          this.state.page == 'Keywords' ? this._renderKeywords() : null
        }
        {
          this.state.page == 'People' ? this._renderUsers() : null
        }
        {/* <View style={styles.scrollView}>
          <FlatList style={styles.scrollView} 
            data={data}
            renderItem={({item}) => this._onRenderItem(item)}
          />
        </View> */}
      </View>
    );
  }
}


//make this component available to the app
export default SearchResult;
