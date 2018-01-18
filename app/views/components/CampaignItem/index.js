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

export default class CampaignItem extends Component {
  constructor(props) {
    super(props);
    this.state ={
      status: true,
    }
  }

  render() {
    const {data} = this.props;

    return (
      <View style={styles.campaign}>
        <View style={styles.logoView}>
          <Image source={{uri: data.logo}} style={styles.logo} />
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subTitle}>{data.subTitle}</Text>
        </View>
      </View>
    );
  }
}