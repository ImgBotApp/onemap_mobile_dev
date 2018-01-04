//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import CircleImage from '@components/CircleImage'

import styles from './style'
import I18n from '@language'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
const data = [
  {
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  }
]

// create a component
class BlockedUser extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    this.state = {
      data,
      modalVisible: false
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event) {
    if(event.type == 'NavBarButtonPress') {
      if(event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }
  _renderModal() {
    return (
      <View style={styles.modalFrame}>
        <View style={styles.modalBody}>
          <Text style={{fontSize: 20, marginBottom: getDeviceHeight(47)}}> {I18n.t('BLOCKED_STR')}: </Text>
          <Text style={{color: '#a1a1a1', textAlign: 'center', padding: 5, fontSize: 12}}>{I18n.t('SETTING_BLOCKED_USER_DESCRIPTION')}</Text>
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity onPress={this._modalHide.bind(this)}>
            <View style={styles.footerButton}>
              <Text style={{fontSize: 20, color: '#007aff'}}>{I18n.t('CANCEL_STR')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._modalHide.bind(this)}>
            <View style={styles.footerButton}>
              <Text style={{fontSize: 20, color: '#fc5151'}}>{I18n.t('BLOCKED_STR')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  _modalHide() {
    this.setState({
      modalVisible: false
    })
  }
  _keyExtractor = (item, index) => index;
  render() {
    return (
      <View style={styles.container}>
        <SwipeListView 
          keyExtractor={this._keyExtractor}
          useFlatList
          style={styles.userList}
          data = {data}
          renderItem={ (data,rowMap) => (
            <View style={styles.userRow}>
              <View style={styles.mainItem}>
                <View style={{flexDirection: 'row'}}>
                <CircleImage style={styles.itemImage} uri={data.item.photoURL} radius={getDeviceWidth(88)}/>
                <View style={styles.itemInfo}>
                  <Text style={styles.username}>{data.item.name}</Text>
                  <Text style={styles.bio}>{data.item.bio}</Text>
                </View>
                </View>
              </View>
            </View>
          )}
          renderHiddenItem={ (data, rowMap) => (
            <View>
              <Text>Left</Text>
              <View style={styles.rightHidden}>
                <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center'}} onPress={() => {
                  this.setState({
                    modalVisible: true
                  })
                }}>
                  <Text style={styles.rightHiddenText}>{I18n.t('BLOCKED_STR')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          leftOpenValue={70}
          disableRightSwipe={true}
          rightOpenValue={-75}
          onRowOpen={(data,secId, rowId) => {
          }}
        />
        <Modal isVisible={this.state.modalVisible}>
          {this._renderModal()}
        </Modal>
      </View>
    );
  }
}



//make this component available to the app
export default BlockedUser;
