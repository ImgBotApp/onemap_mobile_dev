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

import Container from '@layout/Container';
import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';
import Grid from 'react-native-grid-component';
import CardView from 'react-native-cardview';
import CampaignItem from '@components/CampaignItem';
import SuggestPlaceItem from '@components/SuggestPlaceItem';
import SuggestPlaceDetailItem from '@components/SuggestPlaceDetailItem';
import ImageSlider from '@components/ImageSliderComponent';
import RuleItem from '@components/RuleItem';

export default class PlaceDetailPage extends Component {
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
        offset={{w: 60, h: 40, padding: 5}} 
        viewMore={()=>this.gotoPlaceProfile()}
      />
    )
  }

  gotoPlaceProfile() {
    Actions.PlaceProfile();
  }

  onCheckIn() {

  }

  render() {
    let data = {
      logo: 'https://picsum.photos/150/300',
      title: 'Kad Kong Ta',
      cityName: 'Lampang City',
      description: 'New Travel Experiencec Brings "12 Forbidden Cities ...Missing" Or 12  You can not say no. Bring the highlihghts and identity of the city.'
                + 'The Thai people have not recognized. To fall in love Thailand',
      thumbnail: [
        'https://picsum.photos/400/300',
        'https://picsum.photos/510/300',
        'https://picsum.photos/610/300',
        'https://picsum.photos/620/300',
        'https://picsum.photos/710/300',
        'https://picsum.photos/810/300',
        'https://picsum.photos/820/300',
      ],
      rules: [
        {
          title: '100 ppoints',
          time: 'Check-In 30m',
          schedule: [
            'Anytime'
          ]
        },
        {
          title: '100 ppoints',
          time: 'Check-In 30m',
          schedule: [
            '1 Jan 18',
            '7 Jan 18'
          ]
        },
        {
          title: '100 ppoints',
          time: 'Check-In 30m',
          schedule: [
            '1 Jan 18 09:00-18:00',
            '8 Jan 18 09:00-18:00',
            '15 Jan 18 09:00-18:00',
          ]
        }
      ],
      suggestPlace: [
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj, Mueang Lampang',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        },
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj, Mueang Lampang, Lampang 52100',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        },
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj, Mueang Lampang, Lampang 52100',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        },
        {
          title: 'Khad Khone Lampania',
          address: 'Talad Gao Rd, Suan Doj, Mueang Lampang, Lampang 52100',
          images: [
            'https://picsum.photos/260/300',
            'https://picsum.photos/210/300',
            'https://picsum.photos/220/300',
            'https://picsum.photos/230/300',
            'https://picsum.photos/240/300',
          ]
        }
      ]
    }

    return (
      <Container title="Place detail">
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.topView}>
              <View style={styles.logoView}>
                <Image source={{uri: data.logo}} style={styles.logo} />
              </View>
              <View style={styles.titleView}>
                <View>
                  <Text style={styles.title}>{data.title}</Text>
                  <Text style={styles.subTitle}>{data.cityName}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={()=>this.onCheckIn()}>
                    <View style={styles.btnCheck}>
                      <Text style={styles.textCheck}>Check-In</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.placeDetailView}>
              <SuggestPlaceDetailItem data={data} viewMore={()=>this.gotoPlaceProfile()}/>
            </View>
            <View>
              <Text style={styles.textSuggest}>Rule</Text>
              <View style={styles.ruleView}>
                <ScrollView
                  ref={(scrollView) => { this._scrollView = scrollView; }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  directionalLockEnabled={true}
                  bounces={false}
                  scrollsToTop={false}
                >
                  {data.rules.map((item, index) => (
                    <RuleItem key={index} data={item} />
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.suggestPlaceView}>
              <Text style={styles.textSuggest}>Suggested Place</Text>
              <View style={styles.suggestView}>
                <Carousel
                  data={data.suggestPlace}
                  renderItem={this._renderSuggestPlaceItem}
                  style={styles.slide}
                  sliderWidth={commonStyles.screenWidth}
                  itemWidth={250}
                  inactiveSlideScale={1}
                  removeClippedSubviews={false}
                  activeSlideAlignment={'start'}
                  enableMomentum={true}
                  customAnimationType={'spring'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}