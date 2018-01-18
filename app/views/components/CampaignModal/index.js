import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';

import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';
import Grid from 'react-native-grid-component';
import CardView from 'react-native-cardview';
import CampaignItem from '@components/CampaignItem';
import SuggestPlaceItem from '@components/SuggestPlaceItem';
import ImageSlider from '@components/ImageSliderComponent';

export default class CampaignModal extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }

  _renderSuggestPlaceItem = ({item, index}) => {
    return (
      <SuggestPlaceItem 
        key={index} 
        data={item} 
        offset={{w: 70, h: 50, padding: 5}} 
        viewMore={()=>{
          this.props.viewMore();
        }}
      />
    )
  }

  render() {
    const {data} = this.props;

    return (
      <View style={styles.campaignModal}>
        <View style={styles.topView}>
          <CampaignItem data={data} />
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.textDescription}>
            {data.description}
          </Text>
        </View>
        <View style={styles.suggestPlaceView}>
          <Text style={styles.textSuggest}>Suggested Place</Text>
          <View style={styles.suggestView}>
            <Carousel
              data={data.suggestPlace}
              renderItem={this._renderSuggestPlaceItem}
              style={styles.slide}
              sliderWidth={commonStyles.screenSubWidth}
              itemWidth={250}
              inactiveSlideScale={1}
              removeClippedSubviews={false}
              activeSlideAlignment={'start'}
              enableMomentum={true}
              customAnimationType={'spring'}
            />
          </View>
        </View>
        <View style={styles.suggestPlaceView}>
          <Text style={styles.textSuggest}>Badges</Text>
          <View style={styles.suggestView}>
            <ImageSlider data={data.badge}  offset={{w: 80, h: 80, padding: 15}} />
          </View>
        </View>
      </View>
    );
  }
}