//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Tabs from 'react-native-tabs';
import CircleImage from '@components/CircleImage'

import styles from './styles'
import { getDeviceHeight, getDeviceWidth } from '@global'

var keywordsData=[]
var PlacesData=[]
var data=[]

// create a component
class SearchResult extends Component {
  constructor(props){
    super(props);
    this.state = {page:'People'};
  }
  _renderTabHeader(text) {
    return (
      <Text name={text} style={styles.TabText} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>
    )
  }

  _onUserItem(item) {
    return (
      <View style={styles.item}>
        <CircleImage style={styles.profileImage} uri={item.photoURL ? item.photoURL : item.uri } radius={getDeviceWidth(70)}/>
        <View style={styles.infomation}>
          <Text style={styles.name}>{item.displayName}</Text>
          <Text style={styles.following}>{item.username}</Text>
        </View>
      </View>
    )
  }

  _onPlaceItem(item) {
    return (
      <View style={styles.item}>
        <Image source={require('@assets/images/marker.png')} style={styles.placeImage} />
        <View style={styles.infomation}>
          <Text style={styles.name}>{item.displayName}</Text>
          <Text style={styles.following}>{item.firstName}</Text>
        </View>
      </View>
    )
  }
  _onCampaignItem(item) {
    return (
      <View style={styles.item}>
        <Image source={require('@assets/images/bookmarker.png')} style={styles.placeImage} />
        <View style={styles.infomation}>
          <Text style={styles.name}>{item.firstName}</Text>
          <Text style={styles.following}>{item.city ? 'Follower' : null}</Text>
        </View>
      </View>
    )
  }
	_onKeywordItem(item) {
		return (
			<View style={styles.item}>
				<View style={styles.infomation}>
					<Text style={styles.name}>{item.placeName}</Text>
					<Text style={styles.following}>{item.addressCityTown + " "+item.addressCountry}</Text>
				</View>
			</View>
		)
	}
  _onRenderItem(item) {
    switch(item.type) {
      case 'user':
        return this._onUserItem(item)
      case 'place':
        return this._onPlaceItem(item)
      case 'campaign':10144
        return this._onCampaignItem(item)
    default:
        return this._onUserItem(item)
    }
  }

  onchnageTab = (el) => {
	  this.setState({page:el.props.name})
	  this.props.selectHandleTab(el.props.name)
  }
  render() {
  data=this.props.allUsers
  keywordsData=this.props.keywordsData
  PlacesData=this.props.PlacesData
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Tabs selected={this.state.page} style={styles.tabHeader}
                selectedStyle={{color:'red'}} onSelect={el=>this.onchnageTab(el)} >
              {this._renderTabHeader('People')}
              {this._renderTabHeader('Keywords')}
              {this._renderTabHeader('Places')}
              {/*{this._renderTabHeader('Recent')}*/}
          </Tabs>
        </View>
          {this.state.page == 'People' && <View style={styles.scrollView}>
          <FlatList style={styles.scrollView}
            data={data}
            renderItem={({item}) => this._onRenderItem(item)}
          />
        </View>}
        {this.state.page == 'Keywords' && <View style={styles.scrollView}>
          <FlatList style={styles.scrollView}
            data={keywordsData}
            renderItem={({item}) => this._onKeywordItem(item)}
          />
        </View>}
        {this.state.page == 'Places' && <View style={styles.scrollView}>
          <FlatList style={styles.scrollView}
            data={PlacesData}
            renderItem={({item}) => this._onRenderItem(item)}
          />
        </View>}
      </View>
    );
  }
}


//make this component available to the app
export default SearchResult;
