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
import TabNavigator from 'react-native-tab-navigator';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import { Icon } from 'react-native-elements'

import Navigation from '../Navigation';
import CampaignPage from '@pages/CampaignPage';
import { styles } from './styles';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedTab: 'home',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation {...this.props} />
        <TabNavigator
          tabBarStyle={styles.tabContainer}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.home}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.home}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
              {this.props.children}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.search}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.search}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'search' })}>
            <View></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'plus'}
            renderIcon={() => <View style={styles.tabPlusIcon}><Text style={styles.tabPlusIconText}>+</Text></View>}
            renderSelectedIcon={() => <View style={styles.tabPlusIcon}><Text style={styles.tabPlusIconText}>+</Text></View>}
            onPress={() => this.setState({ selectedTab: 'plus' })}>
            <View></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'notification'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.bellO}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.bellO}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'notification' })}>
            <View></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.userO}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.userO}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <View></View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

export default Container