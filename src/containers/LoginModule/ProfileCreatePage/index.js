//import liraries
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, KeyBoard, Keyboard, Picker, TouchableOpacity, Image, AsyncStorage
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';
import Toast, { DURATION } from 'react-native-easy-toast'
import CircleImage from '@components/CircleImage'

import styles from './styles'
import I18n from '@language'
import { ACCOUNT_MODE, APP_USER_KEY } from '@global/const'

// Redux 
import { connect } from 'react-redux'

import { login, saveUserInfo } from '@reducers/user/actions'

import { DARK_GRAY_COLOR } from '@theme/colors'
import { graphql } from 'react-apollo'
import { getDeviceWidth } from '@global'
import { UPDATE_PROFILE } from '@graphql/userprofile'

import ImagePicker from 'react-native-image-crop-picker'
import ActionSheet from 'react-native-actionsheet'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PhoneInput from 'react-native-phone-input'
import LoadingSpinner from '@components/LoadingSpinner'
import { uploadImage } from '@global/cloudinary';

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = ['Cancel', 'Take Photo...', 'Choose from Library...']
const title = 'Select Avatar'

const imagePickerOptions = {
  width: 1080,
  height: 1080,
  cropping: true,
  includeBase64: true,
  includeExif: true,
}

// create a component
class ProfileCreatePage extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: '',
        id: 'backButton',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ],
    rightButtons: [
      {
        title: I18n.t('DONE_STR'),
        id: 'createAccount',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor(props) {
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

    var today = new Date().toLocaleDateString();
    var user = "@" + this.props.info.first_name + this.props.info.last_name;
    this.state = {
      username: user,
      displayName: this.props.info.first_name + " " + this.props.info.last_name,
      photoURL: this.props.info.picture.data.url,
      country: 'Thailand',
      city: 'Thailand',
      birthday: today,
      gender: this.props.info.gender.toUpperCase() || 'FEMALE',
      bio: this.props.info.about || '',
      loginMethod: this.props.mode == ACCOUNT_MODE.facebook ? 'FACEBOOK' : 'PHONE',
      isDateTimePickerVisible: false,
      success: false,
      userId: this.props.info.userId || '',
      processing: false,
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.handlePress = this.handlePress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.onBackButtonPress()
      }
      if (event.id == 'createAccount') {
        // this.props.navigator.push({
        //   screen: SCREEN.ACCOUNT_CREATE_PAGE,
        //   title: I18n.t('CREATE_ACCOUNT'),
        //   passProps: {
        //     phoneNumber: this.props.phoneNumber
        //   }
        // })
        var valid = this.checkValidation()
        if (valid) {
          this.setState({
            success: true
          })
          this.props.saveUserInfo({
            id: this.state.userId,
            country: this.state.country,
            city: this.state.city,
            displayName: this.state.displayName,
            email: this.props.info.mail,
            username: this.state.username,
            accountStatus: "ENABLE",
            bio: this.state.bio,
            firstName: this.props.info.first_name,
            lastName: this.props.info.last_name,
            birthdate: '',
            photoURL: this.state.photoURL,
            registrationDate: new Date().toLocaleDateString(),
            mobileVerification: false,
            mobile: "iPhone",
            gender: this.state.gender.toUpperCase(),
            checkIns: [],
            blockByUsers: []
          });
          this.props.updateUser({
            variables: {
              id: this.state.userId,
              firstName: this.props.info.first_name,
              lastName: this.props.info.last_name,
              gender: this.state.gender.toUpperCase(),
              photoURL: this.state.photoURL,
              displayName: this.state.displayName,
              registrationDate: new Date().toLocaleDateString(),
              city: this.state.city,
              country: this.state.country,
              bio: this.state.bio,
              username: this.state.username,
              group: 'USER'
            }
          }).then(result => {
            if (result)
              console.log("result =" + result);
          }
            );
          AsyncStorage.setItem(APP_USER_KEY, JSON.stringify({
            id: this.state.userId
          }))
          this.props.login();
        }
      }
    }
  }

  onBackButtonPress() {
    this.props.navigator.pop({
      animated: true
    })
  }

  componentWillMount() {
    // this.props.navigation.setParams({submitProfile: $this.submitProfile})
    this.onChangeUserName(this.state.username);

  }
  _showDatePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
    Keyboard.dismiss()
  }
  _hideDatePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }
  _onConfirmBirthDay = (date) => {
    var dateStr = date.toLocaleDateString();
    this.setState({ birthday: date.toLocaleDateString() })
    this.setState({ isDateTimePickerVisible: false })
  }

  async submitProfile() {
    // var complete = $this.checkValidation()
    // if ( complete == false ) return
    var ret = this.props.createProfile({
      type: 'test'
    });
    alert(JSON.stringify(ret))
  }

  checkValidation() {
    if (this.state.username.length <= 1) {
      this.onShowMessage('Please input Username')
      this.refs.username.focus()
      return false
    }
    if (this.state.displayName.length <= 0) {
      this.refs.toast.show('Please input Full Name')
      this.refs.displayname.focus();
      return false;
    }
    if (this.state.displayName.indexOf(' ') < 0) {
      this.refs.toast.show('Please input Full Name')
      this.refs.displayname.focus();
      return false;
    }
    if (this.state.country == '') {
      this.onShowMessage('Please input country')
      this.refs.country.focus()
      return false
    }
    if (this.state.city == '') {
      this.onShowMessage('Please input city')
      this.refs.city.focus()
      return false
    }
    if (this.state.gender == '') {
      this.onShowMessage('Please input gender')
      this.refs.gender.focus()
      return false
    }
    if (this.state.bio == '') {
      this.onShowMessage('Please input bio')
      this.refs.bio.focus()
      return false
    }

    var subnames = this.state.displayName.split(' ');
    var lastname = '';
    for (var i = 1; i < subnames.length; i++)
      lastname += subnames[i] + ' ';
    this.setState({ first_name: subnames[0], last_name: lastname });
    return true
  }
  showActionSheet() {
    this.ActionSheet.show()
  }
  handlePress(i) {
    this.setState({
      selected: i
    })
    if (i == 2) {
      this.onProfileImagePickerFromLibrary();
    }
    else if (i == 1) {
      this.onProfileImagePickerFromCamear();
    }
  }
  onProfileImagePickerFromLibrary() {
    this.setState({ processing: true });
    ImagePicker.openPicker(imagePickerOptions).then(image => {
      if (image != null) {
        uploadImage(image.data).then(url => {
          this.setState({ processing: false });
          if (url)
            this.setState({
              photoChanged: true,
              photoURL: url
            });
        })
      } else this.setState({ processing: false });
    }).catch(e => this.setState({ processing: false }));
  }
  onProfileImagePickerFromCamear() {
    this.setState({ processing: true });
    ImagePicker.openCamera(imagePickerOptions).then(image => {
      if (image != null) {
        uploadImage(image.data).then(url => {
          this.setState({ processing: false });
          if (url)
            this.setState({
              photoChanged: true,
              photoURL: url
            });
        })
      } else this.setState({ processing: false });
    }).catch(e => this.setState({ processing: false }));
  }
  onChangeDisplayName(val) {
    let result = "";
    for (var i = 0; i < val.length; i++) {
      var lastChar = val[i];
      if ((lastChar >= 'a' && lastChar <= 'z') ||
        (lastChar >= 'A' && lastChar <= 'Z') ||
        (lastChar >= '0' && lastChar <= '9') || lastChar == ' '
      )
        result += lastChar;
    }
    this.setState({ displayName: result });
  }
  onChangeUserName(val) {
    if (val.length <= 1)
      this.setState({ username: "@" });
    else {
      let result = "@";
      for (var i = 1; i < val.length; i++) {
        var lastChar = val[i];
        if ((lastChar >= 'a' && lastChar <= 'z') ||
          (lastChar >= 'A' && lastChar <= 'Z') ||
          (lastChar >= '0' && lastChar <= '9')
        )
          result += lastChar;
      }
      this.setState({ username: result });
    }
  }
  _onGenderSelect = (value, index, data) => {
    switch (index) {
      case 0: this.setState({ gender: "MALE" }); break;
      case 1: this.setState({ gender: "FEMALE" }); break;
      case 2: this.setState({ gender: "NOT_SPECIFIC" }); break;
      default: this.setState({ gender: "NOT_SPECIFIC" }); break;
    }
  }
  render() {
    let Genderdata = [{
      value: I18n.t('MALE'),
    }, {
      value: I18n.t('FEMALE'),
    }, {
      value: I18n.t('NOT_SPECIFIC'),
    }];

    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: '#efefef' }}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {/*
            <Text numberOfLines={2} style={styles.enterText}>{I18n.t('INPUT_YOUR_DETAILS')}</Text>
            */}
            <View style={styles.avatarView}>
              <TouchableOpacity style={styles.avatarView} onPress={this.showActionSheet.bind(this)}>
                <CircleImage style={styles.profileImage} uri={this.state.photoURL} radius={getDeviceWidth(236)} />
                <Image style={styles.cameraImage} source={require('@assets/images/icon/camera.png')} />
              </TouchableOpacity>
            </View>

            {/* Name */}
            <View style={styles.inputElement}>
              <View style={styles.fontAweSome}>
                <EvilIcons name="user" size={24} color="#0a91ed" />
              </View>
              <TextInput ref="displayname" style={styles.textInput} value={this.state.displayName} onChangeText={(val) => this.onChangeDisplayName(val)} />
            </View>

            {/*
            <View style={[styles.textElement,{flexDirection:'row'}]}>
              <View style={styles.fontAweSome}>
                <Ionicons name="ios-phone-portrait-outline" size={24} color="#0a91ed" />            
              </View>
              <View style={styles.text}>
                <PhoneInput ref='phone' textStyle={{fontFamily: 'Comfortaa-Light'}} confirmText={'Confirm'} initialCountry={"us"}/>
              </View>
              
            </View> 

            <View style={styles.inputElement}>
              <TouchableOpacity onPress={() => this.setState({isDateTimePickerVisible : true})}>
              <View style={{flexDirection: 'row'}}>
              <View style={styles.fontAweSome}>
                <EvilIcons name="calendar" size={24} color="#0a91ed" />            
              </View>
              <View style={styles.text}>
                <Text style={{fontFamily: 'Comfortaa-Light'}}>{this.state.birthday} </Text>
              </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._onConfirmBirthDay.bind(this)}
                onCancel={this._hideDatePicker.bind(this)}
              />
              </View>
              </TouchableOpacity>
            </View> 
            */}
            {/* gender */}
            <View style={styles.genderElement}>
              <View style={styles.genderAwesome}>
                <Image style={styles.genderIcon} source={require('@assets/images/icon/gender.png')} />
              </View>
              <View style={[styles.genderSelection]}>
                <Dropdown
                  ref="gender"
                  label='Gender'
                  style={styles.gender}
                  itemTextStyle={styles.genderItem}
                  value={
                    I18n.t(this.state.gender) ? I18n.t(this.state.gender) : I18n.t("NOT_SPECIFIC")
                  }
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
              <TextInput ref="username" style={styles.textInput} value={this.state.username} onChangeText={(val) => this.onChangeUserName(val)} />
            </View>
            {/* bio */}
            <View style={styles.inputElement}>
              <Text style={styles.biolabel}>{I18n.t('CREATE_PROFILE_BIO')}</Text>
            </View>
            <View style={styles.bioInput}>
              <TextInput ref="bio" style={styles.bioText} underlineColorAndroid={'transparent'} multiline={true} numberOfLines={4} editable={true} value={this.state.bio} onChangeText={(val) => this.setState({ bio: val })} />
            </View>

            {/*
            <Text style={styles.hintText}>*A-Z, a-z, 0-9, Only English</Text>
            
            */}
          </View>
        </KeyboardAwareScrollView>
        {
          this._showSuccess()
        }
        {
          this.state.processing ? (<LoadingSpinner />) : null
        }
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
        <Toast ref="toast" />
      </View>
    );
  }
  _showSuccess() {
    if (this.state.success) {
      return (
        <Image style={styles.success} source={require('@assets/images/login/create.png')} />
      );
    } else {
      return null
    }
  }

  onShowMessage(string) {
    this.refs.toast.show(string)
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      dispatch(login())
    },
    saveUserInfo: data => {
      dispatch(saveUserInfo(data))
    }
  }
}

let container = graphql(UPDATE_PROFILE, { name: 'updateUser' })(ProfileCreatePage);

//make this component available to the app
// export default ProfileCreatePage;
export default connect(mapStateToProps, mapDispatchToProps)(container);