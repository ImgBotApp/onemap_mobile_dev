//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RED_COLOR, LIGHT_GRAY_COLOR, BLUE_COLOR, GREEN_COLOR, DARK_GRAY_COLOR } from '@theme/colors';
import FontStyle from '../../../theme/fonts'
import PropTypes from 'prop-types'
import styles from './styles'
import I18n from '@language'
import CardView from 'react-native-cardview'
import moment from 'moment'
import { GetPlaceByCondition, GetRulesByCondition, GetConditionDetail } from '../../../graphql/condition'
import { GetBadgeDetail } from '../../../graphql/badge'
import { getPlaceDetail } from '../../../graphql/places'
import SuggestPlaceItem from '../../../components/CampaignSuggestPlace'
import * as SCREEN from '../../../global/screenName'

// create a component
class PlaceDetailPage extends Component {
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

    this.state = {
      place: {},
      rules: {},
      detail: {}
    }
    console.log(this.props)
    this.props.navigator.setOnNavigatorEvent(this.onNaviagtorEvent.bind(this));
  }

  componentWillMount() {
    this.FetchPlaceDetail()
    // this.FetchRuleData()
    // this.FetchConditionDetail()
  }

  FetchConditionDetail =() => {
    GetConditionDetail(this.props.id)
    .then(res => {
      this.setState({
        detail: res
      })
    })
  }

  FetchPlaceDetail = () => {
    GetBadgeDetail(this.props.id, this.props.user.id)
    .then(res => {
      console.log(res)
      this.setState({
        detail: res
      })
    })
  }

  FetchRuleData = () => {
    GetRulesByCondition(this.props.id)
    .then(res => {
      this.setState({
        rules: res
      })
    })
  }

  onNaviagtorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        return this.props.navigator.pop()
      }
    } else {
    }
  }

  onVisitPlaceProfile = (id) => {
    getPlaceDetail(id)
    .then(res => {
      this.props.navigator.push({
        screen: SCREEN.PLACE_PROFILE_PAGE,
        passProps: {
          place: res
        }
      })
    })
  }

  renderBadgeDetail() {
    return (
      <View style={styles.detailPart}>
        <Image source={ this.state.detail.iconUrl ? { uri: this.state.detail.iconUrl} : require('@assets/images/badge/badge.png')}  style={styles.detailImage}/>
        <View style={styles.detailContainer}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[FontStyle.Title, styles.detailName]} numberOfLines={2}>{this.state.detail.title}</Text>
            <Text style={[FontStyle.SubTitle, styles.detailName, {marginTop: 10}]} numberOfLines={1}>{this.state.detail.subtitle}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderPlaceDetail() {
    return (
      <View style={styles.placeContainer}>
        <CardView cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.placeDetailContainer}
          >
          <FlatList 
            keyExtractor={(item, index) => index}
            data={this.state.detail.imageUrl ? this.state.detail.imageUrl : []}
            style={styles.placeDetail}
            horizontal
            renderItem={({ item }) => (
              <Image source={{uri: item}} style={styles.placeImage} />
            )}
          />
          <Text style={[FontStyle.SubTitle, styles.placeDescription]}>{this.state.detail.description}</Text>
          <TouchableOpacity onPress={() => this.onVisitPlaceProfile(this.state.place.place && this.state.place.place.id)}>
            <Text style={[FontStyle.SubTitle, styles.placeMore]}>{I18n.t('PROFILE_VIEW_MORE')}</Text>
          </TouchableOpacity>
        </CardView>
      </View>
    )
  }

  renderRuleItem() {
    return (
      <View style={styles.RuleItem} >
      <CardView cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
        style={{width: '55%', backgroundColor: 'white'}}
        >
        <Text style={[FontStyle.Content, styles.pointRewards]}>{this.state.rules.pointReward}{' Points'}</Text>
        <View style={styles.eventType}>
          <Image source={require('@assets/images/badge/checkin.png')} style={styles.checkInImage}/>
          <Text style={[FontStyle.SubContent, styles.ruleText]}>{' '}{this.state.rules.type}{' '}{this.state.rules.distance}{' m'}</Text>
        </View>
        <View style={styles.eventType}>
          <Image source={require('@assets/images/badge/time.png')} style={styles.checkInImage}/>
          <View>
          {
            this.state.rules.dates && this.state.rules.dates.map((item, index) => {
              return (
                <View key={index}>
                <Text style={[FontStyle.SubContent, styles.ruleText]}>
                  {' '}{ moment(item.fromDateTime).format('DD MMM YY')} {' - '} { moment(item.toDateTime).format('DD MMM YY')} 
                </Text>
                </View>
              )
            })
          }
          </View>
        </View>
      </CardView>
      </View>
    )
  }

  renderRules() {
    return (
      <View style={styles.RuleContainer}>
        <Text style={[FontStyle.Header, styles.RuleLabel]}>{I18n.t('CAMPAGIN_RULES')}</Text>
        { this.renderRuleItem()}
      </View>
    )
  }

  renderSuggestedPlace() {
    return (
      <View style={styles.SuggestPlaceContainer}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={SuggestPlace}
          horizontal
          renderItem={({ item }) => (
            <CardView cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.SPlaceItem}
            >
              <SuggestPlaceItem id={item.id} name={item.name} address={item.address} images={item.images} key={item.id}
                onPress={() => this.onVisitPlaceProfile(item.id)}
              />
            </CardView>
          )}
        />
      </View>
    )
  }

  renderSuggestPlaces() {
    return (
      <View style={styles.SuggestContainer}>
        <Text style={[FontStyle.Header, styles.RuleLabel]}>{I18n.t('CAMPAIGN_SUUGESTED_PLACE')}</Text>
        { this.renderSuggestedPlace()}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>        
        { this.renderBadgeDetail() }
        {/* { this.renderPlaceDetail() }
        { this.renderRules() }
        { this.renderSuggestPlaces() } */}
      </ScrollView>      
      </View>
    );
  }
}

PlaceDetailPage.propTypes = {
  id: PropTypes.string,
  suggestPlaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    pictureURL: PropTypes.arrayOf(PropTypes.string),
    placeName: PropTypes.str
  })),
  name: PropTypes.string,
  campaignName: PropTypes.string
}

PlaceDetailPage.navigatorButtons = {
  leftButtons: [
    {
      title: '',
      id: 'backButton',
      buttonColor: DARK_GRAY_COLOR,
      disableIconTint: true
    }
  ]
}
//make this component available to the app
export default PlaceDetailPage;
