//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  ListView ,
  FlatList
} from 'react-native';

import styles from './styles'
import * as commonStyles from '@global/styles/commonStyles';
import Carousel from 'react-native-snap-carousel';

// create a component
class ImageSlider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: 0
    }
  }
  
  _renderItem({item, index}) {
    return (
      <View key={index}  style={styles.imageView}>
        <Image source={{uri: item}} style={styles.image} />
      </View>
    )
  }

  render() {
    const {data, offset} = this.props;
    return (
      <ScrollView
        ref={(scrollView) => { this._scrollView = scrollView; }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        bounces={false}
        scrollsToTop={false}
        style={{paddingHorizontal: offset.padding}}
      >
      {data.map((item, index) => (
        <View key={index} style={[styles.imageView, {width: offset.w, height: offset.h}]}>
          <Image source={{uri: item}} style={styles.image} />  
        </View>
      ))}
      </ScrollView>
    );
  }
}


//make this component available to the app
export default ImageSlider;
