//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StoryBoard from '@components/StoryBoard'
import I18n from '@language'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
const data = {
  stories: [
    {
      id: 'a1',
      title: 'BAKUE',
      uri : 'https://picsum.photos/200/300'
    },
    {
      id: 'a2',
      title: 'PARIS',
      uri : 'https://picsum.photos/250/300'
    },
    {
      id: 'a3',
      title: 'BERLIN',
      uri : 'https://picsum.photos/300/300'
    },
    {
      id: 'a4',
      title: 'MOSCOW',
      uri : 'https://picsum.photos/350/300'
    },
    {
      id: 'a5',
      title: 'WARSAOW',
      uri : 'https://picsum.photos/400/300'
    },
    {
      id: 'a6',
      title: 'MADRID',
      uri : 'https://picsum.photos/150/300'
    },
    {
      id: 'a7',
      title: 'ROMA',
      uri : 'https://picsum.photos/200/300'
    },
    {
      id: 'a8',
      title: 'NEW YORK',
      uri : 'https://picsum.photos/250/300'
    },
    {
      id: 'a9',
      title: 'TOKYO',
      uri : 'https://picsum.photos/300/300'
    },
  ]
}
// create a component
class StoryListPage extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: '',
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    Ionicons.getImageSource('ios-arrow-round-back', 35, DARK_GRAY_COLOR).then(icon => {
      props.navigator.setButtons({
        leftButtons: [{
          icon,
          id: 'backButton',
          disableIconTint: true
        }]
      })
    })
    this.props.navigator.setOnNavigatorEvent(this.onNavigateEvent.bind(this))
  }
  onNavigateEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop({})
      }
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.vStories}>
          <StoryBoard style={styles.StoryContainer} data={data.stories}
            onPressItem={this.onStoryItem.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }
  onStoryItem() {

  }

}



//make this component available to the app
export default StoryListPage;
