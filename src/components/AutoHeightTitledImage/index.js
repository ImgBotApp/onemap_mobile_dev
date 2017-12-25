//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './styles'

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
class AutoHeightTitledImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uri: props.uri || '',
      vAlign: getVAlign(props.vAlign),
      hAlign: getHAlign(props.hAlign),
      radius: props.radius
    }
  }
  
  componentWillReceiveProps (props) {
    this.setState({uri: props.uri})
  }
  render() {
    return (
      <View style={[this.props.style, styles.container,{justifyContent: this.state.vAlign, alignItems:this.state.hAlign}]}>
        <AutoHeightImage imageURL={this.state.uri} width={this.props.width} style={{borderWidth: 1, borderColor: 'transparent', borderRadius: this.props.radius ? this.props.radius : 8}}/>
        <Text style={[styles.text, this.props.titleStyle]}>{this.props.title}</Text>
      </View>
    );
  }
}

// define your styles


//make this component available to the app
export default AutoHeightTitledImage;