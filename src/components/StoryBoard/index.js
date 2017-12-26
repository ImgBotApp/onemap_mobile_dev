//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity } from 'react-native';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'

import { getDeviceWidth, getDeviceHeight } from '@global'
import styles from './styles'

/**
 * Array Item
 * 
 * id
 * title
 * uri
 */

/**
 * Props event
 * 
 * onPressItem
 */
// create a component
class StoryBoard extends Component {
  constructor(props) {
    super(props)
    this.state={
      data: props.data
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  _renderStoryItem (item) {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.onPressItem(item.id)}>
          <AutoHeightTitledImage uri={item.uri}
            width={getDeviceWidth(this.props.width)}
            title={item.title} vAlign={'center'} hAlign={'left'} titleStyle={styles.storyItemTitle}
            style={{marginBottom: 10}}
          />
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.subContainer,this.props.subContainer]}>
          <FlatList 
              data={this.state.data}
              renderItem={({item}) => { if (this.state.data.indexOf(item)% 3 == 0 )return this._renderStoryItem(item)} }
          />
        </View>
        <View style={[styles.subContainer,this.props.subContainer]}>
          <FlatList 
            data={this.state.data}
            renderItem={({item}) => { if (this.state.data.indexOf(item)% 3 == 1 )return this._renderStoryItem(item)} }
          />
        </View>
        <View style={[styles.subContainer,this.props.subContainer]}>
          <FlatList 
            data={this.state.data}
            renderItem={({item}) => { if (this.state.data.indexOf(item)% 3 == 2 )return this._renderStoryItem(item)} }
          />
        </View>
      </View>
    );
  }
}


//make this component available to the app
export default StoryBoard;
