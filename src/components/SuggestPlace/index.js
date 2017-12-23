//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview'

import styles from './styles'
import I18n from '@language'
import DFonts from '@theme/fonts'
// create a component
class SuggestPlace extends Component {
  render() {
    return (
      <CardView style={styles.container} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
        <View style={styles.mainContainer}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[styles.mainText, DFonts.DFontFamily]}>{I18n.t('FEED_DO_NOT_MISS')}</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.moreText, DFonts.DFontFamily]}>{I18n.t('FEED_GET_CLOSE')}</Text>
              <TouchableOpacity style={{marginTop: 2}}>
              <View style={styles.button}>
                <Text style={[styles.checkIn, DFonts.DFontFamily]}>{I18n.t('FEED_CHECK_IN')}</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={{uri: this.props.data.uri}} style={styles.image} />
        </View>
      </CardView>
    );
  }
}

// define your styles


//make this component available to the app
export default SuggestPlace;
