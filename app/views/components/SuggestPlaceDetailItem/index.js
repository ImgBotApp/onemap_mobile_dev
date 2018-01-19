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
import I18n from '@i18n';

export default class SuggestPlaceDetailItem extends Component {
  constructor(props) {
    super(props);
  }

  onViewMore() {
    this.props.viewMore();
  }

  render() {
    const {data} = this.props;
    return (
      <View style={styles.suggestView}>
        <View style={styles.imageSlideView}>
          <ImageSlider data={data.thumbnail} offset={{w: 110, h: 80, padding: 5}} />
        </View>
        <View style={styles.descsriptionView}>
          <View style={styles.descsription}>
            <Text style={styles.textDescription} numberOfLines={2}>
              {data.description}
            </Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity onPress={()=>this.onViewMore()}>
              <Text style={styles.textView}>... {I18n.t('VIEW_MORE')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}