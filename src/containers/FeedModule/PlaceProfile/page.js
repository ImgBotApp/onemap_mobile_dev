//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity,ScrollView, Platform, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CardView from 'react-native-cardview'
import ViewMoreText from 'react-native-view-more-text';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modalbox';
import TitleImage from '@components/TitledImage'

import TagInput from 'react-native-tag-input';
import Foundation from 'react-native-vector-icons/Foundation'
import ImagePicker from 'react-native-image-picker'
import CircleImage from '@components/CircleImage'
import ImageSliderComponent from '@components/ImageSliderComponent'
import styles from './styles'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '../../../theme/colors';
import { calculateCount, getDeviceWidth, calculateDuration } from '@global'
import DFonts from '@theme/fonts'
import I18n from '@language'
import * as SCREEN  from '@global/screenName'

const ImagePickerOption = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
const user = {
  name : 'Minna Hamilton',
  photoURL: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'
}
const data = {
  title: 'GRAMERCY TAVERN',
  bookmark: true,
  image: [
    {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
    {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'}
  ],
  description: 'The Main Dining Room serves a fixed-price menu for dinner an a la carte menu for lunch. Our Tavern serves an a la menu and welcomes guests on a walk-in basic',
  map: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  },
  information: {
    address: '42 E 20th St, New York, NY 10003, USA',
    phoneNumber: '+1-212-477-0777',
    website: 'www.gramercytavern.com',
    openingHours: [
      'Mon - Thu and Sun, 11:30 AM - 11:00 PM'    ]
  },
  interests: {
    hearted: 12809,
    checkIns: 239,
    bookmark: 218
  },
  keywords: [
    'Steak', 'Cocktails', 'Lunch', 'Dinner', 'Food'
  ],
  comments: [
    {
      user: {
        name: 'Theresa',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
        update: new Date()
      },
      images: [
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      ],
      description: 'I came here for RW last night. The reason this review gets 4 stars is because of the everything biscuit. So GOOD. It comes with a vegetable cream cheese and it was the best part of the meal. So good that we ordered seconds and then kind of regretted it because we were so full, Oysters to start. It was okay. Tiny oysters that were baked with cheese. my friend had the bacon and it seemed to be extra crispy'
    },
    {
      user: {
        name: 'Theresa',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
        update: new Date()
      },
      images: [
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      ],
      description: 'I came here for RW last night. The reason this review gets 4 stars is because of the everything biscuit. So GOOD. It comes with a vegetable cream cheese and it was the best part of the meal. So good that we ordered seconds and then kind of regretted it because we were so full, Oysters to start. It was okay. Tiny oysters that were baked with cheese. my friend had the bacon and it seemed to be extra crispy'
    },
    {
      user: {
        name: 'Theresa',
        uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg',
        update: new Date()
      },
      images: [
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
        {uri: 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg'},
      ],
      description: 'I came here for RW last night. The reason this review gets 4 stars is because of the everything biscuit. So GOOD. It comes with a vegetable cream cheese and it was the best part of the meal. So good that we ordered seconds and then kind of regretted it because we were so full, Oysters to start. It was okay. Tiny oysters that were baked with cheese. my friend had the bacon and it seemed to be extra crispy'
    }
  ]
}

const inputProps = {
  keyboardType: 'default',
  placeholder: 'Tag',
  autoFocus: true,
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};
// create a component
class PlaceProfile extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ],
    rightButtons: [
      {
        title: '•••',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)

    this.state={
      tags: ['Steak', 'Cocktails', 'Dinner', 'Food'],
      text: "",
      sliderShow: false,
      collectionModal: false,
      storyImages: [
        {
          type: 'add'
        }
      ]
    }

    this.props.navigator.setOnNavigatorEvent(this.onNaviagtorEvent.bind(this));
  }
  onNaviagtorEvent (event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop()
      }
    }
  }
  onAddCollection = () => {
    this.setState({
      collectionModal: false
    })
    this.props.navigation.navigate('AllCollection')
  }
  _renderItem (item) {
    if ( item.type == 'add') {
      return (
        <TouchableOpacity onPress={this.addImageToStory.bind(this)}>
          <CardView style={styles.imageItemContainer} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
            <Image source={require('@assets/images/blankImage.png')} style={styles.imageItem}/>
          </CardView>  
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this.setState({sliderShow: true})}>
      <CardView style={styles.imageItemContainer} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <Image source={{uri: item.uri}} style={styles.imageItem}/>
      </CardView>
      </TouchableOpacity>
    )
  }
  goMapDetail () {
    // this.props.navigation.navigate('MapViewPage')
    this.props.navigator.push({
      screen: SCREEN.MAP_DETAIL_PAGE,
      title: I18n.t('MAPVIEW_TITLE'),
      animated: true
    })
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
          <TouchableOpacity onPress={() => this.setState({collectionModal: true})}>
            <MaterialCommunityIcons name={data.bookmark ? "bookmark" : "bookmark-outline"} size={30} 
                color={data.bookmark ? RED_COLOR : LIGHT_GRAY_COLOR}/>
          </TouchableOpacity>
        </View>
        {/* Images */}
        <View style={styles.imageContainer}>
          <FlatList
            style={styles.imageFlatList}
            horizontal
            data={data.image}
            renderItem={({item}) => { return this._renderItem(item)}} 
          />
        </View>
        {/* Description */}
        <View style={styles.description}>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={(onPress) => (<Text onPress={onPress} style={DFonts.additionalText}>read more</Text>)}
            renderViewLess={(onPress) => (<Text onPress={onPress} style={DFonts.additionalText}>read less</Text>)}
            textStyle={styles.descriptionText}>
            <Text style={DFonts.DFontFamily}>
              {data.description}
            </Text>
          </ViewMoreText>
        </View>
        {/* MapView */}
        <TouchableOpacity onPress={this.goMapDetail.bind(this)}>
          <View style={styles.mapView}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={data.map}
              region={data.map}
            >
              <MapView.Marker
                style={styles.mapmarker}
                title={data.title}
                image={require('@assets/images/marker.png')}
                coordinate={data.map}
              />
            </MapView>
          </View>
        </TouchableOpacity>
        {/* Information */}
        <View style={styles.informationContainer}>
          <Text style={styles.informationText}>{I18n.t('PLACE_ADDRESS')}{`\t\t\t: `}{data.information.address}</Text>
          <Text style={styles.informationText}>{I18n.t('PLACE_NUMBER')}{`\t\t: `}{data.information.phoneNumber}</Text>
          <Text style={styles.informationText}>{I18n.t('PLACE_WEBSITE')}{`\t\t\t: `}{data.information.website}</Text>
          <Text style={styles.informationText}>{I18n.t('PLACE_OPENHOUR')}{`\t\t: `}{data.information.openingHours}</Text>
        </View>
        {/* Interest */}
        <View style={styles.interestContainer}>
          <View style={styles.interestInformation}>
            <View style={{flexDirection: 'row'}}>
              <Foundation name="heart" size={12} color={RED_COLOR} />
              <Foundation name="marker" size={12} color={BLUE_COLOR} />
              <Foundation name="bookmark" size={12} color={RED_COLOR} />
            </View>
            <Text style={styles.interestText}>{calculateCount(data.interests.hearted)}{' '}{I18n.t('PLACE_HEARTED')}</Text>
            <Text style={styles.interestText}>{calculateCount(data.interests.checkIns)}{' '}{I18n.t('PLACE_CHECK_IN')}</Text>
            <Text style={styles.interestText}>{calculateCount(data.interests.bookmark)}{' '}{I18n.t('PLACE_BOOKMARK')}</Text>
          </View>
          <View style={styles.serparate}></View>
          <View style={styles.buttonInterest}>
            <TouchableOpacity>
              <Foundation name="heart" size={35} color={RED_COLOR} />              
            </TouchableOpacity>
            <TouchableOpacity>
              <Foundation name="marker" size={35} color={BLUE_COLOR} />              
            </TouchableOpacity>
            <TouchableOpacity>
              <Foundation name="share" size={35} color={GREEN_COLOR} />              
            </TouchableOpacity>
          </View>
        </View>
        {/* Keywords */}
        <View style={styles.keyWords}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.keywordTitle}>{I18n.t('PLACE_KEYWORDS')}</Text>
            <TouchableOpacity>
              <Text style={styles.keywordDone}>{I18n.t('PLACE_KEYWORD_DONE')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keywordContainer}>
            <TagInput
              value={this.state.tags}
              onChange={this.onChangeTags}
              labelExtractor={this.labelExtractor}
              text={this.state.text}
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
        <View style={styles.WriteStory}>
          <Text style={styles.writeStoryTitle}>{I18n.t('PLACE_WRITE_STORY')}</Text>
          {this._renderWriteStory()}
        </View>
        {/* Story Comments */}
        <View style={styles.WriteStory}>
          {
            this._renderCommentStory()
          }
          {/* {this._renderComments()} */}
        </View>
        
      </ScrollView>
        {this.state.sliderShow ?
          (
          <ImageSliderComponent onPress={() => {
            this.setState({sliderShow: false})
          }}/>
          ) : null
        }
        {/* Modal Collection */}
        <Modal
          style={styles.collectionModal}
          isOpen={this.state.collectionModal}
          backdropPressToClose={true}
          position={'bottom'}
          backdrop={true}
          backdropOpacity={0.5}
          backdropColor={'lightgray'}
          onClosed={() => this.setState({collectionModal: false})}
        > 
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{I18n.t('PROFILE_COLLECTION_TITLE')}</Text>
            <TouchableOpacity onPress={this.onAddCollection.bind(this)}>
              <Text style={styles.plusButton}>{'+'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatebar}></View>
          <View style={styles.Collections}>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'abc'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'abc'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'abc'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
            <TitleImage style={styles.collection} uri={'https://placeimg.com/640/480/any'} radius={8}  title={'abc'} vAlign={'center'} hAlign={'center'} titleStyle={styles.collectionItemTitle}/>
          </View>
        </Modal>
      </View>
    );
  }
  _renderCommentStory() {
    return data.comments.map(comment => {
      return this._renderComments(comment)
    })
  }
  _renderComments (dataItem) {
    return (
      <CardView style={styles.writeStoryMain} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <View style={{flexDirection: 'row'}}>
          <CircleImage style={styles.storyWriterImage} uri={dataItem.user.uri} radius={getDeviceWidth(67)}/>
          <View>
            <Text style={styles.storyWriterName}>{dataItem.user.name}</Text>
            <Text style={styles.commentDate}>{calculateDuration(dataItem.user.update)}</Text>
          </View>
        </View>
        <FlatList 
          style={[styles.imageFlatList, {marginTop: 10}]}
          horizontal
          data={dataItem.images}
          renderItem={({item}) => this._renderItem(item)}
        />
        <Text style={styles.commentDescription}>{dataItem.description}</Text>
      </CardView>      
    )
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
        let source = { uri: response.uri };
        var cloneObj = JSON.parse(JSON.stringify(this.state.storyImages))
        cloneObj.pop()
        cloneObj.push(source)
        cloneObj.push({type: 'add'})
        this.setState({
          storyImages: cloneObj
        });
        // alert(JSON.stringify(this.state.storyImages))
      }
    });
  }
  _renderWriteStory() {
    return (
      <CardView style={styles.writeStoryMain} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <View style={{flexDirection: 'row'}}>
          <CircleImage style={styles.storyWriterImage} uri={user.photoURL} radius={getDeviceWidth(67)}/>
          <Text style={styles.storyWriterName}>{user.name}</Text>
        </View>
        <View style={styles.myImagesContainer}>
          {
            this.state.storyImages.length < 2 ? 
            (
              <TouchableOpacity onPress={this.addImageToStory.bind(this)}>
                <Image style={styles.myImages} source={require('@assets/images/blankImage.png')}/>
              </TouchableOpacity>            
            ) : (
              <FlatList 
                horizontal
                style={styles.myImages}
                data={this.state.storyImages}
                renderItem={({item}) => this._renderItem(item)}
              />
            )
          }
        </View>
        <TextInput style={{width: '100%', marginTop:30}} placeholder={I18n.t('PLACE_TITLE_BOLD')}/>
        <TextInput style={{width: '100%', marginTop:10}} placeholder={'What is this story about'}/>
      </CardView>
    )
  }
  onChangeText = (text) => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: "",
      });
    }
  }

  labelExtractor = (tag) => tag;

  onChangeTags = (tags) => {
    this.setState({ tags });
  }
}



//make this component available to the app
export default PlaceProfile;
