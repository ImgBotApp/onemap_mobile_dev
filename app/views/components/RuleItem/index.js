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
import FontAwesome, {Icons} from 'react-native-fontawesome';

export default class RuleItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data} = this.props;
    return (
      <View style={styles.ruleView}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.item}>
          <FontAwesome style={styles.icon}>{Icons.mapMarker}</FontAwesome>
          <Text style={styles.subTitle}>{data.time}</Text>
        </View>
        <View style={styles.item}>
          <FontAwesome style={styles.icon}>{Icons.clockO}</FontAwesome>
          <View>
            {data.schedule.map((item, index) => (
              <Text key={index} style={styles.subTitle}>{item}</Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
}