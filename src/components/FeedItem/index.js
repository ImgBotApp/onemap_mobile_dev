//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CircleImage from '@components/CircleImage'
import ViewMoreText from '@components/ViewMoreText';
import styles from './styles'
import DFonts from '@theme/fonts'
import { RED_COLOR, LIGHT_GRAY_COLOR } from '@theme/colors';
import { getDeviceWidth, getDeviceHeight, formattedTimeDiffString } from '@global'
import { getImageFromVideoURL, getMediaTypeFromURL } from '@global/const';
import { fetchThumbFromCloudinary } from '@global/cloudinary';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'

// create a component
class FeedItem extends Component {
  constructor(props) {
    super(props)
  }

  _onUserInformation() {
    this.props.onPress(this.props.data);
  }

  onPressItem = () => {
    this.props.onPlace();
  }

  onBookMarker() {
    // this.props.onBookMarker();
    this.props.onPlace();
  }
  render() {
    return (
      <CardView style={styles.container} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
        {/* user information */}

        <View style={styles.userInfo}>
          <TouchableOpacity onPress={this._onUserInformation.bind(this)}>
            <View style={styles.user}>
              <CircleImage style={styles.profileImage} uri={this.props.data.createdBy.photoURL} radius={getDeviceWidth(70)} />
              <View style={styles.userDescription}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.name, DFonts.Title]}>{this.props.data.createdBy.displayName}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.update, DFonts.SubTitle]}>{formattedTimeDiffString(this.props.data.updated)}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onBookMarker.bind(this)}>
            <MaterialCommunityIcons name={this.props.data.bookmark ? "bookmark" : "bookmark-outline"} size={30}
              color={this.props.data.bookmark ? RED_COLOR : LIGHT_GRAY_COLOR} style={{ width: 40, textAlign: 'center', alignSelf: 'flex-start' }} />
          </TouchableOpacity>
        </View>
        {/* Feed Title */}
        <TouchableOpacity onPress={this.onPressItem}>
          <Text style={[DFonts.Title, styles.feedTitle]}>{this.props.data.placeName}</Text>
        </TouchableOpacity>
        {/* Place Image */}
        <View style={styles.feedImages}>
          <OptimizedFlatList
            keyExtractor={(item, index) => item.uri}
            data={this.props.data.images}
            horizontal
            renderItem={({ item }) => (
              <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5} style={styles.FeedImageCard}>
                <TouchableOpacity onPress={this.onPressItem}>
                  <Image source={{ uri: fetchThumbFromCloudinary(getImageFromVideoURL(item.uri)) }} style={styles.feedItemImage} />
                  {
                    getMediaTypeFromURL(item.uri) ?
                      (
                        <Icon name="play-circle-outline" style={styles.playButton} />
                      ) : null
                  }
                </TouchableOpacity>
              </CardView>
            )}
          />
        </View>
        {/* Place Title */}
        <View>
          <Text style={[DFonts.SubContent, styles.placeTitle]}>{this.props.data.title}</Text>
        </View>
        {/* Border Bar */}
        {!!this.props.data.description &&
          <View style={styles.separate} />
        }
        {/* Description */}
        {!!this.props.data.description &&
          <View style={styles.descriptionText}>
            <ViewMoreText
              numberOfLines={3}
              renderViewMore={(onPress) => (<Text onPress={onPress} style={[DFonts.Regular, styles.additionalText]}>read more</Text>)}
              renderViewLess={(onPress) => (<Text onPress={onPress} style={[DFonts.Regular, styles.additionalText]}>read less</Text>)}
              textStyle={styles.description}>
              {this.props.data.description}
            </ViewMoreText>
          </View>
        }
      </CardView>
    );
  }
}


//make this component available to the app
export default FeedItem;
