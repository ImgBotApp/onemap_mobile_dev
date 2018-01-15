//import liraries
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles'
//  Props 
/**
 * @Props
 * 
 * title
 * titleColor
 * uri
 * vAlign
 * hAlign
 */

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
class TitledImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: props.uri || '',
      title: props.title,
      vAlign: getVAlign(props.vAlign),
      hAlign: getHAlign(props.hAlign)
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ uri: props.uri, title: props.title })
  }
  render() {
    return (
      <TouchableOpacity
        style={[this.props.style, styles.container, { justifyContent: this.state.vAlign, alignItems: this.state.hAlign }]}
        onPress={this.props.onPress ? this.props.onPress : null}
        onLongPress={this.props.onLongPress ? this.props.onLongPress : null}
      >
        <Image source={{ uri: this.state.uri }} style={[styles.image, { borderRadius: this.props.radius }]}></Image>
        <Text style={[styles.text, this.props.titleStyle]}>{this.state.title}</Text>
      </TouchableOpacity>
    );
  }
}



//make this component available to the app
export default TitledImage;
