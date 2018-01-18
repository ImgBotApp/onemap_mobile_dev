import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import { styles } from './styles';
import ProfilePage from '../ProfilePage';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedTab: 'home',
    }
  }

  render() {    
    return (
      <View style={styles.container}>
        <TabNavigator
          tabBarStyle={styles.tabContainer}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.home}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.home}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
              <ProfilePage />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.search}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.search}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'search' })}>
            <ProfilePage />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'plus'}
            renderIcon={() => <FontAwesome style={styles.tabPlusIcon}>{Icons.plusCircle}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabPlusIcon}>{Icons.plusCircle}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'plus' })}>
            <ProfilePage />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'notification'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.bellO}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.bellO}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'notification' })}>
            <ProfilePage />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => <FontAwesome style={styles.tabIcon}>{Icons.userO}</FontAwesome>}
            renderSelectedIcon={() => <FontAwesome style={styles.tabSelectIcon}>{Icons.userO}</FontAwesome>}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <ProfilePage />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}