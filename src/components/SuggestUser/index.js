// //import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview'
import CircleImage from '@components/CircleImage'

import styles from './style'
import I18n from '@language'
import DFonts from '@theme/fonts'
import { getDeviceWidth, getDeviceHeight } from '@global'
// create a component
class SuggestUser extends Component {
  constructor(props) {
    super(props)
  }

  _onFollow() {
    // this.props.onPress(this.props.id)
  }
  render() {
    const { photoURL, username, displayName } = this.props.data;
    return (
      <CardView style={styles.container} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
        <TouchableOpacity onPress={this.props.onPress}>
          <CircleImage style={styles.profileImage} uri={photoURL} radius={getDeviceWidth(152)} />
        </TouchableOpacity>
        <View style={styles.info}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={this.props.onPress}>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.name, DFonts.Title]}>{displayName}</Text>
            </TouchableOpacity>
            <Text style={[DFonts.SubTitle, styles.id]}>{username}</Text>
            <View style={styles.separate}></View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[DFonts.SubTitle, styles.suggest]}>{I18n.t('FEED_SUGGESTED_BY_ONEMAP')}</Text>
            <TouchableOpacity>
              <View style={styles.followButton}>
                <Text style={[DFonts.Title, styles.followText]}>{I18n.t('FEED_FOLLOW')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </CardView >
    );
  }
}



//make this component available to the app
export default SuggestUser;
