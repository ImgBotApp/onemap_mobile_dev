//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles'
import I18n from '@language'
import { SwipeListView } from 'react-native-swipe-list-view'
import CircleImage from '@components/CircleImage'
import { getDeviceWidth, getDeivceHeight } from '@global'
import { LIGHT_GRAY_COLOR } from '../../theme/colors';

import { graphql } from "react-apollo";
import { GET_FOLLOWERS } from "@graphql/userprofile";
const FOLLOWERS_PER_PAGE = 20;

class FollowerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openedRow: ''
    }
  }

  _keyExtractor = (item, index) => index;

  render() {
    let followerUsers = [];
    if (!this.props.data.loading) {
      followerUsers = this.props.data.User.followers.map((user) => {
        return {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          bio: user.bio ? user.bio : "",
          key: true,//optional
          photoURL: user.photoURL ? user.photoURL : 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
        }
      });
    }
    return (
      <View style={styles.container}>
        <SwipeListView
          keyExtractor={this._keyExtractor}
          style={styles.userList}
          useFlatList
          data={followerUsers}
          renderItem={({ item }) => (
            <View style={styles.userRow}>
              <View style={styles.mainItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={() => this.props.onPress(item)}>
                    <CircleImage style={styles.itemImage} uri={item.photoURL} radius={getDeviceWidth(88)} />
                  </TouchableOpacity>
                  <View style={styles.itemInfo}>
                    <Text style={styles.username}>{item.displayName}</Text>
                    <Text style={styles.bio}>{item.bio}</Text>
                  </View>
                </View>
                {
                  this.state.openedRow != item.key && (
                    <View style={styles.labelContainer}>
                      {/* <View style={styles.followText}>
                      <Text style={styles.followButton}>Follow</Text>
                    </View> */}
                      <Text style={{ color: LIGHT_GRAY_COLOR }}> ••• </Text>
                    </View>
                  )
                }
              </View>
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View>
              <Text>Left</Text>
              <View style={styles.rightHidden}>
                <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }} onPress={() => {
                  this.props.onItemPress(item)
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

const ComponentWithQueries = graphql(GET_FOLLOWERS, {
  options: (props) => ({
    variables: {
      userId: props.userid,
      skip: 0,
      first: FOLLOWERS_PER_PAGE
    }
  })
})
  (FollowerList);
//make this component available to the app
export default ComponentWithQueries;

