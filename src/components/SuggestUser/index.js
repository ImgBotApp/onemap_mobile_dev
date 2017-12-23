// //import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardView  from 'react-native-cardview'
import CircleImage from '@components/CircleImage'

import styles from './style'
import I18n from '@language'
import fontStyles from '@theme/fonts'
import { getDeviceWidth, getDeviceHeight } from '@global'
// create a component
class SuggestUser extends Component {
  constructor (props) {
    super(props)
  }

  _onFollow() {
    this.props.onPress(this.props.id)
  }
  render() {
    return (
      <CardView style={styles.container} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
        <CircleImage style={styles.profileImage} uri={this.props.uri} radius={getDeviceWidth(152)}/>
        <View style={styles.info}>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.name, fontStyles.DFontFamily]}>{this.props.name}</Text>
            <Text style={[fontStyles.DFontFamily, styles.id]}>{'@'}{this.props.id}</Text>
            <View style={styles.separate}></View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={styles.suggest}>{I18n.t('FEED_SUGGESTED_BY_ONEMAP')}</Text>
            <TouchableOpacity>
              <View style={styles.followButton}>
                <Text style={styles.followText}>{I18n.t('FEED_FOLLOW')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </CardView>
    );
  }
}



//make this component available to the app
export default SuggestUser;
