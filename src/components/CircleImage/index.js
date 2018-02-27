//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'
import { fetchThumbFromCloudinary } from '@global/cloudinary';
import PropTypes from 'prop-types'

// create a component
class CircleImage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={this.props.style}>
        {this.props.uri ?
          <Image
            source={{ uri: this.props.uri ? fetchThumbFromCloudinary(this.props.uri) : '' }}
            style={[styles.image, { borderRadius: this.props.radius }]}
          />
          :
          <View
            style={[styles.imagePlaceholder, { borderRadius: this.props.radius }]}
          />
        }
      </View>
    );
  }
}

CircleImage.propTypes = {
  uri: PropTypes.string,
  radius: PropTypes.number
}


//make this component available to the app
export default CircleImage;
