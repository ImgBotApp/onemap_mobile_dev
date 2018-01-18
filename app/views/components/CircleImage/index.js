//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'
// create a component
class CircleImage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={this.props.style}>
        <Image source={{ uri: this.props.uri }} style={[styles.image, { borderRadius: this.props.radius }]} />
      </View>
    );
  }
}

// define your styles


//make this component available to the app
export default CircleImage;
