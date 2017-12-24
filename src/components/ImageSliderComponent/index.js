//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageSliderView from 'react-native-image-slider';
import styles from './styles'

const data = [
  `https://placeimg.com/640/480/any`,
  `https://placeimg.com/640/480/any`,
  `https://placeimg.com/640/480/any`,
  `https://placeimg.com/640/480/any`,
  `https://placeimg.com/640/480/any`,
]
// create a component
class ImageSlider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: 0
    }
  }
  onPress () {
    this.props.onPress()
  }
  render() {
    return (
      
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress.bind(this)} style={styles.container}>
        </TouchableOpacity>        
        <ImageSliderView
          styles={{width: 100, height: 100}}
          images={data}
          position={this.state.position}
          onPositionChanged={position => this.setState({position})}/>
      </View>
    );
  }
}


//make this component available to the app
export default ImageSlider;
