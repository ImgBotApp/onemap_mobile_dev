//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CircleImage from '@components/CircleImage'
import { getDeviceWidth, getDeviceHeight } from '@global'
import styles from './styles'
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
class FollowingList extends Component {
  _keyExtractor = (item, index) => item.id;
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          keyExtractor={this._keyExtractor}
          data={data}
          renderItem={(data) => 
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
                (
                <View style={styles.labelContainer}>
                  <TouchableOpacity onPress={() => this.props.onFollowing(data)}>
                    <View style={styles.followText}>
                      <Text style={styles.followButton}>Follwoing</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                )
              }
            </View>
          </View>}
        />
      </View>
    );
  }
}

//make this component available to the app
export default FollowingList;
