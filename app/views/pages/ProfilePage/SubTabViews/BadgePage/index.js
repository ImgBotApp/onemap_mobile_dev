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

export default class BadgePage extends Component {
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
        <Image source={{uri: data}} style={styles.badgeImage} />
      </CardView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid
          style={styles.list}
          renderItem={this._renderItem}
          data={badgeData}
          itemsPerRow={3}
        />
      </View>
    );
  }
}

const badgeData = [
  'https://picsum.photos/150/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/250/300',
  'https://picsum.photos/300/300',
  'https://picsum.photos/350/300',
  'https://picsum.photos/400/300',
  'https://picsum.photos/450/300',
  'https://picsum.photos/500/300',
  'https://picsum.photos/550/300',
  'https://picsum.photos/600/300',
  'https://picsum.photos/650/300',
  'https://picsum.photos/700/300'
];