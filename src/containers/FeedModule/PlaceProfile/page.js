//import liraries
import React, { Component, PureComponent } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Keyboard,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';

import CardView from 'react-native-cardview';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modalbox';
import Overlay from 'react-native-modal-overlay';
import Share from 'react-native-share';
import TagInput from 'react-native-tag-input';
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import geolib from 'geolib';

import ActionDialog from '@components/ActionDialog'
import CircleImage from '@components/CircleImage'
import LoadingSpinner from '@components/LoadingSpinner'
import ImageSliderComponent from '@components/ImageSliderComponent'
import TitleImage from '@components/TitledImage'
import ViewMoreText from '@components/ViewMoreText';
import { calculateCount, clone, getDeviceWidth, formattedTimeDiffString, getTimeDiff } from '@global'
import { uploadImage, uploadMedia } from '@global/cloudinary';
import { getImageFromVideoURL, getMediaTypeFromURL } from '@global/const';
import { fetchThumbFromCloudinary } from '@global/cloudinary';
import * as SCREEN from '@global/screenName'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import DFonts from '@theme/fonts'
import I18n from '@language'
import { client } from '@root/main'
import ActionSheet from 'react-native-actionsheet'

import { GET_KEYWORD } from '@graphql/keywords'
import { GET_PLACE_PROFILE } from '@graphql/places'

import styles from './styles'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'

const STORIES_PER_PAGE = 8;

const imagePickerOptions = {
  title: 'Take Media',
  takePhotoButtonTitle: 'Take Camera...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
const MAXWIDTH = 1080;
const MAXHEIGHT = 1920;

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = ['Cancel', 'Photo', 'Video']
const title = 'Select Media Type'

class PlaceProfile extends PureComponent {

  constructor(props) {
    super(props)
    Ionicons.getImageSource('ios-arrow-round-back', 35, DARK_GRAY_COLOR).then(icon => {
      props.navigator.setButtons({
        leftButtons: [{
          icon,
          id: 'backButton',
          disableIconTint: true
        }]
      })
    })
    Ionicons.getImageSource('ios-more', 35, DARK_GRAY_COLOR).then(icon => {
      props.navigator.setButtons({
        rightButtons: [{
          icon,
          id: 'more',
          disableIconTint: true
        }]
      })
    })

    if (props.place) {
      this.props.navigator.setTitle({ title: props.place.placeName });
    }
    this.state = {
      placeData: {
        description: '',
        information: {},
        image: [],
        map: null,
        heartedIds: [],
        checkIns: [],
        collectionIds: [],
        keywords: []
      },
      keywordText: '',
      myStory: {
        story: '',
        title: ''
      },
      sliderShow: false,
      collectionModal: false,
      storyImages: [
        {
          type: 'add'
        }
      ],
      selectedCollections: [],
      selectedMediaData: [],
      selectedCard: 0,
      imageUploading: false,
      storyUpdated: false,
      isOpenImagePicker: false,
      selectedMediaType: ''
    }
    this.loading = false;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.handlePress = this.handlePress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
  }

  componentWillMount() {
    this.getPlaceProfile();
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps.user;
    if (this.state.placeData.locationLat && location && (!this.props.user.location || location.latitude !== this.props.user.location.latitude || location.longitude !== this.props.user.location.longitude)) {
      const distance = geolib.getDistance(location, this.state.placeData.map);
      this.setState({ distance });
    }
  }

  _keyboardDidHide = () => {
    if (this.state.storyUpdated) {
      this.saveStory();
    }
  }

  getPlaceProfile() {
    client.query({
      query: GET_PLACE_PROFILE,
      variables: {
        id: this.props.place.id,
        userId: this.props.user.id,
        oneMapperId: this.props.oneMapperId
      }
    }).then((place) => {
      let data = place.data.Place;

      this.props.navigator.setTitle({ title: data.placeName });

      const myLastChecked = data.checkIns.filter(item => item.user.id === this.props.user.id);
      if (myLastChecked.length) {
        this.lastChecked = myLastChecked[myLastChecked.length - 1].createdAt;
      }

      const myStories = data.stories.filter(item => item.createdBy.id === this.props.user.id);
      this.oneMapperStory = data.stories.filter(item => item.createdBy.id === this.props.oneMapperId)[0];

      if (this.props.user.location) {
        this.state.distance = geolib.getDistance(this.props.user.location, {
          latitude: data.locationLat,
          longitude: data.locationLong
        });
      }

      this.setState({
        placeData: {
          id: data.id,
          title: data.placeName,
          image: data.pictureURL && data.pictureURL.map(item => {
            return {
              uri: item
            }
          }),
          description: data.description,
          map: {
            latitude: data.locationLat,
            longitude: data.locationLong,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          },
          information: {
            address: data.address,
            phoneNumber: data.phoneNumber,
            website: data.website,
            openingHours: [data.openingHrs]
          },
          heartedIds: data.usersLike.map(item => item.id),
          checkIns: data.checkIns,
          collectionIds: this.props.place && this.props.place.collectionIds ? this.props.place.collectionIds : data.collections.map(item => item.id),
          keywords: data.keywords && data.keywords.filter(item => item.createdBy.id === this.props.user.id),
          bookmark: this.isBookmarked(data.collections),
        },
        myStory: myStories.length ? myStories[0] : this.state.myStory,
        storyImages: myStories.length ? [...myStories[0].pictureURL.map(item => ({ uri: item })), ...this.state.storyImages] : this.state.storyImages,
      });
    }).catch(err => alert(err));
  }

  onBookMarker = () => {
    if (this.state.placeData.bookmark) {
      this.removeBookmark();
    } else {
      this.setState({
        collectionModal: true,
        selectedCollections: [],
      });
    }
  }
  isBookmarked(collections) {
    let marked = false;
    collections.forEach(collection => {
      if (this.props.collections.map(item => item.id).includes(collection.id)) {
        marked = true;
      }
    });
    return marked;
  }
  addBookmark(id) {
    let tmp = clone(this.state.selectedCollections);
    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    this.setState({ selectedCollections: tmp });
    this.forceUpdate();
  }
  addBookmarks() {
    let placeData = clone(this.state.placeData);
    placeData.bookmark = true;
    placeData.collectionIds = [...placeData.collectionIds, ...this.state.selectedCollections];
    this.props.addCollectionToPlace({
      variables: {
        id: this.props.place.id,
        collectionIds: placeData.collectionIds
      }
    }).then(places => {
      this.setState({ placeData, collectionModal: false, selectedCollections: [] });
      if (this.props.onPlaceUpdate) {
        let place = clone(this.props.place);
        place.bookmark = true;
        place.collectionIds = placeData.collectionIds;
        this.props.onPlaceUpdate(place);
      }
      client.resetStore();
    });
  }
  removeBookmark() {
    let collectionIds = clone(this.state.placeData.collectionIds);
    collectionIds = collectionIds.filter(id => !this.props.collections.map(collection => collection.id).includes(id));
    this.props.removeCollectionFromPlace({
      variables: {
        id: this.props.place.id,
        collectionIds
      }
    }).then(places => {
      let placeData = clone(this.state.placeData);
      placeData.bookmark = false;
      placeData.collectionIds = collectionIds;
      this.setState({ placeData, collectionModal: false, selectedCollections: [] });

      if (this.props.onPlaceUpdate) {
        let place = clone(this.props.place);
        place.bookmark = false;
        place.collectionIds = collectionIds;
        this.props.onPlaceUpdate(place);
      }
      client.resetStore();
    });
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        if (this.state.storyUpdated) {
          this.saveStory();
        }
        this.props.navigator.pop()
      } else if (event.id == 'more') {
        this.setState({ reportType: 'place' });
        this.reportActionSheet.show();
      }
    }
  }
  onAddCollection = () => {
    this.setState({
      collectionModal: false
    })
    this.props.navigator.push({
      screen: SCREEN.FEED_NEW_COLLECTION,
      title: I18n.t('COLLECTION_CREATE_NEW'),
    })
  }
  _renderItem(data, index, editable) {
    const item = data[index];
    if (item && item.type === 'add') {
      return (
        <TouchableOpacity onPress={() => {
          this.setState({ isOpenImagePicker: true })
        }
        }>
          <CardView style={styles.imageItemContainer} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
            <Image source={require('@assets/images/blankImage.png')} style={styles.imageItem} />
          </CardView>
        </TouchableOpacity>
      )
    }
    return (
      <CardView style={styles.imageItemContainer} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <TouchableOpacity
          onPress={() => this.setState({ sliderShow: true, selectedMediaData: data.filter(item => item.type !== 'add'), selectedCard: index })}
          onLongPress={() => editable && this.deleteImageFromStory(index)}
        >
          <Image source={{ uri: fetchThumbFromCloudinary(getImageFromVideoURL(item.uri)) }} style={styles.imageItem} />
          {
            getMediaTypeFromURL(item.uri) ?
              (
                <MaterialCommunityIcons name="play-circle-outline" style={styles.playButton} />
              ) : null
          }
        </TouchableOpacity>
      </CardView>

    )
  }

  goMapDetail() {
    // this.props.navigation.navigate('MapViewPage')
    this.props.navigator.push({
      screen: SCREEN.MAP_DETAIL_PAGE,
      title: I18n.t('MAPVIEW_TITLE'),
      animated: true,
      passProps: {
        title: this.state.placeData.title,
        address: this.state.placeData.information.address,
        map: this.state.placeData.map
      }
    })
  }

  onHeartClick(hearted) {
    let placeData = clone(this.state.placeData);
    if (hearted) {
      Vibration.vibrate();
      this.props.likePlace({
        variables: {
          id: placeData.id,
          userId: this.props.user.id
        }
      }).then(({ data }) => {
        placeData.heartedIds = data.addToUserLikePlace.likePlacesPlace.usersLike.map(item => item.id);
        this.setState({ placeData });
        client.resetStore();
      }).catch(err => alert(err));
    } else {
      this.props.unlikePlace({
        variables: {
          id: placeData.id,
          userId: this.props.user.id
        }
      }).then(({ data }) => {
        placeData.heartedIds = data.removeFromUserLikePlace.likePlacesPlace.usersLike.map(item => item.id);
        this.setState({ placeData });
        client.resetStore();
      }).catch(err => alert(err));
    }
  }

  onCheckInClick() {
    Vibration.vibrate();
    let placeData = this.state.placeData;
    this.props.checkInPlace({
      variables: {
        placeId: placeData.id,
        userId: this.props.user.id,
        lat: 0,
        lng: 0
      }
    }).then(({ data }) => {
      let checks = clone(placeData.checkIns);
      checks.push(data.createCheckIn);
      this.setState({ placeData: { ...placeData, checkIns: checks } });
      this.lastChecked = data.createCheckIn.createdAt;
      client.resetStore();
      this.props.saveUserInfo({ ...this.props.user, checkIns: [...this.props.user.checkIns, data.createCheckIn.id] });
    }).catch(err => alert(err));
  }

  onShareClick() {
    const shareOptions = {
      // title: this.state.placeData.title,
      message: this.state.placeData.title,
      // url: this.state.placeData.image[0].uri
    };
    Share.open(shareOptions)
      .catch(err => console.log(err));
  }

  renderTitle() {
    return (
      <View style={styles.titleContainer}>
        <Text style={[DFonts.Title, styles.titleText]}>{this.state.placeData.title}</Text>
      </View>
    )
  }

  renderPlaceImages() {
    return (
      <View style={styles.imageContainer}>
        <OptimizedFlatList
          keyExtractor={(item, index) => index}
          extraData={this.state.placeData}
          style={styles.imageFlatList}
          horizontal
          data={this.state.placeData.image}
          renderItem={({ index }) => this._renderItem(this.state.placeData.image, index)}
        />
      </View>
    )
  }

  renderDescription() {
    return (
      <View style={styles.description}>
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={(onPress) => (<Text onPress={onPress} style={styles.additionalText}>read more</Text>)}
          renderViewLess={(onPress) => (<Text onPress={onPress} style={styles.additionalText}>read less</Text>)}
          textStyle={styles.descriptionText}>
          {this.state.placeData.description}
        </ViewMoreText>
      </View>
    )
  }

  renderMapView() {
    return (
      <TouchableOpacity style={styles.mapView} onPress={this.goMapDetail.bind(this)}>
        <View style={styles.mapWrapper}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.state.placeData.map}
            region={this.state.placeData.map}
            scrollEnabled={false}
          >
            {
              this.state.placeData.map ? (
                <MapView.Marker
                  title={this.state.placeData.title}
                  coordinate={this.state.placeData.map}
                  image={Platform.OS == 'android' ? require('@assets/images/map_pin.png') : null}
                >
                  {Platform.OS === 'ios' && (
                    <Image source={require('@assets/images/map_pin.png')} style={styles.mapmarker} />
                  )}
                </MapView.Marker>) : null
            }
          </MapView>
        </View>
      </TouchableOpacity>
    )
  }

  renderInfo() {
    return (
      <View style={styles.informationContainer}>
        <View style={styles.informationLabel}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {I18n.t('PLACE_ADDRESS')}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {I18n.t('PLACE_NUMBER')}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {I18n.t('PLACE_WEBSITE')}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {I18n.t('PLACE_OPENHOUR')}
          </Text>
        </View>
        <View style={styles.informationContent}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {': '}{this.state.placeData.information.address}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {': '}{this.state.placeData.information.phoneNumber}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {': '}{this.state.placeData.information.website}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>
            {': '}{this.state.placeData.information.openingHours}
          </Text>
        </View>
      </View>
    );
  }

  renderInterest() {
    const liked = this.state.placeData.heartedIds.includes(this.props.user.id);
    const checkable = (this.state.distance && this.state.distance < 500) && (!this.lastChecked || getTimeDiff(new Date(this.lastChecked), new Date()) > 20/* * 60*/);
    return (
      <View style={styles.interestContainer}>
        <View style={styles.serparate}></View>
        <View style={styles.buttonInterest}>
          <View style={[styles.itemInterest,{flex:0.3}]}>
            <TouchableOpacity onPress={() => this.onHeartClick(!liked)}>
              <Image source={liked?require('@assets/images/icon/heart.png'):require('@assets/images/icon/heart_inactive.png')} style={styles.actionBtn} />
            </TouchableOpacity>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestText}>{calculateCount(this.state.placeData.heartedIds.length)}</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestLabel}>{I18n.t('PLACE_HEARTED')}</Text>
          </View>
          <View style={[styles.itemInterest,{flex:0.3}]}>
            <TouchableOpacity disabled={!checkable} onPress={this.onCheckInClick.bind(this)}>
              <Image source={checkable?require('@assets/images/icon/check-in.png'):require('@assets/images/icon/check-in_inactive.png')} style={styles.actionBtn} />
            </TouchableOpacity>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestText}>{calculateCount(this.state.placeData.checkIns.length)}</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestLabel}>{I18n.t('PLACE_CHECK_IN')}</Text>
          </View>
          <View style={[styles.itemInterest,{flex:0.4}]}>
            <TouchableOpacity onPress={this.onBookMarker}>
              <Image source={this.state.placeData.bookmark?require('@assets/images/icon/bookmark.png'):require('@assets/images/icon/bookmark_inactive.png')} style={styles.actionBtn} />
            </TouchableOpacity>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestText}>{calculateCount(this.state.placeData.collectionIds.length)}</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestLabel}>{I18n.t('PLACE_BOOKMARK')}</Text>
          </View>
        </View>
      </View >
    )
  }
  renderSliderShow() {
    return (
      <Overlay visible={this.state.sliderShow} closeOnTouchOutside animationType="zoomIn"
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: 0, flex: 1, justifyContent: 'center', alignItems: "center" }}
        childrenWrapperStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: 0, justifyContent: 'center' }}
        onClose={() => this.setState({ sliderShow: false })}
        supportedOrientations={['portrait', 'landscape']}>
        <ImageSliderComponent
          data={this.state.selectedMediaData}
          firstItem={this.state.selectedCard}
          onPress={() => this.setState({ sliderShow: false })}
        />
      </Overlay>
    )
  }

  renderCollectionModal() {
    return (
      <Modal
        style={styles.collectionModal}
        isOpen={this.state.collectionModal}
        backdropPressToClose={true}
        position={'bottom'}
        backdrop={true}
        backdropOpacity={0.5}
        backdropColor={'lightgray'}
        onClosed={() => this.setState({ collectionModal: false })}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={this.onAddCollection}>
            <Text style={styles.plusButton}>{'+'}</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
          <TouchableOpacity disabled={!this.state.selectedCollections.length} onPress={() => this.addBookmarks()}>
            <Text style={styles.plusButton}>{'Done'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separatebar}></View>
        <ScrollView horizontal={true} style={styles.Collections}>
          {this.props.collections
            .map((collection, index) => (
              <TouchableOpacity key={index} style={styles.collectionContainer} onPress={() => this.addBookmark(collection.id)}>
                <TitleImage
                  style={styles.collection}
                  uri={collection.pictureURL}
                  title={collection.name}
                  radius={8}
                  vAlign={'center'}
                  hAlign={'center'}
                  titleStyle={styles.collectionItemTitle}
                  disabled={true}
                />
                {this.state.selectedCollections.includes(collection.id) &&
                  <Ionicons
                    name='ios-checkmark-circle'
                    size={30}
                    style={{ position: 'absolute', backgroundColor: 'transparent' }}
                  />
                }
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Modal>
    )
  }

  renderKeywords() {
    const inputProps = {
      keyboardType: 'default',
      placeholder: 'Keyword',
      autoFocus: false,
      style: {
        fontSize: 14,
        marginVertical: Platform.OS == 'ios' ? 10 : -2,
      },
      onSubmitEditing: this.onSubmitEditing
    };
    return (
      <View style={styles.keyWords}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[DFonts.Title, styles.keywordTitle]}>{I18n.t('PLACE_KEYWORDS')}</Text>
        </View>
        <View style={styles.keywordContainer}>
          <TagInput
            ref={'inputKeyword'}
            value={this.state.placeData.keywords.map(item => item.name)}
            onChange={this.onChangeTags}
            labelExtractor={(tag) => tag}
            text={this.state.keywordText}
            onChangeText={this.onChangeTagText}
            tagContainerStyle={styles.KeywordInput}
            tagTextStyle={[DFonts.SubTitle, styles.keywordTextStyle]}
            tagColor="#5c5a5a"
            tagTextColor="#e9e8eb"
            inputProps={inputProps}
            maxHeight={150}
          />
        </View>
      </View>
    )
  }
  onChangeTagText = (text) => {
    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      if (this.state.keywordText && !this.state.placeData.keywords.map(item => item.name).includes(this.state.keywordText)) {
        this.saveKeyword(this.state.keywordText);
      }
    } else {
      this.setState({ keywordText: text });
    }
  }
  onSubmitEditing = () => {
    const keywords = this.state.placeData.keywords.map(item => item.name);
    if (this.state.keywordText && !keywords.includes(this.state.keywordText)) {
      this.saveKeyword(this.state.keywordText);
    }
  }
  onChangeTags = (tags) => {
    const keywords = this.state.placeData.keywords.map(item => item.name);
    const keyword = keywords.filter(item => tags.indexOf(item) < 0)[0];
    if (keyword) this.deleteKeyword(keywords.indexOf(keyword));
  }
  saveKeyword(name) {
    this.props.addKeyword({
      variables: {
        name,
        places: [this.state.placeData.id],
        userId: this.props.user.id
      }
    }).then(keyword => {
      let placeData = clone(this.state.placeData);
      let keywords = placeData.keywords;
      keywords.push({
        id: keyword.data.createKeyword.id,
        name
      });
      this.setState({ placeData, keywordText: '' });
      client.resetStore();
    }).catch(err => alert(err));
  }
  deleteKeyword(index) {
    let placeData = clone(this.state.placeData);
    let keywords = placeData.keywords;
    this.props.deleteKeyword({
      variables: {
        id: keywords[index].id
      }
    }).then(keyword => {
      keywords.splice(index, 1);
      this.setState({ placeData });
      client.resetStore();
    }).catch(err => alert(err));
  }

  _renderWriteStory() {
    const { imageUploading } = this.state;
    return (
      <CardView style={styles.writeStoryMain} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CircleImage style={styles.storyWriterImage} uri={this.props.user.photoURL} radius={getDeviceWidth(67)} />
          <View style={styles.userDescription}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.storyWriterName]}>{this.props.user.displayName}</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.commentDate]}>{formattedTimeDiffString(this.state.myStory.updatedAt)}</Text>
          </View>
        </View>
        <View style={styles.myImagesContainer}>
          {
            this.state.storyImages.length && this.state.storyImages[0].type === 'add' ?
              (
                <TouchableOpacity onPress={() => {
                  this.setState({ isOpenImagePicker: true })
                }}>
                  <Image style={styles.myImages} source={require('@assets/images/blankImage.png')} />
                  {/* {this.state.imageUploading && <LoadingSpinner />} */}
                </TouchableOpacity>
              ) : (
                <OptimizedFlatList
                  keyExtractor={(item, index) => index}
                  horizontal
                  style={styles.myImages}
                  data={this.state.storyImages}
                  renderItem={({ index }) => this._renderItem(this.state.storyImages, index, true)}
                />
              )
          }
        </View>
        <TextInput
          ref={'inputStoryTitle'}
          style={[DFonts.Title, styles.commentTitle, { width: '100%', marginTop: 10 }]}
          returnKeyType={'done'}
          placeholder={I18n.t('PLACE_TITLE_BOLD')}
          value={this.state.myStory.title}
          onChangeText={text => this.setState({ myStory: { ...this.state.myStory, title: text }, storyUpdated: true })}
        />
        <TextInput
          style={[DFonts.SubTitle, styles.commentDescription, { width: '100%' }]}
          multiline={true}
          placeholder={'What is this story about'}
          value={this.state.myStory.story}
          onChangeText={text => this.setState({ myStory: { ...this.state.myStory, story: text }, storyUpdated: true })}
        />
      </CardView>
    )
  }
  showActionSheet() {
    this.setState({ isOpenImagePicker: false });
    this.ActionSheet.show()
  }

  handlePress(i) {
    this.setState({
      selected: i
    })
    if (i == 2) {
      this.setState({ selectedMediaType: 'video' });
      this.addMediaToStory(true);
    }
    else if (i == 1) {
      this.setState({ selectedMediaType: 'photo' });
      this.addMediaToStory(true);
    }
  }
  async addMediaToStory(isFromCamera) {
    if (this.state.imageUploading)
      return;

    this.setState({ isOpenImagePicker: false });

    let uploadedURLS = [];

    if (isFromCamera) {
      //this.state.selectedMediaType
      console.log("Take Media Mode" + this.state.selectedMediaType);
      ImagePicker.launchCamera({
        mediaType: this.state.selectedMediaType,
        maxWidth: MAXWIDTH,
        maxHeight: MAXHEIGHT,
      }, (response) => {

        if (response.didCancel) {
          console.log('User cancelled image picker');
          Promise.resolve();
        } else if (response.error) {
          alert(response.error)
          console.log('ImagePicker Error: ', response.error);
          Promise.resolve();
        } else {
          this.setState({ imageUploading: true });
          if (this.state.selectedMediaType == 'photo') {
            let source = { uri: response.uri };
            uploadImage(response.data, '#story').then(url => {
              if (url) {
                this.updateStoryImages([url]);
              }
              this.setState({ imageUploading: false });
              Promise.resolve();
            });
          } else {
            uploadMedia(response, '#storyVideo').then(
              url => {
                if (url) {
                  this.updateStoryImages([url]);
                }
                this.setState({ imageUploading: false });
                Promise.resolve();
              }
            );
          }
        }
      });
    }
    else {//image picker
      ImageCropPicker.openPicker({
        width: MAXWIDTH,
        height: MAXHEIGHT,
        cropping: false,
        includeBase64: true,
        includeExif: true,
        multiple: true,
        maxFiles: 10
      }).then(imageArray => {
        if (imageArray && !this.state.imageUploading) {
          this.setState({ imageUploading: true });
          return Promise.all(
            imageArray.map(imgData => {
              ////mime =='image/jpeg', 'video/mp4'
              if (imgData.mime && imgData.mime.substring(0, 5) == 'image') {
                return uploadImage(imgData.data, '#avatar').then(url => {
                  if (url)
                    uploadedURLS.push(url);
                })
              } else if (imgData.mime && imgData.mime.substring(0, 5) == 'video') {
                return uploadMedia({ uri: imgData.path }, '#storyVideo').then(url => {
                  if (url)
                    uploadedURLS.push(url);
                }
                );
              }
              return null;
            }
            )
          );
        }
        else Promise.resolve();
      }).then(() => {
        this.setState({ imageUploading: false });
        if (uploadedURLS.length > 0)
          this.updateStoryImages(uploadedURLS);
        Promise.resolve();
      }, err => {
        Promise.resolve();
        this.setState({ imageUploading: false })
      }).catch(e => { Promise.resolve(); });
    }

  }
  updateStoryImages(imageArray) {
    if (!imageArray)
      return;

    let storyImages = clone(this.state.storyImages);
    storyImages.pop();
    imageArray.forEach(image => { storyImages.push({ 'uri': image }) });
    storyImages.push({ type: 'add' });
    this.setState({ storyImages });
    this.saveStory();
    this.setState({ imageUploading: false });
  }
  deleteImageFromStory(index) {
    Alert.alert(
      I18n.t('PLACE_WRITE_STORY'),
      'Do you want to remove this image?',
      [
        {
          text: 'OK', onPress: () => {
            let storyImages = clone(this.state.storyImages);
            storyImages.splice(index, 1);
            this.state.storyImages = storyImages;
            this.saveStory();
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }
  saveStory() {
    if (this.loading) return;
    else this.loading = true;
    const { myStory } = this.state;
    if (myStory.id) {
      this.props.updateStory({
        variables: {
          id: myStory.id,
          title: myStory.title,
          story: myStory.story,
          pictureURL: this.state.storyImages.map(item => item.uri).filter(item => !!item),
        }
      }).then(res => {
        this.setState({ myStory: res.data.updateStory, storyUpdated: false });
        this.loading = false;
        client.resetStore();
      }).catch(err => {
        this.setState({ storyUpdated: false });
        this.loading = false;
      });
    } else {
      this.props.createStory({
        variables: {
          title: myStory.title,
          story: myStory.story,
          hashtag: [],//TODO
          placeId: this.state.placeData.id,
          createdById: this.props.user.id,
          pictureURL: this.state.storyImages.map(item => item.uri).filter(item => !!item),
          status: 'PUBLISHED',
        }
      }).then(res => {
        this.setState({ myStory: res.data.createStory, storyUpdated: false });
        this.loading = false;
        client.resetStore();
      }).catch(err => {
        this.setState({ storyUpdated: false });
        this.loading = false;
      });
    }
  }

  _renderCommentStory({ item, index }) {
    return (
      <CardView key={index} style={styles.writeStoryMain} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.onPressUserProfile(item.createdBy)}>
            <CircleImage style={styles.storyWriterImage} uri={item.createdBy.photoURL} radius={getDeviceWidth(67)} />
            <View style={styles.userDescription}>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.storyWriterName]}>{item.createdBy.displayName}</Text>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.commentDate]}>{formattedTimeDiffString(item.updatedAt)}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({ reportType: 'story' });
            this.reportStoryId = item.id;
            setTimeout(() => {
              this.reportActionSheet.show();
            });
          }}>
            <Ionicons
              color={DARK_GRAY_COLOR}
              name='ios-more'
              size={35}
            />
          </TouchableOpacity>
        </View>
        <OptimizedFlatList
          keyExtractor={(item, index) => index}
          style={[styles.imageFlatList, { marginTop: 10 }]}
          horizontal
          data={item.pictureURL}
          renderItem={({ index }) => this._renderItem(item.pictureURL.map(url => ({ uri: url })), index)}
        />
        <Text style={[DFonts.Title, styles.commentTitle]}>{item.title}</Text>
        <Text style={[DFonts.SubTitle, styles.commentDescription]}>{item.story}</Text>
      </CardView>
    )
  }

  onPressUserProfile(userInfo) {
    if (userInfo.id === this.props.user.id) {
      this.props.navigator.switchToTab({ tabIndex: 2 });
    } else {
      this.props.navigator.push({
        screen: SCREEN.USERS_PROFILE_PAGE,
        title: I18n.t('PROFILE_PAGE_TITLE'),
        animated: true,
        passProps: {
          userInfo
        }
      })
    }
  }

  onReport = reason => {
    if (this.state.reportType === 'place') {
      this.props.reportPlace({
        variables: {
          placeId: this.state.placeData.id,
          reason,
          userId: this.props.user.id
        }
      }).then(({ data }) => {
        alert(I18n.t('REPORT_THANKS'));
      }).catch(err => alert(err));
    } else {
      this.props.reportStory({
        variables: {
          storyId: this.reportStoryId,
          reason,
          userId: this.props.user.id
        }
      }).then(({ data }) => {
        alert(I18n.t('REPORT_THANKS'));
      }).catch(err => alert(err));
    }
  }

  onEndReached() {
    const { getFollowingStoriesPaginated } = this.props;
    if (!getFollowingStoriesPaginated.loading) {
      getFollowingStoriesPaginated.fetchMore({
        variables: {
          skip: getFollowingStoriesPaginated.allStories.length + STORIES_PER_PAGE,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.allStories.length === 0) {
            return previousResult;
          }
          return {
            allStories: previousResult.allStories.concat(fetchMoreResult.allStories),
          };
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          extraScrollHeight={30}
          keyboardShouldPersistTaps={'handled'}
          style={styles.container}
        >
          {this.renderTitle()}
          {this.renderPlaceImages()}
          {this.renderDescription()}
          {this.renderMapView()}
          {this.renderInfo()}
          {this.renderInterest()}
          {this.renderKeywords()}
          {/* my story */}
          <View style={styles.WriteStory}>
            <Text style={[DFonts.Title, styles.writeStoryTitle]}>{I18n.t('PLACE_WRITE_STORY')}</Text>
            {this._renderWriteStory()}
          </View>
          <View style={[styles.WriteStory, { marginBottom: 15 }]}>
            {/* onemapper story */}
            {this.oneMapperStory && this._renderCommentStory({ item: this.oneMapperStory })}
            {/* following stories */}
            <OptimizedFlatList
              keyExtractor={(item, index) => index}
              data={this.props.getFollowingStoriesPaginated.allStories}
              renderItem={data => this._renderCommentStory(data)}
              onEndReached={() => this.onEndReached()}
            />
          </View>
        </KeyboardAwareScrollView>

        {this.renderSliderShow()}
        {this.renderCollectionModal()}

        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
        <Modal style={styles.modalMediaView} backdrop={true} position={'center'}
          isOpen={this.state.isOpenImagePicker}
          onClosed={() => this.setState({ isOpenImagePicker: false })}
        >
          <View style={styles.modalMediaViewHeader}>
            <Text style={styles.BlockTitle}>{'Take Media'}</Text>
          </View>
          <View style={styles.modalItem}>
            <TouchableOpacity style={styles.modalButton} onPress={this.showActionSheet.bind(this)}>
              <Text style={styles.buttonStr}>{'Take Camera...'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalItem}>
            <TouchableOpacity style={styles.modalButton} onPress={() => this.addMediaToStory(false)}>
              <Text style={styles.buttonStr}>{'Choose from Library...'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalItem}>
            <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ isOpenImagePicker: false })}>
              <Text style={styles.cancelStr}>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <ActionSheet
          ref={o => this.reportActionSheet = o}
          title={'Select Action'}
          options={['Cancel', this.state.reportType === 'place' ? I18n.t('REPORT_PLACE_TITLE') : I18n.t('REPORT_STORY_TITLE')]}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={(index) => index && this.refs.actionDialog.show()}
        />
        <ActionDialog
          ref={'actionDialog'}
          type={this.state.reportType}
          onConfirm={this.onReport}
        />

        {this.state.imageUploading && <LoadingSpinner />}
      </View>
    );
  }
}



//make this component available to the app
export default PlaceProfile;
