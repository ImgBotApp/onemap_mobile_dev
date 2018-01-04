//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as GLOBAL from '@global'
// create a component
class PrevNavigation extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={styles.arrow} onPress={this.onBack.bind(this)}>
        <View style={styles.container}>
          <Image style={styles.navImage} source={require('@assets/images/login/leftNav.png')} />
        </View>
      </TouchableOpacity>
    );
  }
  onBack () {
    this.props.navigation.goBack()
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft    : GLOBAL.getDeviceWidth(93)
  },
  navImage: {
    width         : GLOBAL.getDeviceWidth(48),
    height        : GLOBAL.getDeviceHeight(37),
    resizeMode    : 'contain'
  }
});

//make this component available to the app
export default PrevNavigation;
