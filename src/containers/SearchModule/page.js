//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,FlatList } from 'react-native';
import Search from 'react-native-search-box';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import SearchResult from '@components/SearchResult'
import {getDeviceWidth} from '@global'
import styles from './styles'
import { client } from '@root/main'
import { SEARCH_USER,LIST_KEYWORD_PLACES } from '@graphql/users'

// create a component
const stories = [
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
    ]
  },
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    ]
  },
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
    ]
  }
]
class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: false,
      selectedTab:'People'
    }
    this.selectHandleTab.bind(this);
  }
  _renderStoryItem (item) {
    return (
      <View>
        <AutoHeightTitledImage uri={item.uri}
          width={getDeviceWidth(400)}
          title={'abc'} vAlign={'center'} hAlign={'left'} titleStyle={styles.storyItemTitle}
          style={{marginBottom: 10}}
        />
        {/* <AutoHeightImage imageURL={item.uri} width={getDeviceWidth(343)} style={{marginBottom: 10}} /> */}
      </View>
    )
  }
	selectHandleTab = (selectedTab) => {
      if(this.state.selectedTab != selectedTab){
		  this.setState({
			  selectedTab,
		  })
      }
	}
  render() {
    return (
      <View style={styles.container}>
        <Search
          ref="search_box"
          backgroundColor={"#f3f3f3"}
          titleCancelColor={"#585958"}
          onChangeText={this.onShowResult.bind(this)}
          onSearch={this.onDismissResult.bind(this)}
          onCancel={this.onDismissResult.bind(this)}
        />
        <View>
          <ScrollView style={{width: '100%'}}>
            <View style={styles.StoryContainer}>
              <View style={styles.StoryList}>
                <FlatList 
                  data={stories[0].items}
                  renderItem={({item}) => { return this._renderStoryItem(item)} }
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList 
                  data={stories[1].items}
                  renderItem={({item}) => { return this._renderStoryItem(item)} }
                />
              </View>
              <View style={styles.StoryList}>
                <FlatList 
                  data={stories[2].items}
                  renderItem={({item}) => { return this._renderStoryItem(item)} }
                />
              </View>
            </View>
          </ScrollView>
          { this.state.result == true ? <SearchResult  selectHandleTab={this.selectHandleTab} allUsers={this.state.allUsers} keywordsData={this.state.keywordsData}/> : null }
        </View>
      </View>
    );
  }
  onShowResult = async (val) =>{
    if ( val.length == 0) return this.setState({result: false})
    else {
      if(this.state.selectedTab == 'People'){
		  let SearchUser = await client.query({
			  query: SEARCH_USER,
			  variables: {
				  keyword:val
			  }
		  }).then((data) => {
			  this.setState({ result: true,allUsers :data.data.allUsers})
		  })
      } else if(this.state.selectedTab == 'Keywords'){
		  let SearchKeyword = await client.query({
			  query: LIST_KEYWORD_PLACES,
			  variables: {
				  keywordName:val
			  }
		  }).then((data) => {
			  this.setState({ result: true,keywordsData :data.data.allPlaces })
		  })
      }
		return
    }
  }

  onDismissResult() {
    this.setState({
      result: falseval
    })

  }
}

export default SearchPage;
