//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CollectionItem from '@components/CollectionItem'

import styles from './styles'
// create a component

class Collections extends Component {

  render() {
    return (
      <View style={styles.container}>
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          radius={8}
          title={'Hearted'}
          onPress={() => this.props.onViewItem('like')}
        />
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          radius={8}
          title={'Check-Ins'}
          onPress={() => this.props.onViewItem('check')}
        />
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          radius={8}
          title={'All Stories'}
          onPress={this.props.onViewStories}
        />
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          uri={''}
          radius={8}
          title={this.props.allText ? this.props.allText : '+\nView all\nCollections'}
          onPress={this.props.onViewAll}
        />
      </View>
    );
  }
}



//make this component available to the app
export default Collections;
