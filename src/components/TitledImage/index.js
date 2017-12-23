//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

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
  switch(align) {
    case 'center':
      return 'center'
    case 'top':
      return 'flex-start'
    case 'bottom':
      return 'flex-end'
  }
}
function getHAlign(align) {
  switch(align) {
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
  constructor (props) {
    super(props)
    this.state = {
      uri: props.uri || '',
      vAlign: getVAlign(props.vAlign),
      hAlign: getHAlign(props.hAlign)
    }
  }
  
  componentWillReceiveProps (props) {
    this.setState({uri: props.uri})
  }
  render() {
    return (
      <View style={[this.props.style, styles.container,{justifyContent: this.state.vAlign, alignItems:this.state.hAlign}]}>
        <Image source={{uri: this.state.uri}} style={[styles.image, {borderRadius: this.props.radius}]}></Image>
        <Text style={[styles.text, this.props.titleStyle]}>{this.props.title}</Text>
      </View>
    );
  }
}



//make this component available to the app
export default TitledImage;
