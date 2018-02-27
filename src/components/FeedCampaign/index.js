//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import CardView from 'react-native-cardview'
import styles from './styles'
import ViewMoreText from '@components/ViewMoreText'
import I18n from '@language'
import DFonts from '@theme/fonts'
import PropTypes from 'prop-types'
import FontStyle from '../../theme/fonts'
/**
 * Props Event
 * 
 * onVisitProfile
 */

// create a component
class FeedCampaign extends Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      iconUrl: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      pictureUrl: PropTypes.arrayOf(PropTypes.string)
    }),
    onVisitProfile: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <CardView style={styles.container} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
        <View style={styles.CardContainer}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: this.props.data.iconUrl }} style={styles.markImage} />
            <View style={styles.campaignInfo}>
              <Text style={[FontStyle.Title, styles.title]} numberOfLines={1}>{this.props.data.title}</Text>
              <Text style={[FontStyle.SubTitle, styles.campaign]}>{this.props.data.subtitle}</Text>
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
            textStyle={[FontStyle.Regular, styles.description]}>
            {this.props.data.description}
          </ViewMoreText>
        </View>
        <Image source={{ uri: this.props.data.pictureUrl.length && this.props.data.pictureUrl[0] }} style={styles.image} />
        </View>
      </CardView>
    );
  }
}



//make this component available to the app
export default FeedCampaign;
