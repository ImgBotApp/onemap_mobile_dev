//import liraries
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import Toast, { DURATION } from 'react-native-easy-toast'

import styles from './styles'
import { getDeviceWidth, getDeviceHeight } from '@global'
import { DARK_GRAY_COLOR } from '@theme/colors';
import { ACCOUNT_MODE } from '@global/const'
import * as SCREEN from '@global/screenName'

import I18n from '@language'

import { verifyCode, requestVerify } from '@apis/phoneVerify'
// import { setTimeout } from 'timers';

const Interval = 1000
// create a component
class PhoneVerifyPage extends Component {
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
        id: 'goNext',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: props.phoneNumber,
      countryCode: props.countryCode,
      timeout: 40,
      timeoutVisible: true
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  initComponent () {
    this.setState ({
      timeout: 40,
      timeoutVisible: true
    })
    this.refs.circularProgress.performLinearAnimation(100, 40* Interval);    
  }

  onNavigatorEvent(event) {
    if (event.id == 'didAppear') {
      this.initComponent()
    }
    if (event.type == 'NavBarButtonPress') {
      if(event.id == 'backButton') {
       this.onBackButtonPress()
      }
      if(event.id == 'goNext') {
        if ( this.props.mode == ACCOUNT_MODE.create ) {
          this.props.navigator.push({
            screen: SCREEN.ACCOUNT_CREATE_PAGE,
            title: I18n.t('CREATE_ACCOUNT'),
            passProps: {
              phoneNumber: this.props.phoneNumber
            }
          })
        }
      }
      if(event.id == 'updatePhoneNumber') {
        this.props.navigator.popToRoot({})
      }
    }
  }
  onBackButtonPress() {
    this.props.navigator.pop({
      animated: true
    })
  }

  componentWillMount () {
    // this.props.navigation.setParams({complete: false})
    // this.props.navigation.setParams({
      // checkCode: this._checkVerify
    // })
  }
  componentDidMount =() => {
    // this.refs.circularProgress.performLinearAnimation(100, 40* Interval);
    // setTimeout(() => this.timeInterval(), Interval)
  }

  _checkVerify () {
    alert('please complete the Confirmation code')
  }
  onTimeout () {
    this.setState({
      timeoutVisible: false
    })
  }

  async onResetTimeout () {
    // var ret = await requestVerify({
    //   country_code: this.props.countryCode,
    //   phone_number: this.props.phoneNumber,
    //   code_length : 4
    // })
    if (true ||ret.success == true) {
      this.refs.toast.show('Verification code sent successfully')
      this.setState({
        timeout: 40,
        timeoutVisible: true
      });
      setTimeout(() => this.refs.circularProgress.performLinearAnimation(100,40 * Interval), 1)
    } else {
      alert('there is a problem with PhoneVerification')
    }
  }
  _renderTimeout() {
    if(this.state.timeoutVisible == true) {
      return (
        <AnimatedCircularProgress
          ref='circularProgress'
          style={styles.circularProgress}
          size={getDeviceWidth(205)}
          fill={0}
          prefill={0}
          width={5}
          linecap={'round'}
          onLinearAnimationComplete={this.onTimeout.bind(this)}
          tintColor="#0a91ed"
          backgroundColor="#cbcbcb">
          {
            (fill) => (
              <Text style={styles.circularPoints}>
                { Math.round((100 - Math.round(fill)) / 2.5) }
              </Text>
            )
          }
        </AnimatedCircularProgress>
      )
    } else {
      return (
        <TouchableOpacity style={styles.circularProgress} onPress={this.onResetTimeout.bind(this)}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this._renderTimeout()      
        }
        
        <View style={styles.description}>
          <Text style={styles.desFont}>Please enter the 4-digit activation code</Text>
          <Text style={styles.desFont}>that was sent to your number</Text>
          <Text style={[styles.desFont, styles.gapsPhoneNumber]}>{this.state.countryCode}{this.state.phoneNumber}</Text>
        </View>
        <CodeInput ref="confirmCode"
          inputPosition={'center'}
          size={getDeviceWidth(174)}
          className={'border-b'}
          cellBorderWidth={1}
          secureTextEntry
          autoFocus = {true}
          codeInputStyle={styles.inputCodeStyle}
          containerStyle={styles.inputContainer}
          codeLength={4} 
          onFulfill = {this.onCompleteConfirm.bind(this)}
        />
        <View style={styles.ResendContainer}>
          <Text style={styles.resendText}>Didn't get the SMS ? </Text>
          <Text style={[styles.resendText, styles.resendGaps]}>Resend Code</Text>
        </View>
        <Toast ref="toast" />
      </View>
    );
  }

  async onCompleteConfirm (code) {
    var ret = await verifyCode({
      country_code: this.props.countryCode,
      phone_number: this.props.phoneNumber,
      verify_code : code
    })
    this.refs.confirmCode.clear()
    console.log(ret)
    if (true || ret.success == true) {
      // $this.props.navigation.navigate('CreateProfile')
    } else {
      alert('Invalid Code')
    }
  }
}



//make this component available to the app
export default PhoneVerifyPage;
