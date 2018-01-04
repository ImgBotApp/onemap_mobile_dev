//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from 'react-native-modal-datetime-picker'

import { Dropdown } from 'react-native-material-dropdown';

import ImagePicker from 'react-native-image-picker'
import CircleImage from '@components/CircleImage'

import styles from './styles'
import { getDeviceWidth } from '@global'
import I18n from '@language'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
import * as SCREEN from '@global/screenName'
import { saveUserInfo } from '@reducers/user/actions'


const imagePickerOptions = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

// create a component
class EditProfile extends Component {
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
        id: 'done',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    console.log(props.user)
    this.state = {
      ...props.user,
      displayName: props.user.displayName || props.user.firstName + ' ' + props.user.lastName,
      photoChanged: false,
      isDateTimePickerVisible: false,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent=(event) => {
    if(event.type == 'NavBarButtonPress') {
      if(event.id == 'backButton') {
        this.props.navigator.pop({})
      } else if (event.id == 'done' ){
        this.props.dispatch(saveUserInfo({
          id: this.state.id,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),
          loginMethod: this.state.loginMethod,
          bio: this.state.bio,
          gender: this.state.gender,
          city: this.state.city,
          country: this.state.country,
          photoURL: this.state.photoURL,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          displayName: this.state.displayName
        }))
        this.props.updateUser({
          variables: {
            id: this.state.id,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            gender: this.state.gender.toUpperCase(),
            photoURL: this.state.photoURL,
            displayName: this.state.displayName,
            registrationDate: new Date().toLocaleDateString(),
            city: this.state.city,
            country: this.state.country,
            bio: this.state.bio
          }
        })
        this.props.navigator.pop({})
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      phoneNumber: nextProps.user.phoneNumber || 'aa'
    })
  }

  _showDatePicker = () => {
    this.setState({isDateTimePickerVisible: true})
  }
  _hideDatePicker = () => {
    this.setState({isDateTimePickerVisible: false})
  }
  _onConfirmBirthDay (date) {
    this.setState({birthday: date.toLocaleDateString()})
    this.setState({isDateTimePickerVisible: false})
  }
  _SaveProfile (navigation) {
    navigation.goBack()
  }
  _onGenderSelect = (value, index, data) => {
    this.setState({gender: value})
  }

  onPhoneNumberEdit =() => {
    this.props.navigator.push({
      screen: SCREEN.USER_PHONE_EDIT,
      title: 'Phone Number',
      animated: true,
      passProps: {
        phoneNumber: this.state.phoneNumber
      }
    })
  }

  onProfileImagePick () {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {

      } else if (response.error) {
        alert('There is an error')
      } else {
        this.setState({
          photoChanged: true,
          photoURL: response.uri
        });
      }
    })
  }
  render() {
    let Genderdata = [{
      value: I18n.t('GENDER_MAILE_STR'),
    }, {
      value: I18n.t('GENDER_FEMALE_STR'),
    }, {
      value: I18n.t('GENDER_NOT_SAY_STR'),
    }];
    return (
      <View style={{height: '100%', flex: 1,backgroundColor: '#efefef'}}>
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onProfileImagePick.bind(this)}>
          <CircleImage style={styles.profileImage} uri={this.state.photoURL} radius={getDeviceWidth(236)}/>
        </TouchableOpacity>
        
        {/* Name */}
        <View style={styles.inputElement}>
          <View style={styles.fontAweSome}>
            <EvilIcons name="user" size={24} color="#0a91ed" />
          </View>
          <TextInput style={styles.textInput} value={this.state.displayName} onChangeText={(val) => this.setState({displayName: val})}/>
        </View>
        {/* Phone Number */}
        {/* <View style={styles.textElement}>
          <TouchableOpacity onPress={this.onPhoneNumberEdit.bind(this)} style={{flexDirection:'row'}}>
          <View style={styles.fontAweSome}>
            <Ionicons name="ios-phone-portrait-outline" size={24} color="#0a91ed" />            
          </View>
          <View style={styles.text}>
            <Text>{this.state.phoneNumber} </Text>
          </View>
          </TouchableOpacity>
        </View> */}
        {/* Calender */}
        {/* <View style={styles.inputElement}>
          <TouchableOpacity onPress={() => this.setState({isDateTimePickerVisible : true})}>
          <View style={{flexDirection: 'row'}}>
          <View style={styles.fontAweSome}>
            <EvilIcons name="calendar" size={24} color="#0a91ed" />            
          </View>
          <View style={styles.text}>
            <Text>{this.state.birthday} </Text>
          </View>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._onConfirmBirthDay.bind(this)}
            onCancel={this._hideDatePicker.bind(this)}
          />
          </View>
          </TouchableOpacity>
        </View> */}
        {/* gender */}
        <View style={styles.genderElement}>
          <View style={styles.genderAwesome}>
            <MaterialCommunityIcons name="gender-male-female" size={24} color="#0a91ed" />
          </View>
          <View style={[styles.genderSelection]}>
            <Dropdown
              ref="gender"
              label='Gender'
              style={styles.gender}
              value={I18n.t('GENDER_MAILE_STR')}
              data={Genderdata}
              onChangeText={this._onGenderSelect.bind(this)}
            />
          </View>
        </View>
        {/* User Name */}
        <View style={styles.inputElement}>
          <View style={styles.fontAweSome}>
            <EvilIcons name="tag" size={24} color="#0a91ed" />
          </View>
          <TextInput style={styles.textInput} value={this.state.username} onChangeText={(val) => this.setState({username: val})}/>
        </View>
        {/* bio */}
        <View style={styles.bioInput}>
          <TextInput style={styles.bioText} underlineColorAndroid={'transparent'} multiline = {true} numberOfLines = {4} editable={true} value={this.state.bio} onChangeText={(val) => this.setState({bio: val})}/>
        </View>
      </View>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

// define your styles


//make this component available to the app
export default EditProfile;
