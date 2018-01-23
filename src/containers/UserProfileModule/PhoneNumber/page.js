//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import PhoneInput from 'react-native-phone-input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './style'
import I18n from '@language'
import { getDeviceWidth, getDeviceHeight } from '@global'
import * as SCREEN from '@global/screenName'
import { ACCOUNT_MODE } from '@global/const'
import { DARK_GRAY_COLOR } from '../../../theme/colors';

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
        title: I18n.t('DONE_STR'),
        id: 'verifyPhone',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
	constructor (props) {
		super(props)
		this.state = {
			phoneNumber: props.phoneNumber,
			newNumber: ""
		}
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent=(event) => {
		if (event.type == 'NavBarButtonPress') {
			if (event.id == 'backButton') {
				this.props.navigator.pop();
				return;
			}
			if(event.id == 'verifyPhone') {
				// this.props.navigator.push({
				// 	screen: SCREEN.PHONE_VERIFY_PAGE,
				// 	title: 'Verify Phone Number',
				// 	passProps: {
				// 		phoneNumber: this.props.phoneNumber,
				// 		countryCode: 
				// 	}
				// })
				this._onChangePhone();
			}
		}
	}
	_onChangePhone () {
		if ( this.refs.oldPhone.isValidNumber() == false ) {
			return alert('Please input valid phone number')
		}
		if ( this.refs.newPhone.isValidNumber() == false ) {
			return alert('Please input valid phone number')			
		}
		if ( this.refs.confirmPhone.isValidNumber() == false ) {
			return alert('Please input valid phone number')			
		}
		var oldNumber = this.refs.oldPhone.getValue()
		var newNumber = this.refs.newPhone.getValue()
		var confirmNumber = this.refs.confirmPhone.getValue()
		if ( oldNumber != ('+' +this.state.phoneNumber) ) {
			return alert('Old Phone Number is not matched')
		}
		if ( newNumber != confirmNumber ) {
			return alert('Confirm phone number is not matched')
		}
		this.props.navigator.push({
			screen: SCREEN.PHONE_VERIFY_PAGE,
			title: 'Verify Phone Number',
			passProps: {
				phoneNumber: this.props.phoneNumber,
				countryCode: this.refs.newPhone.getCountryCode(),
				mode: ACCOUNT_MODE.update
			},
			navigatorButtons: {
				rightButtons: [
					{
						title: I18n.t('DONE_STR'),
						id: 'updatePhoneNumber',
						buttonColor: DARK_GRAY_COLOR,
						disableIconTint: true
					}
				]
			}
		})
	}
	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#efefef'}}>
			<KeyboardAwareScrollView>
			<View style={styles.container}>
			{/*  Old Phone Number */}
				<View style={[styles.element,{marginBottom: getDeviceHeight(192)}]}>
					<View style={styles.fontAweSome}>
						<Text style={{ fontSize: 24, color: '#0a91ed', textAlign: 'center' }}>
						<Ionicons name="ios-phone-portrait-outline" size={24} color="#0a91ed" />            
						</Text>
					</View>
					<View style={styles.phoneInput}>
						<PhoneInput ref='oldPhone' confirmText={'Confirm'} 
							style={{height: '100%'}}
							flagStyle={{width: 0,borderWidth: 0}} 
							textProps={{placeholder: I18n.t('SETTING_OLD_PHONE_NUMBER')}}
							value={this.state.phoneNumber}
						/>
					</View>
				</View>
				{/* New Phone Number */}
				<View style={[styles.element,{marginBottom: getDeviceHeight(92)}]}>
					<View style={styles.fontAweSome}>
						<Text style={{ fontSize: 24, color: '#0a91ed', textAlign: 'center' }}>
							<Ionicons name="ios-phone-portrait-outline" size={24} color="#0a91ed" />            
						</Text>
					</View>
					<View style={styles.phoneInput}>
						<PhoneInput ref='newPhone' confirmText={'Confirm'} 
							style={{height: '100%'}}
							flagStyle={{width: 0,borderWidth: 0}} 
							textProps={{placeholder: I18n.t('SETTING_NEW_PHONE_NUMBER')}}
							value={this.state.newNumber}
						/>
					</View>
				</View>
				{/* Confirm Phone Number */}
				<View style={[styles.element, {marginBottom: getDeviceHeight(135)}]}>
					<View style={styles.fontAweSome}>
						<Text style={{ fontSize: 24, color: '#0a91ed', textAlign: 'center' }}>
							<Ionicons name="ios-phone-portrait-outline" size={24} color="#0a91ed" />            
						</Text>
					</View>
					<View style={styles.phoneInput}>
						<PhoneInput ref='confirmPhone' confirmText={'Confirm'} 
							style={{height: '100%'}}
							flagStyle={{width: 0,borderWidth: 0}} 
							textProps={{placeholder: I18n.t('SETTING_CONFIRM_NEW_NUMBER')}}
							value={this.state.newNumber}
						/>
					</View>
				</View>
				<View style={[styles.element,styles.description]}>
					<Text style={styles.text}>{I18n.t('SETTING_PHONE_DESCRIPTION')}</Text>
				</View>
			</View>
			</KeyboardAwareScrollView>
			</View>
		);
	}
}



//make this component available to the app
export default PhoneNumberPage;
