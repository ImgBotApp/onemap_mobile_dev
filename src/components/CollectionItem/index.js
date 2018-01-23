//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleImage from '@components/TitledImage'

import styles from './styles'

const imagePlaceholder = 'https://res.cloudinary.com/onemap-co/image/upload/v1516259041/placeholder_veswep.png'

class CollectionItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: this.props.uri,
      radius: this.props.radius ? this.props.radius : 8,
      title: this.props.title || 'Collection',
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ uri: nextProps.uri, title: nextProps.title });
  }
  render() {
    return (
      <View style={[styles.cell, this.props.style]}>
        <TitleImage
          style={[styles.collection, this.props.insideStyle]}
          uri={this.state.uri ? this.state.uri : imagePlaceholder}
          radius={this.state.radius}
          title={this.state.title}
          vAlign={'center'}
          hAlign={'center'}
          titleStyle={styles.collectionItemTitle}
          onPress={this.props.onPress ? this.props.onPress : null}
          onLongPress={this.props.onLongPress ? this.props.onLongPress : null}
        />
      </View>
    );
  }
}



//make this component available to the app
export default CollectionItem;