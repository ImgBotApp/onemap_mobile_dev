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

import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';
import Grid from 'react-native-grid-component';
import CardView from 'react-native-cardview';
import ImageSlider from '@components/ImageSliderComponent';

export default class SuggestPlaceItem extends Component {
  constructor(props) {
    super(props);
  }

  onViewMore() {
    this.props.viewMore();
  }

  render() {
    const {data, offset} = this.props;
    return (
      <View style={styles.suggestView}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.imageSlideView}>
          <ImageSlider data={data.images} offset={offset} />
        </View>
        <View style={styles.addressView}>
          <View style={styles.address}>
            <Text style={styles.textAddress}>{data.address}</Text>
          </View>
          <TouchableOpacity onPress={()=>this.onViewMore()}>
            <View style={styles.btnView}>
              <Text style={styles.textView}>View more</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}