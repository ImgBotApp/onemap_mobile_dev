//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CollectionItem from '@components/CollectionItem'

import styles from './styles'
// create a component
const uri = 'https://placeimg.com/640/480/nature/grayscale'
class Collections extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collections: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collections.length > 2 && nextProps.collections !== this.props.collections) {
      let collections = [];
      collections.push(nextProps.collections.filter(item => item.name == 'Hearted')[0]);
      collections.push(nextProps.collections.filter(item => item.name == 'Checked-In')[0]);
      collections.push(nextProps.collections.filter(item => item.name == 'Default')[0]);
      this.setState({collections});
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.onHearted()}>
          <CollectionItem style={styles.itemContainer}
            insideStyle={styles.itemContainer}
            uri={this.state.collections.length > 2 ? this.state.collections[0].pictureURL : uri}
            radius={8}
            title={'Hearted'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onCheckIns()}>
          <CollectionItem style={styles.itemContainer}
            insideStyle={styles.itemContainer}
            uri={this.state.collections.length > 2 ? this.state.collections[1].pictureURL : uri}
            radius={8}
            title={'Check-Ins'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onWishList()}>
          <CollectionItem style={styles.itemContainer}
            insideStyle={styles.itemContainer}
            uri={this.state.collections.length > 2 ? this.state.collections[2].pictureURL : uri}
            radius={8}
            title={'Default'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onViewAll()}>
          <CollectionItem style={styles.itemContainer}
            insideStyle={styles.itemContainer}
            uri={uri}
            radius={8}
            title={'+\nView all\nCollections'} />
        </TouchableOpacity>
      </View>
    );
  }
}



//make this component available to the app
export default Collections;
