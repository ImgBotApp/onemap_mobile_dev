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

export default class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state ={
      status: true,
    }
  }

  onValueChange = (value) => {
    this.setState({
      status: value
    })
  }

  render() {
    const {data} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.dateView}>
          <Text style={styles.day}>31</Text>
          <Text style={styles.year}>Dec 2017</Text>
          <Text style={styles.day}>-</Text>
          <Text style={styles.day}>1</Text>
          <Text style={styles.year}>Jan 2018</Text>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>venue: {data.subTitle}</Text>
        </View>
        <View style={styles.switchView}>
          <Switch style={styles.switch} value={this.state.status} onValueChange={(value)=>this.onValueChange(value)} onTintColor="rgb(55, 122, 190)" />
        </View>
      </View>
    );
  }
}