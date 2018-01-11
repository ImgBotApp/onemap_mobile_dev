//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CircleImage from '@components/CircleImage'
import { getDeviceWidth, getDeviceHeight } from '@global'
import styles from './styles'

import { graphql } from "react-apollo";
import { GET_SUGGEST_USERS } from "@graphql/userprofile";
const FOLLOWINGS_PER_PAGE = 20;

// create a component
class FollowingList extends Component {
  _keyExtractor = (item, index) => item.id;
  render() {
    let followingUsers = [];
    if (!this.props.data.loading) {
      followingUsers = this.props.data.allUsers.map((user) => {
        return {
          id:user.id,
          displayName:user.displayName,
          email:user.email,
          bio:user.bio?user.bio:"",
          photoURL:user.photoURL ? user.photoURL:'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
        }
      });
    }
    return (
      <View style={styles.container}>
        <FlatList 
          keyExtractor={this._keyExtractor}
          data={followingUsers}
          renderItem={(data) => 
          <View style={styles.userRow}>
            <View style={styles.mainItem}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CircleImage style={styles.itemImage} uri={data.item.photoURL} radius={getDeviceWidth(88)}/>
                <View style={styles.itemInfo}>
                  <Text style={styles.username}>{data.item.displayName}</Text>
                  <Text style={styles.bio} numberOfLines={2}>{data.item.bio}</Text>
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
const ComponentWithQueries = graphql(GET_SUGGEST_USERS, {
  options: (props) => ({
    variables: {
      currentUserId: props.userid,
      skip: 0,
      first: FOLLOWINGS_PER_PAGE,
      currentUserFollowsIds:[],
      currentUserBlockByUsersIds:[],
    }
  })
})
  (FollowingList);
//make this component available to the app
export default ComponentWithQueries;

