//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from './styles'

/**
 * Array Item
 * 
 * id
 * title
 * uri
 */
// create a component
class StoryBoard extends Component {
  constructor(props) {
    super(props)
    this.state={
      data: props.data
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>StoryBoard</Text>
      </View>
    );
  }
}


//make this component available to the app
export default StoryBoard;
