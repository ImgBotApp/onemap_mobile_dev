//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleImage from '@components/TitledImage'

import styles from './styles'
// create a component
class CollectionItem extends Component {
  constructor (props) {
    super(props)
    this.state={
      uri: this.props.uri,
      radius: this.props.radius ? this.props.radius : 8,
      title: this.props.title || 'Collection',
    }
  }
  render() {
    return (
      <View style={[styles.cell,this.props.style]}>
        <TitleImage style={[styles.collection, this.props.insideStyle]} uri={this.props.uri} radius={this.state.radius}  title={this.state.title} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
      </View>
  );
  }
}



//make this component available to the app
export default CollectionItem;
