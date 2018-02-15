//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CircleImage from '@components/CircleImage'
import { getDeviceWidth, getDeviceHeight } from '@global'
import DFonts from '@theme/fonts';
import styles from './styles'

class FollowingItem extends Component {

  render() {
    const user = this.props.data;
    let item = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      bio: user.bio ? user.bio : "",
      photoURL: user.photoURL,
    };
    return (
      <TouchableOpacity style={styles.userRow} onPress={this.props.onPress}>
        <View style={styles.mainItem}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={this.props.onPress}>
              <CircleImage style={styles.itemImage} uri={item.photoURL} radius={getDeviceWidth(88)} />
            </TouchableOpacity>
            <View style={styles.itemInfo}>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.username]}>{item.displayName}</Text>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.bio]}>{item.bio}</Text>
            </View>
          </View>
          {/*
          <View style={styles.labelContainer}>
            <TouchableOpacity onPress={this.props.onFollow}>
              <View style={styles.followText}>
                <Text style={[DFonts.Regular, styles.followButton]}>Following</Text>
              </View>
            </TouchableOpacity>
          </View>
          */}
        </View>
      </TouchableOpacity>
    );
  }
}

export default FollowingItem;

