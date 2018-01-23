import SideMenu from 'react-native-side-menu'

import MainRoute from './mainRoute/index'
import DrawerMenu from '@containers/sideMenu'
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class MainApplication extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount = () => {

  }
  render() {
    return (
      <SideMenu menu={(<DrawerMenu />)} >
        <MainRoute />
      </SideMenu>
    );
  }
}

//make this component available to the app
export default MainApplication;
