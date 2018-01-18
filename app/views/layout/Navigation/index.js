'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  findNodeHandle,  
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import { styles } from './styles';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  onBack() {
    Actions.pop();
  }
  onSettings() {

  }

  render() {
    const {title} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={()=>this.onBack()}>
            <View style={styles.backIconWrapper}>
              <FontAwesome style={styles.backIcon}>{Icons.angleLeft}</FontAwesome>
            </View>
          </TouchableOpacity>
          <Text style={styles.menuTitle}>{title}</Text>
          <TouchableOpacity onPress={()=>this.onSettings()}>
            <View style={styles.backIconWrapper}>
              <FontAwesome style={styles.backIcon}>{Icons.gear}</FontAwesome>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Navigation