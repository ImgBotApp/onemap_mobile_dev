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
  static navigatorButtons = {
    leftButtons: [
      {
        title: '',
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ],
    // rightButtons: [
    //   {
    //     title: '',
    //     buttonColor: DARK_GRAY_COLOR,
    //     id: 'more',
    //     disableIconTint: true
    //   }
    // ]
  };
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
    // Ionicons.getImageSource('ios-more', 35, DARK_GRAY_COLOR).then(icon => {
    //   props.navigator.setButtons({
    //     rightButtons: [{
    //       icon,
    //       id: 'more',
    //       disableIconTint: true
    //     }]
    //   })
    // })
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
        keywords: [],
        comments: [],
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
      isOpenImagePicker:false,
      selectedMediaType:''
    }
    this.loading = false;
    this.props.navigator.setOnNavigatorEvent(this.onNaviagtorEvent.bind(this));
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
        createdById: this.props.place.createdBy.id 
      }
    }).then((place) => {
      let data = place.data.Place;

      this.props.navigator.setTitle({ title: data.placeName });

      const myStories = data.stories.filter(item => item.createdBy.id === this.props.user.id);
      const ownerStories = data.stories.filter(item => item.createdBy.id === data.createdBy.id);
      const otherStories = data.stories.filter(item => !myStories.includes(item) && !ownerStories.includes(item));
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
          comments: [...ownerStories, ...otherStories],
          bookmark: this.isBookmarked(data.collections),
        },
        myStory: myStories.length ? myStories[0] : this.state.myStory,
        storyImages: myStories.length ? [...myStories[0].pictureURL.map(item => ({ uri: item })), ...this.state.storyImages] : this.state.storyImages
      });
      const myLastChecked = data.checkIns.filter(item => item.user.id === this.props.user.id);
      if (myLastChecked.length) {
        this.lastChecked = myLastChecked[myLastChecked.length - 1].createdAt;
      }
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
  onNaviagtorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        if (this.state.storyUpdated) {
          this.saveStory();
        }
        this.props.navigator.pop()
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
  _renderItem(data, index) {
    const item = data[index];
    if (item && item.type === 'add') {
      return (
        <TouchableOpacity onPress={()=>
          {
            this.setState({isOpenImagePicker:true})
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
          onLongPress={() => this.deleteImageFromStory(index)}
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
    let hearts = placeData.heartedIds;
    if (hearted) {
      Vibration.vibrate();
      hearts.push(this.props.user.id);
    } else {
      const index = hearts.indexOf(this.props.user.id);
      hearts.splice(index, 1);
    }

    this.props.likePlace({
      variables: {
        id: placeData.id,
        heartedIds: hearts
      }
    }).then(({ data }) => {
      this.setState({ placeData });
      client.resetStore();
    }).catch(err => alert(err));
  }

  onCheckInClick() {
    if (this.lastChecked && (getTimeDiff(new Date(this.lastChecked), new Date()) < 20/* 60*/)) {// 20 min
      alert('You have to wait 20 min after last check-in');
      return;
    }
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
        <TouchableOpacity onPress={this.onBookMarker}>
          <MaterialCommunityIcons name={this.state.placeData.bookmark ? "bookmark" : "bookmark-outline"} size={30}
            color={this.state.placeData.bookmark ? RED_COLOR : LIGHT_GRAY_COLOR} style={{marginTop:3}}/>
        </TouchableOpacity>
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
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>{I18n.t('PLACE_ADDRESS')}{`\t\t\t: `}{this.state.placeData.information.address}</Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>{I18n.t('PLACE_NUMBER')}{`\t: `}{this.state.placeData.information.phoneNumber}</Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>{I18n.t('PLACE_WEBSITE')}{`\t\t\t: `}{this.state.placeData.information.website}</Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.informationText}>{I18n.t('PLACE_OPENHOUR')}{`\t: `}{this.state.placeData.information.openingHours}</Text>
      </View>
    )
  }

  renderInterest() {
    const liked = this.state.placeData.heartedIds.includes(this.props.user.id);
    return (
      <View style={styles.interestContainer}>
        <View style={styles.interestInformation}>
          <View style={[styles.interestItem,{flex:0.25}]}>
            <Foundation name="heart" size={15} color={RED_COLOR} />
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestText}>{calculateCount(this.state.placeData.heartedIds.length)}{' '}{I18n.t('PLACE_HEARTED')}</Text>
          </View>
          <View style={[styles.interestItem,{flex:0.25}]}>
            <Foundation name="marker" size={15} color={BLUE_COLOR} />
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestText}>{calculateCount(this.state.placeData.checkIns.length)}{' '}{I18n.t('PLACE_CHECK_IN')}</Text>
          </View>
          <View style={[styles.interestItem,{flex:0.5}]}>
            <Foundation name="bookmark" size={15} color={RED_COLOR} />
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.interestText}>{calculateCount(this.state.placeData.collectionIds.length)}{' '}{I18n.t('PLACE_BOOKMARK')}</Text>
          </View>
        </View>
        <View style={styles.serparate}></View>
        <View style={styles.buttonInterest}>
          <TouchableOpacity onPress={() => this.onHeartClick(!liked)}>
            <Foundation name="heart" size={35} color={liked ? RED_COLOR : LIGHT_GRAY_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onCheckInClick.bind(this)}>
            <Foundation name="marker" size={35} color={BLUE_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onShareClick.bind(this)}>
            <Foundation name="share" size={35} color={GREEN_COLOR} />
          </TouchableOpacity>
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
                <TouchableOpacity onPress={()=>{
                  this.setState({isOpenImagePicker:true})
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
                  renderItem={({ index }) => this._renderItem(this.state.storyImages, index)}
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
    this.setState({isOpenImagePicker:false});
    this.ActionSheet.show()
  }

  handlePress(i) {
    this.setState({
      selected: i
    })
    if (i == 2) {
      this.setState({selectedMediaType:'video'});
      this.addMediaToStory(true);
    }
    else if (i == 1) {
      this.setState({selectedMediaType:'photo'});
      this.addMediaToStory(true);
    }
  }
  async addMediaToStory(isFromCamera) {
    if(this.state.imageUploading)
      return;

    this.setState({isOpenImagePicker:false});
    
    let uploadedURLS = [];
          
    if(isFromCamera)
    {
      //this.state.selectedMediaType
      console.log("Take Media Mode"+this.state.selectedMediaType);
      ImagePicker.launchCamera({
        mediaType:this.state.selectedMediaType,
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
    else{//image picker
        ImageCropPicker.openPicker({
          width: MAXWIDTH,
          height: MAXHEIGHT,
          cropping: false,
          includeBase64: true,
          includeExif: true,
          multiple:true,
          maxFiles:10
        }).then(imageArray => {
          if(imageArray && !this.state.imageUploading)
          {
            this.setState({ imageUploading: true });
            return Promise.all(
              imageArray.map(imgData =>
                {
                  ////mime =='image/jpeg', 'video/mp4'
                  if(imgData.mime && imgData.mime.substring(0,5)=='image')
                  {
                    return uploadImage(imgData.data, '#avatar').then(url => {
                      if (url)
                        uploadedURLS.push(url);
                    })
                  }else if(imgData.mime && imgData.mime.substring(0,5)=='video'){
                    return uploadMedia({uri:imgData.path}, '#storyVideo').then(url => {
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
          if(uploadedURLS.length > 0)
            this.updateStoryImages(uploadedURLS);
          Promise.resolve();
        }, err => { 
          Promise.resolve();
          this.setState({ imageUploading: false }) 
        }).catch(e=> { Promise.resolve(); });
      }
    
  }
  updateStoryImages(imageArray){
    if(!imageArray)
      return;

    let storyImages = clone(this.state.storyImages);
    storyImages.pop();
    imageArray.forEach(image=>{storyImages.push({ 'uri': image })});
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

  _renderCommentStory() {
    return this.state.placeData.comments
      .filter(comment => comment.createdBy.id !== this.props.user.id)
      .map((dataItem, index) => {
        return (
          <CardView key={index} style={styles.writeStoryMain} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
            <View style={{ flexDirection: 'row' }}>
              <CircleImage style={styles.storyWriterImage} uri={dataItem.createdBy.photoURL} radius={getDeviceWidth(67)} />
              <View style={styles.userDescription}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.Title, styles.storyWriterName]}>{dataItem.createdBy.displayName}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[DFonts.SubTitle, styles.commentDate]}>{formattedTimeDiffString(dataItem.updatedAt)}</Text>
              </View>
            </View>
            <OptimizedFlatList
              keyExtractor={(item, index) => index}
              style={[styles.imageFlatList, { marginTop: 10 }]}
              horizontal
              data={dataItem.pictureURL}
              renderItem={({ index }) => this._renderItem(dataItem.pictureURL.map(item => ({ uri: item })), index)}
            />
            <Text style={[DFonts.Title, styles.commentTitle]}>{dataItem.title}</Text>
            <Text style={[DFonts.SubTitle, styles.commentDescription]}>{dataItem.story}</Text>
          </CardView>
        )
      })
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
          {/* my stories */}
          <View style={styles.WriteStory}>
            <Text style={[DFonts.Title, styles.writeStoryTitle]}>{I18n.t('PLACE_WRITE_STORY')}</Text>
            {this._renderWriteStory()}
          </View>
          {/* other stories */}
          <View style={[styles.WriteStory, { marginBottom: 15 }]}>
            {this._renderCommentStory()}
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
            <TouchableOpacity style={styles.modalButton} onPress={()=>this.addMediaToStory(false)}>
              <Text style={styles.buttonStr}>{'Choose from Library...'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalItem}>
            <TouchableOpacity style={styles.modalButton} onPress={()=>this.setState({ isOpenImagePicker: false })}>
              <Text style={styles.cancelStr}>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {this.state.imageUploading && <LoadingSpinner />}
      </View>
    );
  }
}



//make this component available to the app
export default PlaceProfile;
