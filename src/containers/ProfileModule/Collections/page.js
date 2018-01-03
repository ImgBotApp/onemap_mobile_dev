//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Tabs from 'react-native-tabs';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './styles'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
import * as SCREEN from '../../../global/screenName'
import I18n from '@language'
const map= {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421,
}
const stories= [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
]
// create a component
class Collections extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor(props) {
    super(props)
    this.state = {
      page: 'Hearted View'
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }
  _renderTabHeader(text) {
    return (
      <Text name={text} style={styles.TabText} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>      
    )
  }
  onCollectionItem (data) {
    // this.props.navigator.push({
    //   screen: SCREEN.FEED_ALL_COLLECTION,
    //   title: I18n.t('COLLECTION_TITLE'),
    //   animated: true
    // })
  }
  _renderStoryItem (data, mode) {
    if (data.index % 3 == mode )
      return (
        <View>
          <TouchableOpacity onPress={() => this.onCollectionItem(data)}>
            <AutoHeightTitledImage uri={data.item.uri}
              width={getDeviceWidth(343)}
              title={'abcd'} vAlign={'center'} radius={8} hAlign={'left'} titleStyle={styles.storyItemTitle}
              style={{marginBottom: 10}}
            />
          </TouchableOpacity>
        </View>
      )
  }
  _keyExtractor = (item, index) => index;

  _renderHeartedView () {
    return (
      <View style={styles.Stories}>
        <View style={styles.subStory}>
          <FlatList 
            data={stories}
            keyExtractor={this._keyExtractor}
            renderItem={(data) => { 
              return this._renderStoryItem(data, 0)
            }}
          />          
        </View>
        
        <View style={styles.subStory}>
        <FlatList 
            data={stories}
            keyExtractor={this._keyExtractor}
            renderItem={(data) => { 
              return this._renderStoryItem(data, 1)
            }}
          />  
        </View>
        <View style={styles.subStory}>
        <FlatList 
            data={stories}
            keyExtractor={this._keyExtractor}
            renderItem={(data) => { 
              return this._renderStoryItem(data, 2)
            }}
          />  
        </View>
      </View>
    )
  }

  _renderMapView () {
    return (
      <View style={styles.mapView}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={map}
          region={map}
        >
          <MapView.Marker
            image={require('@assets/images/marker.png')}
            coordinate={map}
          />
        </MapView>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Tabs selected={this.state.page} style={styles.tabHeader}
                selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
              {this._renderTabHeader('Hearted View')}
              {this._renderTabHeader('Map View')}
          </Tabs>
        </View>
        <ScrollView style={styles.CollectionContainer}>
        {
          this.state.page == 'Hearted View' ? this._renderHeartedView() : this._renderMapView()
        }
        </ScrollView>
      </View>
    );
  }
}



//make this component available to the app
export default Collections;
