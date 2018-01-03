//import liraries
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Text, StyleSheet,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';

import * as GLOBAL from '@global'

// create a component
class RoundButton extends Component {
  constructor (props) {
    super(props)
    this.state ={
      backgroundColor : 'transparent'
    }
  }

  onPressIn () {
    this.setState({
      backgroundColor: this.props.pressColor
    })
  }

  onPressOut () {
    this.setState({
      backgroundColor: 'transparent'
    })
  }

  onPress () {
    this.props.onPress && this.props.onPress()
  }
  render() {
    return (
      <TouchableOpacity 
        activeOpacity={1}
        style={[styles.container, this.props.style, {backgroundColor: this.state.backgroundColor}]} 
        onPressIn={this.onPressIn.bind(this)}
        onPressOut={this.onPressOut.bind(this)}
        onPress={this.onPress.bind(this)}
        disabled={this.props.disabled}
        >
        <Text 
          style={{color: this.state.backgroundColor == this.props.pressColor ? '#fff' : this.props.pressColor,
          fontSize: GLOBAL.MEDIUM
          }}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

RoundButton.PropTypes = {
  pressColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default RoundButton;
