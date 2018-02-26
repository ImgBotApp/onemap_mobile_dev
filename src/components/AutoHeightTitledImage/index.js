//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './styles'
import { EMPTY_IMG } from '@global/const';
import { getDeviceWidth, getDeviceHeight } from '@global'
import DFonts from '@theme/fonts';
import { fetchThumbFromCloudinary } from '@global/cloudinary';
import { getImageFromVideoURL, getMediaTypeFromURL } from '@global/const';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function getVAlign(align) {
  switch (align) {
    case 'center':
      return 'center'
    case 'top':
      return 'flex-start'
    case 'bottom':
      return 'flex-end'
  }
}
function getHAlign(align) {
  switch (align) {
    case 'center':
      return 'center'
    case 'left':
      return 'flex-start'
    case 'right':
      return 'flex-end'
  }
}

// create a component
class AutoHeightTitledImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: props.uri || '',
      vAlign: getVAlign(props.vAlign),
      hAlign: getHAlign(props.hAlign),
      radius: props.radius
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ uri: props.uri })
  }
  render() {
    return (
      <View style={[this.props.style, { justifyContent: this.state.vAlign, alignItems: this.state.hAlign }]}>
        <AutoHeightImage
          imageURL={this.state.uri ? fetchThumbFromCloudinary(getImageFromVideoURL(this.state.uri)): EMPTY_IMG}
          width={getDeviceWidth(375)}
          style={{ borderWidth: 1, borderColor: 'transparent', borderRadius: this.props.radius ? this.props.radius : 8 }}
        />
        <View style={{ position: 'absolute', width: getDeviceWidth(375), bottom: 0, alignItems: 'center' }}>
          {
            getMediaTypeFromURL(this.state.uri) ?
              (
                <Icon name="play-circle-outline" style={styles.playButton} />
              ) : null
          }
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[DFonts.Regular, styles.text, this.props.titleStyle]}
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

// define your styles


//make this component available to the app
export default AutoHeightTitledImage;