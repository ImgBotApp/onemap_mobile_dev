//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview'
import ViewMoreText from 'react-native-view-more-text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CircleImage from '@components/CircleImage'
import styles from './styles'
import DFonts from '@theme/fonts'
import { RED_COLOR, LIGHT_GRAY_COLOR } from '../../theme/colors';
import { getDeviceWidth, getDeviceHeight, calculateDuration } from '@global'
import { EMPTY_IMG } from '@global/const';
import { getThumlnailFromVideoURL,getMediatTypeFromURL } from '@global/const';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// create a component
class FeedItem extends Component {
  constructor(props) {
    super(props)
  }

  _onUserInformation() {
    this.props.onPress(this.props.data);
  }

  _onPlaceImagePress() {
    this.props.onPlace();
  }

  onBookMarker() {
    this.props.onBookMarker();
  }
  render() {
    return (
      <CardView style={styles.container} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
        {/* user information */}

        <View style={styles.userInfo}>
          <TouchableOpacity onPress={this._onUserInformation.bind(this)}>
            <View style={styles.user}>
              <CircleImage style={styles.profileImage} uri={this.props.data.user.uri?this.props.data.user.uri:EMPTY_IMG} radius={getDeviceWidth(70)} />
              <View style={styles.userDescription}>
                <Text style={[styles.name, DFonts.DFontFamily]}>{this.props.data.user.name}</Text>
                <Text style={[styles.update, DFonts.DFontFamily]}>{calculateDuration(this.props.data.user.updated)}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onBookMarker.bind(this)}>
            <MaterialCommunityIcons name={this.props.data.bookmark ? "bookmark" : "bookmark-outline"} size={30}
              color={this.props.data.bookmark ? RED_COLOR : LIGHT_GRAY_COLOR} />
          </TouchableOpacity>
        </View>
        {/* Feed Title */}
        <View>
          <Text style={[styles.feedTitle, DFonts.DFontFamily]}>{this.props.data.feedTitle}</Text>
        </View>
        {/* Place Image */}
        <View style={styles.feedImages}>
          <FlatList
            keyExtractor={(item, index) => index}
            data={this.props.data.images}
            horizontal
            renderItem={({ item }) => (
              <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5} style={styles.FeedImageCard}>
                <TouchableOpacity onPress={this._onPlaceImagePress.bind(this)}>
                  <Image source={{ uri: getThumlnailFromVideoURL(item.uri) }} style={styles.feedItemImage} />
                  {
                    getMediatTypeFromURL(item.uri)?
                    (
                      <Icon name="play-circle-outline" style={styles.playButton}/>
                    ):null
                  }
                </TouchableOpacity>
              </CardView>
            )}
          />
        </View>
        {/* Place Title */}
        <View>
          <Text style={[styles.placeTitle, DFonts.DFontFamily]}>{this.props.data.place}</Text>
        </View>
        {/* Border Bar */}
        <View style={styles.separate}></View>
        {/* Description */}
        <View style={styles.descriptionText}>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={(onPress) => (<Text onPress={onPress} style={styles.additionalText}>read more</Text>)}
            renderViewLess={(onPress) => (<Text onPress={onPress} style={styles.additionalText}>read less</Text>)}
            textStyle={styles.description}>
            <Text style={DFonts.DFontFamily}>
              {this.props.data.description}
            </Text>
          </ViewMoreText>
        </View>
      </CardView>
    );
  }
}


//make this component available to the app
export default FeedItem;