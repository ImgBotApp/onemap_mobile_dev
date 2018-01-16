
//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import GridView from 'react-native-gridview'
import TitleImage from '@components/TitledImage'
import CollectionItem from '@components/CollectionItem'
import styles from './styles'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
import * as SCREEN from '@global/screenName';
import { clone } from '@global';
import I18n from '@language';
const itemsPerRow = 3

const imagePlaceholder = 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg';

var $this
// create a component
class AllCollections extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ],
    rightButtons: [
      {
        title: '+',
        id: 'add',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor(props) {
    super(props)
    this.state = {
      collections: props.collections
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop({})
      }
      if (event.id == 'add') {
        this.props.navigator.push({
          screen: SCREEN.FEED_NEW_COLLECTION,
          title: I18n.t('COLLECTION_CREATE_NEW'),
          passProps: {
            refresh: this.onRefresh,
            collections: this.state.collections
          }
        })
      }
    }
  }
  onItemPress(item) {
    this.props.navigator.push({
      screen: SCREEN.COLLECTIONS_PAGE,
      animated: true,
      passProps: {
        collection: item
      }
    })
  }
  onItemRemove(item) {
    Alert.alert(
      item.name,
      'Do you want to remove this?',
      [
        { text: 'OK', onPress: () => this.deleteUserCollection(item.id) },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }
  onRefresh = (collections) => {
    this.setState({ collections });
    if (this.props.refresh) this.props.refresh(collections);
  }
  deleteUserCollection(id) {
    this.props.deleteUserCollection({
      variables: {
        id
      }
    }).then(collection => {
      let collections = this.state.collections.filter(item => item.id !== id);
      this.onRefresh(collections);
    })
  }
  render() {
    return (
      <ScrollView style={styles.main}>
        <View style={styles.container}>

          {
            this.state.collections
              // .filter(collection => collection.type === 'USER')
              .map((item, index) => {
                return (
                  <CollectionItem
                    key={index}
                    style={styles.cell}
                    insideStyle={styles.collection}
                    uri={item.pictureURL ? item.pictureURL : imagePlaceholder}
                    title={item.name}
                    radius={8}
                    onPress={() => this.onItemPress(item)}
                    onLongPress={() => item.type === 'USER' && this.onItemRemove(item)}
                  />
                )
              })
          }

        </View>
      </ScrollView>
    );
  }
}


//make this component available to the app
export default AllCollections;
