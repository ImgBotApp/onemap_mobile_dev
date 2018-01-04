//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, FlatList,TouchableOpacity } from 'react-native';

import styles from './styles'
import I18n from '@language'
import { SwipeListView } from 'react-native-swipe-list-view'
import CircleImage from '@components/CircleImage'
import { getDeviceWidth, getDeivceHeight } from '@global'
import { LIGHT_GRAY_COLOR } from '../../theme/colors';
const data = [
  {
    id: 'a1',
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    id: 'a2',
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    id: 'a3',
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    id: 'a4',
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    id: 'a5',
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  },
  {
    id: 'a6',
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    name: 'test',
    bio:'I am tester'
  }
]
// create a component


class FollowerList extends Component {
  constructor(props) {
    super(props)
    this.state={
      data,
      openedRow: ''
    }
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView 
          keyExtractor={this._keyExtractor}
          style={styles.userList}
          useFlatList
          data={this.state.data}
          renderItem={ (data) => (
            <View style={styles.userRow}>
              <View style={styles.mainItem}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <CircleImage style={styles.itemImage} uri={data.item.photoURL} radius={getDeviceWidth(88)}/>
                  <View style={styles.itemInfo}>
                    <Text style={styles.username}>{data.item.name}</Text>
                    <Text style={styles.bio}>{data.item.bio}</Text>
                  </View>
                </View>
                { 
                  this.state.openedRow != data.item.key && (
                  <View style={styles.labelContainer}>
                    <View style={styles.followText}>
                      <Text style={styles.followButton}>Follow</Text>
                    </View>
                    <Text style={{color: LIGHT_GRAY_COLOR}}> ••• </Text>
                  </View>
                  )
                }
              </View>
            </View>
          )}
          renderHiddenItem={ (data) => (
            <View>
              <Text>Left</Text>
              <View style={styles.rightHidden}>
                <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center'}} onPress={() => {
                  this.props.onItemPress(data.item)
                }}>
                  <Text style={styles.rightHiddenText}>{I18n.t('BLOCKED_STR')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          leftOpenValue={70}
          disableRightSwipe={true}
          rightOpenValue={-75}
          onRowOpen={(rowKey, rowMap) => {
            this.setState({
              openedRow: rowKey
            })
          }}
          onRowClose={(rowKey, rowMap) => {
            this.setState({
              openedRow: ''
            })
          }}
        />
      </View>
    );
  }
}


//make this component available to the app
export default FollowerList;
