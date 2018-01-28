//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CircleImage from '@components/CircleImage'
import { getDeviceWidth, getDeviceHeight } from '@global'
import styles from './styles'

class FollowingItem extends Component {

  render() {
    const user = this.props.data;
    let item = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      bio: user.bio ? user.bio : "",
      photoURL: user.photoURL ? user.photoURL : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    };
    return (
      <View style={styles.userRow}>
        <View style={styles.mainItem}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={this.props.onPress}>
              <CircleImage style={styles.itemImage} uri={item.photoURL} radius={getDeviceWidth(88)} />
            </TouchableOpacity>
            <View style={styles.itemInfo}>
              <Text style={styles.username}>{item.displayName}</Text>
              <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>
            </View>
          </View>
          <View style={styles.labelContainer}>
            <TouchableOpacity onPress={this.props.onFollow}>
              <View style={styles.followText}>
                <Text style={styles.followButton}>Following</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default FollowingItem;
