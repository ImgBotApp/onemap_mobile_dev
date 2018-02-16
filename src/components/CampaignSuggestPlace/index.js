//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types'
import styles from './styles'
import I18n from '@language'
import CardView from 'react-native-cardview'

import FontStyle from '../../theme/fonts'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import { getImageFromVideoURL, getMediaTypeFromURL } from '@global/const'
import { fetchThumbFromCloudinary } from '@global/cloudinary'
// create a component
class SuggestPlace extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={[FontStyle.SubContent, styles.PlaceName]} numberOfLines={1}>{this.props.name}</Text>
        {/* <OptimizedFlatList
          keyExtractor={(item, index) => item.uri}
          data={this.props.images}
          horizontal
          renderItem={({ item }) => (
            <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5} style={styles.ImageCard}>
              <Image source={{ uri: item}} style={styles.ItemImage} />
            </CardView>
          )}
        /> */}
        <View style={styles.imageContainer}>
        {
          this.props.images && this.props.images.map((item, index) => {
            return index > 3 && (
              <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5} style={styles.ImageCard} key={index}>
                <Image source={{ uri: item}} style={styles.ItemImage} />
              </CardView>
            )
          })
        }
        </View>
        <View style={styles.DetailPart}>
          <Text style={[FontStyle.SubContent, styles.address]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.address}</Text>
          <TouchableOpacity onPress={() => this.props.onPress(this.props.id)}>
            <View style={styles.ViewMore}>
              <Text style={{color: '#0c80fe', fontSize: 8}}>{I18n.t('PROFILE_VIEW_MORE')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SuggestPlace.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string,
  onPress: PropTypes.func.isRequired
}
//make this component available to the app
export default SuggestPlace;
