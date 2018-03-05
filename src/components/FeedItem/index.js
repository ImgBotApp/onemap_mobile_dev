//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview'
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CircleImage from '@components/CircleImage'
import ViewMoreText from '@components/ViewMoreText';
import { getDeviceWidth, getDeviceHeight, formattedTimeDiffString } from '@global'
import { fetchThumbFromCloudinary } from '@global/cloudinary';
import { getImageFromVideoURL, getMediaTypeFromURL } from '@global/const';
import { RED_COLOR, LIGHT_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts'
import styles from './styles'

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
    const { bookmark, createdBy, description, images, likedByUser, likeStory, placeName, title } = this.props.data;
    const liked = likedByUser && likedByUser.map(item => item.user && item.user.id).includes(this.props.userId);
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
        {/* Place Title */}
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
                        <MaterialCommunityIcons name="play-circle-outline" style={styles.playButton} />
                      ) : null
                  }
                </TouchableOpacity>
              </CardView>
            )}
          />
        </View>
        {/* Story Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: getDeviceHeight(50) }}>
          <Text style={[DFonts.SubContent, styles.placeTitle, { flex: 1 }]}>{this.props.data.title}</Text>
          <Text style={[DFonts.SubTitle, styles.description]}>{likedByUser.length + ' '}</Text>
          <TouchableOpacity onPress={() => this.props.likeStory(!liked)}>
            <FontAwesomeIcons
              color={'#f9c33d'}
              name={liked ? 'star' : 'star-o'}
              size={25}
            />
          </TouchableOpacity>
        </View>
        {/* Border Bar */}
        {!!this.props.data.description &&
          <View style={styles.separate} />
        }
        {/* Story Description */}
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
