//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Button, Platform,ActivityIndicator } from 'react-native';
import ImageSliderView from 'react-native-image-slider';
import PropTypes from 'prop-types';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import VideoPlayer from '@components/VideoPlayer';
import styles, { sliderWidth, itemWidth, landWidth } from './styles'

import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import Orientation from 'react-native-orientation';
import { getMediaTypeFromURL } from '@global/const';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');
import { fetchImageFromCloudinary } from '@global/cloudinary'
import FastImage from 'react-native-fast-image'
// create a component
class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: props.firstItem,
      slider1Ref: null,
      sliderWidth: viewportWidth,
      sliderHeight: viewportHeight,
      itemWidth: viewportWidth,
      ortMode:"PORTRAIT",
      imageData:props.data
    };
  }
  onPress() {
    this.props.onPress();
  }
  componentWillMount() {
    Orientation.unlockAllOrientations();
  }
  componentDidMount() {
    Orientation.getOrientation((err, orientation) => {
      this.onlayoutOrientation(orientation);
    });
    //Orientation.addOrientationListener(this._orientationDidChange.bind(this));
  }

  _orientationDidChange = (orientation) => {
    console.log("did change orientation to:" + orientation);
    this.onlayoutOrientation(orientation);
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
    setTimeout(() => {
      Orientation.lockToPortrait();
    });
  }

  _onLayout() {
    Orientation.getOrientation((err, orientation) => {
      console.log("did change layout orientaion:" + orientation);
      this.onlayoutOrientation(orientation);
    });
  }

  onlayoutOrientation(orientation) {
    let dim = Dimensions.get('screen');
    this.setState({ortMode:orientation});
    if (orientation != 'LANDSCAPE') {
      this.setState({
        sliderWidth: Math.min(dim.width, dim.height),
        sliderHeight: Math.max(dim.width, dim.height),
        itemWidth: Math.min(dim.width, dim.height),
      });

    } else {
      this.setState({
        sliderWidth: Math.max(dim.width, dim.height),
        sliderHeight: Math.min(dim.width, dim.height),
        itemWidth: Math.max(dim.width, dim.height),
      });
    }
    //this.forceUpdate()
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={index}
        parallax={false}
        parallaxProps={parallaxProps}
        slider1ActiveSlide={this.state.slider1ActiveSlide}
        ortMode = {this.state.ortMode}
      />
    );
  }
  _onSnapToItem(index) {
    this.setState({ slider1ActiveSlide: index });
    this.forceUpdate();
  }
  render() {
    const { slider1ActiveSlide, slider1Ref } = this.state;
    return (
      <View style={styles.container} supportedOrientations={['portrait', 'landscape']} onLayout={this._onLayout.bind(this)}>
        <Carousel
          ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
          data={this.props.data}
          renderItem={this._renderItemWithParallax.bind(this)}
          sliderWidth={this.state.sliderWidth}
          sliderHeight={this.state.sliderHeight}
          itemWidth={this.state.itemWidth}
          hasParallaxImages={true}
          firstItem={this.props.firstItem}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={0}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this._onSnapToItem(index)}
          lockScrollWhileSnapping = {true}
          removeClippedSubviews={true}
          //useScrollView = {true}
          initialNumToRender = {this.props.firstItem+1}
          //getItemLayout={(data, index) => ({offset: viewportWidth * index, length: viewportWidth, index})}
          apparitionDelay={0}
        />
        <Pagination
          dotsLength={this.props.data.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'grey'}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
          carouselRef={slider1Ref}
          tappableDots={!!slider1Ref}
        />
        <EvilIcons name="close" backgroundColor="#3b5998" onPress={this.onPress.bind(this)} style={styles.backbutton} />
      </View>
    );
  }
}

class SliderEntry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.number,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
    };
  }
  get image() {
    const { data: { uri }, parallax, parallaxProps, even,ortMode } = this.props;

    if (getMediaTypeFromURL(uri)) {
      return (
        <VideoPlayer videourl={uri} {...this.props} />
        //<VideoPlayer videourl={"https://www.w3schools.com/html/mov_bbb.mp4"} {...this.props}/>
      );
    }
    else {
      return parallax ? (
        <ParallaxImage
          source={{ uri: fetchImageFromCloudinary(uri, ortMode=="LANDSCAPE"?1920:1080) }}
          containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
          style={styles.image}
          parallaxFactor={0.35}
          showSpinner={true}
          spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
          {...parallaxProps}
        />
      ) : (
          <FastImage
              source={{ uri: fetchImageFromCloudinary(uri, 1920),priority: FastImage.priority.high}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
              onLoad = {()=> this.setState({loading:false})}
            />
        );
    }
  }

  render() {
    const { data: { uri },even, parallaxProps,slider1ActiveSlide } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.slideInnerContainer, { height: parallaxProps.sliderHeight, width: parallaxProps.itemWidth }]}
      //onPress={() => { alert(`You've clicked `); }}
      >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          { Math.abs(slider1ActiveSlide-even) <= 2 && this.image }
          { this.state.loading && !getMediaTypeFromURL(uri) && <ActivityIndicator style={styles.image} size="large" color="#dddddd" /> }
        </View>
      </TouchableOpacity>
    );
  }
}
//make this component available to the app
export default ImageSlider;
