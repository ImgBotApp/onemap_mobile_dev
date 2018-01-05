//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CollectionItem from '@components/CollectionItem'

import styles from './styles'
// create a component
const uri = 'https://placeimg.com/640/480/nature/grayscale'
class Collections extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.onHearted()}>
          <CollectionItem style={styles.itemContainer} 
            insideStyle={styles.itemContainer} 
            uri={uri}
            radius={8}
            title={'Hearted'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onCheckIns()}>
          <CollectionItem style={styles.itemContainer} 
            insideStyle={styles.itemContainer} 
            uri={uri} 
            radius={8}
            title={'Check-ins'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onWishList()}>
          <CollectionItem style={styles.itemContainer} 
            insideStyle={styles.itemContainer} 
            uri={uri} 
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
