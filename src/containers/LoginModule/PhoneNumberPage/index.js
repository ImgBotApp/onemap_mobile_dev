//import liraries
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PhoneInput from 'react-native-phone-input'
import Toast, { DURATION } from 'react-native-easy-toast'
import I18n from '@language'
import * as SCREEN from '@global/screenName'

import styles from './style'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '@actions'

import { requestVerify } from '@apis/phoneVerify'
import { DARK_GRAY_COLOR } from '../../../theme/colors';

import { ACCOUNT_MODE } from '@global/const'

/**
 * Props 
 *  Mode : 'createAccount' / 'updateAccount'
 */
// create a component
class PhoneNumberPage extends Component {

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('@assets/images/login/leftNav.png'),
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ],
    rightButtons: [
      {
        icon: require('@assets/images/login/rightNav.png'),
        id: 'goVerify',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onBackButtonPress() {
    if (this.props.mode == ACCOUNT_MODE.create) {
      this.props.navigator.pop({
        animated: true
      })
    } else {

    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if(event.id == 'backButton') {
       this.onBackButtonPress()
      }
      if(event.id == 'goVerify') {
        this._onCheckPhoneNumberValidation()
      }
    }
  }
  componentWillMount () {
    // this.props.navigation.setParams({onCheck: this._onCheckPhoneNumberValidation})
  }
  async _onCheckPhoneNumberValidation () {
    var valid = this.refs.phone.isValidNumber()
    var phoneNumber = this.refs.phone.getValue()
    // this.props.savePhoneNumberStore({
    //   phoneNumber: phoneNumber
    // })
    var countryCode = this.refs.phone.getCountryCode()
    phoneNumber = phoneNumber.slice(countryCode.length+ 1)
    if ( valid == false) {
      alert('Please input valid phone number')
    } else {
      // var ret = await requestVerify({
      //   country_code: countryCode,
      //   phone_number: phoneNumber,
      //   code_length : 4
      // })
      if (true || ret.success == true) {
        this.refs.toast.show('Verification code sent successfully')
        // this.props.navigation.navigate('PhoneNumberVerify',{
        //   phoneNumber: phoneNumber,
        //   countryCode: countryCode
        // })
        this.props.navigator.push({
          screen: SCREEN.PHONE_VERIFY_PAGE,
          title: I18n.t('CREATE_ACCOUNT'),
          passProps: {
            phoneNumber: phoneNumber,
            countryCode: countryCode,
            mode: this.props.mode
          },
          animated: true,
          animationType: 'slide-horizontal'
        })
      } else {
        alert('there is a problem with PhoneVerification')
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.enterText}>{I18n.t('INPUT_PHONE_NUMBER')}</Text>
        <View style={styles.PhoneInputContainer}>
          <PhoneInput ref='phone' confirmText={'Confirm'}/>
        </View>
        <Text style={[styles.description, styles.belowDistance]}>{I18n.t('LOGIN_PHONE_NUMBER_DESCRIPTION1')}</Text>
        <Text style={styles.description}>{I18n.t('LOGIN_PHONE_NUMBER_DESCRIPTION2')}
          <Text style={styles.privacyPolicy}>{I18n.t('PRIVACY_PLICY')}</Text>
        </Text>
        <Toast ref="toast" />
      </View>
    );
  }
}

// define your styles

function mapStateToProps (state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberPage);
