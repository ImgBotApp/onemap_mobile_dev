import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { styles } from './styles';
import * as commonStyles from '@global/styles/commonStyles';
import Grid from 'react-native-grid-component';
import CardView from 'react-native-cardview';
import EventItem from '@components/EventItem';

export default class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }

  _renderItem = (data, i) => {
    return (
      <CardView
        key={i}
      >
        <EventItem data={data} />
      </CardView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid
          style={styles.list}
          renderItem={this._renderItem}
          data={eventData}
          itemsPerRow={1}
        />
      </View>
    );
  }
}

const eventData = [
  {
    title: 'NIGHT PARADISE HAT YAI COUNTDOWN 2017',
    subTitle: 'Songhkla'
  },
  {
    title: 'KHON KAEN COUNTOWN',
    subTitle: 'Kohn Koen'
  },
  {
    title: 'NEW YEAR FESTIVAL IN PATTAYA',
    subTitle: 'Songhkla'
  },
  {
    title: 'NIGHT PARADISE HAT YAI COUNTDOWN 2017',
    subTitle: 'Songhkla'
  },
  {
    title: 'NIGHT PARADISE HAT YAI COUNTDOWN 2017',
    subTitle: 'Songhkla'
  },
];