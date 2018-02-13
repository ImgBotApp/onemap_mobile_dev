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
import { GetPlaceByCondition, GetRulesByCondition } from '../../../graphql/condition'
import SuggestPlaceItem from '../../../components/CampaignSuggestPlace'

const SuggestPlace = [{
  id: 'cjdbog6jmbo470191whdq90rj',
  name: 'Khad Khong Tha  Lampang',
  images: [
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any'
  ],
  address: 'Talad Gao Rd, Suan Dok, Mueang Lampang, Lampang  52100'
},{
  id: 'cjdbodhg5bnp701912v6sa2xm',
  name: 'Khad Khong Tha  Lampang',
  images: [
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any'
  ],
  address: 'Talad Gao Rd, Suan Dok, Mueang Lampang, Lampang  52100'
}
]

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
      rules: {}
    }
    this.props.navigator.setOnNavigatorEvent(this.onNaviagtorEvent.bind(this));

  }

  componentWillMount() {
    this.FetchPlaceDetail()
    this.FetchRuleData()
  }

  FetchPlaceDetail = () => {
    GetPlaceByCondition(this.props.id)
    .then(res => {
      console.log(res)
      this.setState({
        place: res.places ? res.places[0] : null
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

  renderCondtionDetail() {
    return (
      <View style={styles.detailPart}>
        <Image source={ this.props.icon ? { uri: this.props.icon} : require('@assets/images/badge/badge.png')}  style={styles.detailImage}/>
        <View style={styles.detailContainer}>
          <View>
            <Text style={[FontStyle.Title, styles.detailName]}>{this.props.name}</Text>
            <Text style={[FontStyle.SubTitle, styles.detailName, {marginTop: 10}]}>{this.props.campaignName}</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.CheckInContainer}>
              <Text style={{color: '#585958'}}>{I18n.t('FEED_CHECK_IN')}</Text>
            </View>
          </TouchableOpacity>
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
            data={this.state.place.place ? this.state.place.place.pictureURL : []}
            style={styles.placeDetail}
            horizontal
            renderItem={({ item }) => (
              <Image source={{uri: item}} style={styles.placeImage} />
            )}
          />
          <Text style={[FontStyle.SubTitle, styles.placeDescription]}>Description Here</Text>
          <TouchableOpacity>
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
        style={{width: '55%'}}
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
            this.state.rules.dates && this.state.rules.dates.map(item => {
              return (
                <View>
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
              <SuggestPlaceItem id={item.id} name={item.name} address={item.address} images={item.images}/>
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
        { this.renderCondtionDetail() }
        { this.renderPlaceDetail() }
        { this.renderRules() }
        { this.renderSuggestPlaces() }
      </ScrollView>      
      </View>
    );
  }
}

PlaceDetailPage.propTypes = {
  id: PropTypes.string,
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
