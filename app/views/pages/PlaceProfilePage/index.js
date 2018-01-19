import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
  TextInput,
  FlatList
} from 'react-native';

import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';

import Container from '@layout/Container';
import MapPage from '../MapPage';
import * as commonStyles from '@global/styles/commonStyles';
import Grid from 'react-native-grid-component';
import CardView from 'react-native-cardview';
import CampaignItem from '@components/CampaignItem';
import SuggestPlaceItem from '@components/SuggestPlaceItem';
import SuggestPlaceDetailItem from '@components/SuggestPlaceDetailItem';
import ImageSlider from '@components/ImageSliderComponent';
import RuleItem from '@components/RuleItem';
import CircleImage from '@components/CircleImage';
import ViewMoreText from 'react-native-view-more-text';
import TagInput from 'react-native-tag-input';
import ImagePicker from 'react-native-image-picker';
import I18n from '@i18n';
import { Icon } from 'react-native-elements';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import { styles } from './styles';

const inputProps = {
  keyboardType: 'default',
  placeholder: `${I18n.t('TAG')}`,
  autoFocus: true,
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};

const ImagePickerOption = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class PlaceProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      keywords: data['keywords'],
      keywordText: '',
      sliderShow: false,
      storyImages: [
        'https://picsum.photos/904/300',
        'https://picsum.photos/904/300',
        'https://picsum.photos/904/300',
      ]
    }
  }

  onChangeText = (text) => {
    const {keywords} = this.state;
    this.setState({ keywordText: text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        keywords: [...keywords, this.state.keywordText],
        keywordText: ''
      });
    }
  }

  labelExtractor = (tag) => tag;

  onChangeTags = (tags) => {
    this.setState({
      keywords: tags
    });
  }

  _renderCommentStory() {
    return data.comments.map((comment, index) => (
      <CardView key={index} style={styles.writeStoryMain} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <View style={{ flexDirection: 'row' }}>
          <CircleImage style={styles.storyWriterImage} uri={comment.user.uri} radius={25} />
          <View style={{justifyContent: 'space-between'}}>
            <Text style={styles.storyWriterName}>{comment.user.name}</Text>
            <Text style={styles.commentDate}>{commonStyles.calculateDuration(comment.user.update)}</Text>
          </View>
        </View>
        <View style={styles.storySliderImageView}>
          <ImageSlider data={comment.images}  offset={{w: 110, h: 80, padding: 0}} />
        </View>
        <Text style={styles.commentDescription}>{comment.description}</Text>
      </CardView>
    ))
  }

  addImageToStory() {
    ImagePicker.showImagePicker(ImagePickerOption, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let uri = response.uri;
        this.setState({story: [...this.state.storyImages, uri]});
      }
    });
  }

  _renderItem(item) {
    return (
      <TouchableOpacity>
        <CardView style={styles.imageItemContainer} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
          <Image source={require('@assets/images/marker.png')} style={styles.imageItem} />
        </CardView>
      </TouchableOpacity>
    )
  }

  _renderWriteStory() {
    return (
      <CardView style={styles.writeStoryMain} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <View style={{ flexDirection: 'row' }}>
          <CircleImage style={styles.storyWriterImage} uri={data.user.photoURL} radius={25} />
          <Text style={styles.storyWriterName}>{data.user.name}</Text>
        </View>
        <View style={styles.myImagesContainer}>
          <TouchableOpacity onPress={()=>this.addImageToStory()}>
            <Image style={styles.myImages} source={require('@assets/images/blankImage.png')} />
          </TouchableOpacity>
        </View>
        {this.state.storyImages.length > 0  && (
          <View style={styles.storySliderImageView}>
            <ImageSlider data={this.state.storyImages}  offset={{w: 110, h: 80, padding: 0}} />
          </View>
        )}
        <TextInput style={styles.storyTitle} placeholder={I18n.t('TITLE_BOLD')} />
        <View style={styles.serparate}></View>
        <TextInput style={styles.storyDescription} placeholder={I18n.t('WHAT_IS_THE_STORY_ABOUT')} />
      </CardView>
    )
  }

  render() {

    return (
      <Container title={I18n.t('PLACE_PROFILE')}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.subContainer}>
              {/* title */}
              <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{data.title}</Text>
                <TouchableOpacity onPress={() => this.setState({ collectionModal: true })}>
                  <FontAwesome
                    style={{
                      fontSize: 30,
                      color: data.bookmark ? commonStyles.RED_COLOR : commonStyles.LIGHT_GRAY_COLOR
                    }}
                  >{data.bookmark ? Icons.bookmark : Icons.bookmarkO}</FontAwesome>
                </TouchableOpacity>
              </View>

              {/* slider */}
              <View style={styles.sliderContainer}>
                <ImageSlider data={data.image}  offset={{w: 140, h: 110, padding: commonStyles.padding}} />
              </View>

              {/* description */}
              <View style={styles.descriptionContainer}>
                {/* <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={(onPress) => (<Text onPress={onPress} style={styles.textMore}>Read More</Text>)}
                  renderViewLess={(onPress) => (<Text onPress={onPress} style={styles.textMore}>Read Less</Text>)}
                  textStyle={{
                    color: commonStyles.GRAY_COLOR,
                    fontSize: commonStyles.BIG_FONT_SIZE
                  }}
                >
                  <Text>
                    {data.description}
                  </Text>
                </ViewMoreText> */}
                <Text
                  style={{
                    color: commonStyles.GRAY_COLOR,
                    fontSize: commonStyles.BIG_FONT_SIZE
                }}>
                  {data.description}
                </Text>
              </View>
              
              {/* map */}
              <View style={styles.mapContainer}>
                <MapPage data={data.mapData} currentLocation={data.currentLocation} onPressMarker={(data)=> {}} radius={5} />
              </View>

              {/* Information */}
              <View style={styles.informationContainer}>
                <View style={styles.informationItem}>
                  <View style={styles.title}>
                    <Text style={styles.informationText}>{I18n.t('ADDRESS')}</Text>
                  </View>
                  <Text style={styles.informationText}>:</Text>
                  <View style={styles.content}>
                    <Text style={styles.informationText}>{data.information.address}</Text>
                  </View>
                </View>
                <View style={styles.informationItem}>
                  <View style={styles.title}>
                    <Text style={styles.informationText}>{I18n.t('Phone Number')}</Text>
                  </View>
                  <Text style={styles.informationText}>:</Text>
                  <View style={styles.content}>
                    <Text style={styles.informationText}>{data.information.phoneNumber}</Text>
                  </View>
                </View>
                <View style={styles.informationItem}>
                  <View style={styles.title}>
                    <Text style={styles.informationText}>{I18n.t('OPENING_HOURS')}</Text>
                  </View>
                  <Text style={styles.informationText}>:</Text>
                  <View style={styles.content}>
                    <Text style={styles.informationText}>{data.information.openingHours}</Text>
                  </View>
                </View>
              </View>
              
              {/* Interest */}
              <View style={styles.interestContainer}>
                <View style={styles.interestInformation}>
                  <View style={{ flexDirection: 'row' }}>
                    <FontAwesome
                      style={{
                        fontSize: 15,
                        color: commonStyles.RED_COLOR
                      }}
                    >
                      {Icons.gratipay}
                    </FontAwesome>
                    <FontAwesome
                      style={{
                        fontSize: 15,
                        color: commonStyles.BLUE_COLOR
                      }}
                    >
                      {Icons.mapMarker}
                    </FontAwesome>
                    <FontAwesome
                      style={{
                        fontSize: 15,
                        color: commonStyles.RED_COLOR
                      }}
                    >
                      {Icons.bookmark}
                    </FontAwesome>

                  </View>
                  <Text style={styles.interestText}>{commonStyles.calculateCount(data.interests.hearted)}{' '}{I18n.t('HEARTED')}</Text>
                  <Text style={styles.interestText}>{commonStyles.calculateCount(data.interests.checkIns)}{' '}{I18n.t('CHECK_INS')}</Text>
                  <Text style={styles.interestText}>{commonStyles.calculateCount(data.interests.bookmark)}{' '}{I18n.t('ADD_TO_COLLECTION')}</Text>
                </View>
                <View style={styles.serparate}></View>
                <View style={styles.buttonInterest}>
                  <TouchableOpacity>
                    <FontAwesome
                      style={{
                        fontSize: 30,
                        color: commonStyles.RED_COLOR
                      }}
                    >
                      {Icons.gratipay}
                    </FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <FontAwesome
                      style={{
                        fontSize: 30,
                        color: commonStyles.BLUE_COLOR
                      }}
                    >
                      {Icons.mapMarker}
                    </FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <FontAwesome
                      style={{
                        fontSize: 30,
                        color: commonStyles.GREEN_COLOR
                      }}
                    >
                      {Icons.shareAlt}
                    </FontAwesome>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Keywords */}
              <View style={styles.keywordsContainer}>
                <View style={styles.keywordTitleContainer}>
                  <Text style={styles.keywordTitle}>{I18n.t('KEYWORDS')}</Text>
                  <TouchableOpacity>
                    <Text style={styles.keywordDone}>{I18n.t('DONE')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.tagInputContainer}>
                  <TagInput
                    value={this.state.keywords}
                    onChange={this.onChangeTags}
                    labelExtractor={this.labelExtractor}
                    text={this.state.keywordText}
                    onChangeText={this.onChangeText}
                    tagContainerStyle={styles.KeywordInput}
                    tagTextStyle={styles.keywordTextStyle}
                    tagColor="#5c5a5a"
                    tagTextColor="#e9e8eb"
                    inputProps={inputProps}
                    maxHeight={150}
                  />
                </View>
              </View>

              {/* Write Story */}
              <View style={styles.storyContainer}>
                <View style={styles.keywordTitleContainer}>
                  <Text style={styles.keywordTitle}>{I18n.t('WRITE_STORY')}</Text>
                </View>
                {this._renderWriteStory()}
              </View>
              {/* Story Comment */}
              <View style={styles.storyContainer}>
              {this._renderCommentStory()}
              </View>
            </View> 
          </ScrollView>        
        </View> 
      </Container>
    );
  }
}



const data = {
  title: 'Kad Kong Ta',
  bookmark: true,
  image: [
    'https://picsum.photos/900/300',
    'https://picsum.photos/901/300',
    'https://picsum.photos/902/300',
    'https://picsum.photos/903/300',
    'https://picsum.photos/904/300',
  ],
  description: 'The Main Dining Room serves a fixed-price menu for dinner an a la cartefixed-price menu for dinner an a la carte menu for lunch. Our Tavern serves an a la menu and welcomes guests on a walk-in basic',
  currentLocation: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
  mapData: [
    {
      coordinates: {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    }
  ],
  information: {
    address: '42 E 20th St, New York, NY 10003, USA',
    phoneNumber: '+1-212-477-0777',
    website: 'www.gramercytavern.com',
    openingHours: [
      'Mon - Thu and Sun, 11:30 AM - 11:00 PM']
  },
  interests: {
    hearted: 12809,
    checkIns: 239,
    bookmark: 218
  },
  keywords: [
    'Food', 'Market', 'Street Market', 'Oldcity'
  ],
  user: {
    name: 'Minna Hamilton',
    photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
    update: new Date()
  },
  comments: [
    {
      user: {
        name: 'Theresa',
        uri: 'https://picsum.photos/50/300',
        update: new Date()
      },
      images: [
        'https://picsum.photos/800/300',
        'https://picsum.photos/801/300',
        'https://picsum.photos/802/300',
        'https://picsum.photos/803/300',
        'https://picsum.photos/804/300',
      ],
      description: 'I came here for RW last night. The reason this review gets 4 stars is because of the everything biscuit. So GOOD. It comes with a vegetable cream cheese and it was the best part of the meal. So good that we ordered seconds and then kind of regretted it because we were so full, Oysters to start. It was okay. Tiny oysters that were baked with cheese. my friend had the bacon and it seemed to be extra crispy'
    },
    {
      user: {
        name: 'Anna',
        uri: 'https://picsum.photos/51/300',
        update: new Date()
      },
      images: [
        'https://picsum.photos/300/300',
        'https://picsum.photos/301/300',
        'https://picsum.photos/302/300',
        'https://picsum.photos/303/300',
        'https://picsum.photos/304/300',
      ],
      description: 'I came here for RW last night. The reason this review gets 4 stars is because of the everything biscuit. So GOOD. It comes with a vegetable cream cheese and it was the best part of the meal. So good that we ordered seconds and then kind of regretted it because we were so full, Oysters to start. It was okay. Tiny oysters that were baked with cheese. my friend had the bacon and it seemed to be extra crispy'
    },
    {
      user: {
        name: 'Lynnie',
        uri: 'https://picsum.photos/52/300',
        update: new Date()
      },
      images: [
        'https://picsum.photos/400/300',
        'https://picsum.photos/401/300',
        'https://picsum.photos/402/300',
        'https://picsum.photos/403/300',
        'https://picsum.photos/404/300',
      ],
      description: 'I came here for RW last night. The reason this review gets 4 stars is because of the everything biscuit. So GOOD. It comes with a vegetable cream cheese and it was the best part of the meal. So good that we ordered seconds and then kind of regretted it because we were so full, Oysters to start. It was okay. Tiny oysters that were baked with cheese. my friend had the bacon and it seemed to be extra crispy'
    }
  ]
}
