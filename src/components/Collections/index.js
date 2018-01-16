//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CollectionItem from '@components/CollectionItem'

import styles from './styles'
// create a component

class Collections extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collections: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collections.length > 2 && nextProps.collections !== this.props.collections) {
      let collections = {};
      collections.hearted = nextProps.collections.filter(item => item.type === 'HEARTED')[0];
      collections.checkedin = nextProps.collections.filter(item => item.type == 'CHECKED_IN')[0];
      collections.default = nextProps.collections.filter(item => item.type == 'DEFAULT')[0];
      this.setState({ collections });
    }
  }

  render() {
    const { collections } = this.state;
    return (
      <View style={styles.container}>
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          uri={collections.hearted ? collections.hearted.pictureURL : null}
          radius={8}
          title={'Hearted'}
          onPress={() => collections.hearted && this.props.onHearted(collections.hearted)}
        />
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          uri={collections.checkedin ? collections.checkedin.pictureURL : null}
          radius={8}
          title={'Check-Ins'}
          onPress={() => collections.checkedin && this.props.onCheckIns(collections.checkedin)}
        />
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          uri={collections.default > 2 ? collections.default.pictureURL : null}
          radius={8}
          title={'Default'}
          onPress={() => collections.default && this.props.onWishList(collections.default)}
        />
        <CollectionItem style={styles.itemContainer}
          insideStyle={styles.itemContainer}
          uri={''}
          radius={8}
          title={'+\nView all\nCollections'}
          onPress={() => this.props.onViewAll()}
        />
      </View>
    );
  }
}



//make this component available to the app
export default Collections;
