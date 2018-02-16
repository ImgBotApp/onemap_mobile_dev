//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles'
import I18n from '@language'
import { SwipeListView } from 'react-native-swipe-list-view'
import CircleImage from '@components/CircleImage'
import { getDeviceWidth, getDeivceHeight } from '@global'
import { LIGHT_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts';

import { graphql } from "react-apollo";


class FollowerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
          data={this.props.followerUsers}
          renderItem={({ item,index }) => (
            <View style={styles.userRow}>
              <TouchableOpacity style={styles.mainItem}  onPress={() => this.props.onPress(item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={() => this.props.onPress(item)}>
                    <CircleImage style={styles.itemImage} uri={item.photoURL} radius={getDeviceWidth(88)} />
                  </TouchableOpacity>
                  <View style={styles.itemInfo}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.username]}>{item.displayName}</Text>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.bio]}>{item.bio}</Text>
                  </View>
                </View>
                {
                  this.state.openedRow != item.key && (
                    <View style={styles.labelContainer}>
                      {/* <View style={styles.followText}>
                      <Text style={styles.followButton}>Follow</Text>
                    </View> */}
                      {/* <Text style={{ color: LIGHT_GRAY_COLOR }}> ••• </Text> */}
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>
          )}
          renderHiddenItem={({ item,index }) => (
            <View>
              <Text>Left</Text>
              <View style={styles.rightHidden}>
                <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }} onPress={() => {
                  this.props.onItemPress(item)
                }}>
                  <Text style={[DFonts.Title, styles.rightHiddenText]}>{I18n.t('BLOCKED_STR')}</Text>
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
          closeOnRowPress = {true}
          closeOnScroll = {true}
          closeOnRowBeginSwipe = {true}
          previewFirstRow={true}
        />
      </View>
    );
  }
}

//make this component available to the app
export default FollowerList;

