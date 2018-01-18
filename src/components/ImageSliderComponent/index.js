//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions,Image,Button } from 'react-native';
import ImageSliderView from 'react-native-image-slider';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from '@components/VideoPlayer';
import styles,{ sliderWidth, itemWidth,landWidth} from './styles'

import Carousel, { Pagination,ParallaxImage } from 'react-native-snap-carousel';
import Orientation from 'react-native-orientation';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

// create a component
class ImageSlider extends Component {
  constructor (props) {
    super(props);
    this.state = {
        slider1ActiveSlide: 1,
        slider1Ref: null,
        sliderWidth: viewportWidth,
        sliderHeight: viewportHeight,
        itemWidth : viewportWidth
    };
  }
  onPress () {
    this.props.onPress();
  }
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    this.onlayoutOrientation(initial);
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    console.log("did change orientation to:"+orientation);
    this.onlayoutOrientation(orientation);
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  onlayoutOrientation(orientation){
    let dim = Dimensions.get('screen');
    if (orientation != 'LANDSCAPE') {
      this.setState({
        sliderWidth: Math.min(dim.width,dim.height),
        sliderHeight: Math.max(dim.width,dim.height),
        itemWidth : Math.min(dim.width,dim.height),
        slider1ActiveSlide:1
        });
        
    } else {
      this.setState({
        sliderWidth: Math.max(dim.width,dim.height),
        sliderHeight: Math.min(dim.width,dim.height),
        itemWidth : Math.max(dim.width,dim.height),
        slider1ActiveSlide:1
      });
       
    }
    this.forceUpdate()
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
      />
    );
  }
  render () {
    const { slider1ActiveSlide, slider1Ref } = this.state;
    return (
      <View style={styles.container} supportedOrientations={['portrait', 'landscape']}>
        <Carousel
          ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
          data={this.props.data}
          renderItem={this._renderItemWithParallax}
          sliderWidth={this.state.sliderWidth}
          sliderHeight={this.state.sliderHeight}
          itemWidth={this.state.itemWidth}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
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
        <Icon name="times-circle-o" backgroundColor="#3b5998" onPress={this.onPress.bind(this)} style={styles.backbutton}/>
      </View>
    );
  }
}

class SliderEntry extends Component {

  static propTypes = {
      data: PropTypes.object.isRequired,
      even: PropTypes.bool,
      parallax: PropTypes.bool,
      parallaxProps: PropTypes.object,
  };

  get image () {
    const { data: { uri }, parallax, parallaxProps, even } = this.props;
    if(even)
    {
      return (
        <VideoPlayer videourl="https://www.w3schools.com/html/mov_bbb.mp4"/>
      );
    }
    else{
      return parallax ? (
          <ParallaxImage
            source={{ uri: uri }}
            containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
            style={styles.image}
            parallaxFactor={0.35}
            showSpinner={true}
            spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
            {...parallaxProps}
          />
      ) : (
          <Image
            source={{ uri: uri }}
            style={styles.image}
          />
      );
    }
  }

  render () {
    const { even,parallaxProps } = this.props;
    return (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.slideInnerContainer,{height:parallaxProps.sliderHeight,width:parallaxProps.itemWidth}]}
          //onPress={() => { alert(`You've clicked `); }}
          >
            <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                { this.image }
                <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
            </View>
        </TouchableOpacity>
    );
  }
}
//make this component available to the app
export default ImageSlider;
