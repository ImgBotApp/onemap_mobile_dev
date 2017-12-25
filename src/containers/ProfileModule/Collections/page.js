//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Tabs from 'react-native-tabs';
import AutoHeightTitledImage from '@components/AutoHeightTitledImage'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './styles'
import { getDeviceWidth, getDeviceHeight } from '@global'
const map= {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421,
}
const stories= [
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    ]
  },
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
    ]
  },
  {
    items: [
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_scale,w_1342/v1512354244/fguqcicplirbfl6fhh0o.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      {uri : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_1544,w_1146/v1512300247/tno52ejrenimshhspntk.jpg'},
    ]
  }
]
// create a component
class Collections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'Hearted View'
    }
  }
  _renderTabHeader(text) {
    return (
      <Text name={text} style={styles.TabText} selectedIconStyle={styles.TabSelected} selectedStyle={styles.TabSelectedText}>{text}</Text>      
    )
  }
  _renderStoryItem (item) {
    return (
      <View>
        <AutoHeightTitledImage uri={item.uri}
          width={getDeviceWidth(343)}
          title={'abcd'} vAlign={'center'} radius={8} hAlign={'left'} titleStyle={styles.storyItemTitle}
          style={{marginBottom: 10}}
        />
      </View>
    )
  }
  _renderHeartedView () {
    return (
      <View style={styles.Stories}>
        <View style={styles.subStory}>
          <FlatList 
            data={stories[0].items}
            renderItem={({item}) => { return this._renderStoryItem(item)} }
          />          
        </View>
        
        <View style={styles.subStory}>
          <FlatList 
            data={stories[1].items}
            renderItem={({item}) => { return this._renderStoryItem(item)} }
          />  
        </View>
        <View style={styles.subStory}>
          <FlatList 
            data={stories[2].items}
            renderItem={({item}) => { return this._renderStoryItem(item)} }
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
