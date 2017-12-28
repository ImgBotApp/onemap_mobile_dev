//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyBoard, Keyboard, Picker, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';
import Toast, { DURATION } from 'react-native-easy-toast'

import styles from './styles'
import I18n from '@language'

import { NavigationActions } from 'react-navigation'
// Redux 
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '@actions'

import * as appActions from '@reducers/app/actions'

import { DARK_GRAY_COLOR } from '@theme/colors'

// create a component
class ProfileCreatePage extends Component {
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
        id: 'createAccount',
        buttonColor: DARK_GRAY_COLOR,
        disableIconTint: true
      }
    ]
  };
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      name: '',
      country: '',
      city: '',
      birthday: new Date(),
      gender: '',
      bio: '',
      isDateTimePickerVisible: false,
      success: false
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent (event) {
    if (event.type == 'NavBarButtonPress') {
      if(event.id == 'backButton') {
       this.onBackButtonPress()
      }
      if(event.id == 'createAccount') {
        // this.props.navigator.push({
        //   screen: SCREEN.ACCOUNT_CREATE_PAGE,
        //   title: I18n.t('CREATE_ACCOUNT'),
        //   passProps: {
        //     phoneNumber: this.props.phoneNumber
        //   }
        // })
        var valid = this.checkValidation()
        if ( valid ) {
          this.setState({
            success: true
          })
          this.props.dispatch(appActions.login())
        }
      }
    }
  }
  onBackButtonPress() {
    this.props.navigator.pop({
      animated: true
    })
  }
  componentWillMount () {
    // this.props.navigation.setParams({submitProfile: $this.submitProfile})
  }
  _showDatePicker = () => {
    this.setState({isDateTimePickerVisible: true})
    Keyboard.dismiss()
  }
  _hideDatePicker = () => {
    this.setState({isDateTimePickerVisible: false})
  }
  _onConfirmBirthDay = (date) => {
    this.setState({birthday: date})
    this.setState({isDateTimePickerVisible: false})
  }
  _onGenderSelect = (value, index, data) => {
    this.setState({gender: value})
  }
  async submitProfile () {
    // var complete = $this.checkValidation()
    // if ( complete == false ) return
    var ret = this.props.createProfile({
      type: 'test'
    });
    alert(JSON.stringify(ret))
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({routeName: 'LoginPage'})
    //     // $this.props.navigation.navigate('Drawer')
    //   ]
    // })
    // $this.props.navigation.dispatch(resetAction);
    // $this.props.navigation.navigate('Drawer')
  }

  checkValidation () {
    if (this.state.username == '') {
      this.onShowMessage('Please input Username')
      this.refs.username.focus()
      return false
    }
    if (this.state.name == '') {
      this.onShowMessage('Please input name')
      this.refs.name.focus()
      return  false
    }
    if (this.state.country == '') {
      this.onShowMessage('Please input country')
      this.refs.country.focus()
      return  false
    }
    if (this.state.city == '') {
      this.onShowMessage('Please input city')
      this.refs.city.focus()
      return  false
    }
    if (this.state.gender == '') {
      this.onShowMessage('Please input gender')
      this.refs.gender.focus()
      return  false
    }
    if (this.state.bio == '') {
      this.onShowMessage('Please input bio')
      this.refs.bio.focus()
      return  false
    }
    return true
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
      <View style={styles.container}>
      <KeyboardAwareScrollView styles={styles.scrollView}
        innerRef={ref => {this.scroll = ref}}
        extraHeight={30}
      >      
        <View style={styles.textDescription}>
          <Text style={styles.descriptionText}>{I18n.t('CREATE_PROFILE_DESCRIPTION1')}</Text>
          <Text style={styles.descriptionText}>{I18n.t('CREATE_PROFILE_DESCRIPTION2')}</Text>
        </View>
        <View style={styles.profile}>
          <Text style={styles.hintText}>*A-Z, a-z, 0-9, Only English</Text>
          <TextInput style={[styles.infoText]} 
            ref="username"
            placeholder={I18n.t('CREATE_PROFILE_USERNAME')}
            onChangeText={(text) => this.setState({username: text})}
            returnKeyType={'next'}
            onSubmitEditing={() => this.refs.name.focus() }
            value={this.state.username}
          />
          <Text style={styles.hintText}>*A-Z, a-z, 0-9, Only English</Text>          
          <TextInput style={[styles.infoText]} 
            ref="name"
            placeholder={I18n.t('CREATE_PROFILE_DISPLAYNAME')}
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
            returnKeyType={'next'}
            onSubmitEditing={() => this.refs.country.focus()}
          />
          <TextInput style={[styles.infoText]} 
            ref="country"
            placeholder={I18n.t('CREATE_PROFILE_COUNTRY')}
            onChangeText={(text) => this.setState({country: text})}
            value = {this.state.country}
            returnKeyType={'next'}
            onSubmitEditing={() => this.refs.city.focus()}
          />
          <TextInput style={[styles.infoText]} 
            ref="city"
            placeholder={I18n.t('CREATE_PROFILE_CITY')}
            onChangeText={(text) => this.setState({city: text})}
            value = {this.state.city}
            returnKeyType={'next'}
            onSubmitEditing={() => this.refs.birthday.focus()}
          />
          <TextInput style={[styles.infoText]} 
            ref="birthday"
            onFocus={this._showDatePicker.bind(this)}
            placeholder={'Birthday'}
            value = {this.state.birthday.toLocaleDateString()}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._onConfirmBirthDay}
            onCancel={this._hideDatePicker}
          />
          <View style={[styles.genderSelection]}>
            <Dropdown
              ref="gender"
              label='Gender'
              data={Genderdata}
              onChangeText={this._onGenderSelect.bind(this)}
            />
          </View>
          <Text style={styles.bio}>{I18n.t('CREATE_PROFILE_BIO')}</Text>
          <TextInput 
            ref="bio"
            style={styles.bioText}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => {this.setState({bio: text})}}
            value={this.state.bio}
            onFocus={() => {this.scroll.scrollToEnd(true)}}
            returnKeyType={'next'}
            onSubmitEditing={() => this.submitProfile.bind(this)}
          />
        </View>
        <Toast ref="toast" />
        </KeyboardAwareScrollView>
        {
          this._showSuccess()
        }
      </View>
      
    );
  }
  _showSuccess () {
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

function mapStateToProps (state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}

//make this component available to the app
// export default ProfileCreatePage;
export default connect(mapStateToProps)(ProfileCreatePage);