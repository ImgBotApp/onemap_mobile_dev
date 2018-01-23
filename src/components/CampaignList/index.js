//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'

import styles from './styles'
import I18n from '@language'
// ITEM JSON
/**
 * id
 * uri
 * name
 * description
 * badges
 *  id
 *  uri
 *  name  
 * points
 */
// create a component
class CampainList extends Component {
  constructor (props) {
    super(props)
  }

  _renderBadge(badge) {
    return (
      <Image source={{uri:  badge.uri}} style={styles.badgeImage} />
    )
  }

  _renderBadges(badges) {
    return (
      <View style={{flexDirection: 'row'}}>
        {
          badges[0] && this._renderBadge(badges[0])
        }
        {
          badges[1] && this._renderBadge(badges[1])
        }
        {
          badges[2] && this._renderBadge(badges[2])
        }
      </View>
    )
  }

  _renderCampaignItem(item) {
    return (
      <View style={styles.CampainItem}>
        <Image source={{uri: item.uri}} style={styles.campainImage}/>
        <View style={styles.CampainInformation}>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.textInfo}>{item.name}</Text>
              <Text style={styles.description} numberOfLines={2} ellipsizeMode={'middle'}>{item.description}</Text>
            </View>
            <View>
              <Text style={styles.points}>{I18n.t('POINTS_STR')}</Text>
              <Text style={styles.pointNumber}>{item.points}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              {
                this._renderBadges(item.badges)
              }
            </View>
            <TouchableOpacity onPress={() => this.props.onViewMore(item.id)}>
              <View style={styles.ViewmoreButton}>
                <Text style={{color: 'white'}}>{I18n.t('PROFILE_VIEW_MORE')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.props.data.map((item) => {
            return (
              <CardView style={styles.cardView} cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                { 
                  this._renderCampaignItem(item)
                }
              </CardView>
              )
          })
        }
      </View>
    );
  }
}



//make this component available to the app
export default CampainList;
