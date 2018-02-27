//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview'
import styles from './styles'

import { formattedTimeDiffString } from '@global'
import DFonts from '@theme/fonts'
import { fetchThumbFromCloudinary } from '@global/cloudinary'
// create a component
class FeedEvent extends Component {
  render() {
    return (
      <CardView style={styles.container} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
        <View style={styles.mainContainer}>
        <View style={{justifyContent: 'space-between'}}>
          {/* User information */}
          <View style={{flexDirection:'row'}}>
            <Image source={{uri: this.props.data.user.uri?fetchThumbFromCloudinary(this.props.data.user.uri):''}} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={[styles.userName,DFonts.Regular]}>{this.props.data.user.name}</Text>
              <Text style={[styles.update, DFonts.Regular]}>{formattedTimeDiffString(this.props.data.user.updated)}</Text>
            </View>
          </View>
          {/* Place */}
          <View>
            <TouchableOpacity>
              <Text style={[styles.collectionAdd, DFonts.Regular]}>{'Add'}{this.props.data.title}</Text>
              <Text style={[styles.collectionAdd, DFonts.Regular]}>to Collection</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image source={{uri: this.props.data.placeUrl?fetchThumbFromCloudinary(this.props.data.placeUrl):''}} style={styles.eventImage} />
        </View>
      </CardView>
    );
  }
}



//make this component available to the app
export default FeedEvent;
