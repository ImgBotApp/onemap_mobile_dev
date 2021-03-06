//import liraries
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TitleImage from '@components/TitledImage'

import styles from './styles'

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
          uri={this.state.uri}
          radius={this.state.radius}
          title={this.state.title}
          vAlign={'center'}
          hAlign={'center'}
          titleStyle={styles.collectionItemTitle}
          onPress={this.props.onPress ? this.props.onPress : null}
          onLongPress={this.props.onLongPress ? this.props.onLongPress : null}
        />
        {this.props.locked &&
          <Image
            source={require('@assets/images/lock.png')}
            style={styles.lock}
          />
        }
      </View>
    );
  }
}



//make this component available to the app
export default CollectionItem;
