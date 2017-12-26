//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ViewMoreText from 'react-native-view-more-text'
import CardView from 'react-native-cardview'
import styles from './styles'
import I18n from '@language'
import DFonts from '@theme/fonts'

/**
 * Props Event
 * 
 * onVisitProfile
 */

// create a component
class FeedCampaign extends Component {
  render() {
    return (
      <CardView style={styles.container} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={{uri: this.props.data.mark}} style={styles.markImage} />
            <View style={styles.campaignInfo}>
              <Text style={styles.title}>{this.props.data.title}</Text>
              <Text style={styles.campaign}>{I18n.t('FEED_CAMPAIGN')}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.props.onVisitProfile(this.props.data.id)}>
            <View style={styles.visitProfile}>
              <Text style={styles.visitiText}>{I18n.t('FEED_VISIT_PROFILE')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionText}>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={(onPress) => (<Text onPress={onPress} style={styles.additionalText}>read more</Text>)}
            renderViewLess={(onPress) => (<Text onPress={onPress} style={styles.additionalText}>read less</Text>)}
            textStyle={styles.description}>
            <Text style={DFonts.DFontFamily}>
              {this.props.data.description}
            </Text>
          </ViewMoreText>
        </View>
        <Image source={{uri: this.props.data.image}} style={styles.image} />
      </CardView>
    );
  }
}



//make this component available to the app
export default FeedCampaign;
