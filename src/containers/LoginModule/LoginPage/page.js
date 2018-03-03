import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, Platform, PermissionsAndroid } from 'react-native'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

import RoundButton from '@components/RoundButton'
import LoadingSpinner from '@components/LoadingSpinner'
import * as SCREEN from '@global/screenName'
import { ACCOUNT_MODE, APP_USER_KEY } from '@global/const'
import I18n from '@language'
import { DARK_GRAY_COLOR } from '@theme/colors';
import styles from './styles'

import { client } from '@root/main'
import { GET_PROFILE } from '@graphql/userprofile';
import { EXIST_FACEBOOK_USER } from '@graphql/users'
import Orientation from 'react-native-orientation';
import { APPFONTNAME } from '@theme/fonts';
import Permissions from 'react-native-permissions'

const { GraphRequest, GraphRequestManager, AccessToken } = FBSDK

// create a component
class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      loading: false,
      playerId: ''
    }
    Orientation.lockToPortrait();
  }

  
  componentDidMount() {
    if (Platform.OS == 'android')
      this.requestLocationPermissionForAndroid();
    else {
      Permissions.check('location').then(response => {
        if (response != 'authorized') {
          Permissions.request('location').then(response => {
            if (response == 'authorized') {

            }
          })
        }
      })
    }
  }
  async requestLocationPermissionForAndroid() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can get the Location")
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  async _responseInfoCallback(error, result) {
    if (error) {
      // alert('Error fetching data: ' + error.toString());
      this.setState({ loading: false })
      alert('error, please try again')
    } else {
      var gender = 'NOT_SPECIFIC'
      if (result.gender == 'male')
        gender = 'MALE'
      if (result.gender == 'female')
        gender = 'FEMALE'

      client.query({
        query: GET_PROFILE,
        variables: {
          userId: this.state.id
        }
      }).then((user) => {
        var data = user.data.User

        if (data.playerId) {

          // wheter to sync with facebook or not
          // this.props.updateUser({
          //   variables: {
          //     id: this.state.id,
          //     first_name: result.first_name,
          //     last_name: result.last_name,
          //     gender: gender,
          //     photoURL: result.picture.data.url,
          //     displayName: result.first_name + " " + result.last_name,
          //     registrationDate: new Date().toLocaleDateString()
          //   }
          // })

          this.props.saveUserInfo({
            id: this.state.id,
            createdAt: new Date().toLocaleDateString(),
            updatedAt: new Date().toLocaleDateString(),
            loginMethod: data.loginMethod,
            bio: data.bio,
            gender: data.gender ? data.gender.toUpperCase() : '',
            city: data.city,
            country: data.country,
            photoURL: data.photoURL,
            firstName: data.firstName,
            lastName: data.lastName,
            displayName: data.displayName,
            username: data.username,
            accountVerification: data.accountVerification,
            checkIns: data.checkIns.map(item => item.id),
            blockByUsers: data.blockByUsers,
            playerId: data.playerId
          });
          this.props.saveUserFollows(data.follows);
          AsyncStorage.setItem(APP_USER_KEY, JSON.stringify({
            id: this.state.id
          }));
          this.props.login();
        } else {
          this.props.navigator.push({
            screen: SCREEN.ACCOUNT_CREATE_PAGE,
            title: 'Create Account',
            passProps: {
              mode: ACCOUNT_MODE.facebook,
              info: {
                ...result,
                userId: this.state.id,
              }
            },
            animated: true,
            navigatorStyle: {
              navBarTextFontFamily: APPFONTNAME.Bold,
              navBarTextColor: DARK_GRAY_COLOR,
              naviBarComponentAlignment: 'center'
            },
          })
        }
      });
      this.setState({ loading: false });
    }
  }
  async _fbAuth() {
    this.setState({ loading: true })
    try {
      const value = await AsyncStorage.getItem(APP_USER_KEY);
      let val = JSON.parse(value);
      if (val !== null && val.id !== null) {
        client.query({
          query: GET_PROFILE,
          variables: {
            userId: val.id
          }
        }).then((user) => {
          this.setState({ loading: false })
          var data = user.data.User;
          if (data && data.username) {
            this.props.saveUserInfo({
              id: data.id,
              createdAt: new Date().toLocaleDateString(),
              updatedAt: new Date().toLocaleDateString(),
              loginMethod: data.loginMethod,
              bio: data.bio,
              gender: data.gender ? data.gender.toUpperCase() : '',
              city: data.city,
              country: data.country,
              photoURL: data.photoURL,
              firstName: data.firstName,
              lastName: data.lastName,
              displayName: data.displayName,
              username: data.username,
              accountVerification: data.accountVerification,
              checkIns: data.checkIns.map(item => item.id),
              blockByUsers: data.blockByUsers,
              playerId: data.playerId
            });
            this.props.saveUserFollows(data.follows);
            this.props.login();
          }
          else {//user doesn't exist, maybe admin removed your account
            this.doLogin();
          }
        })
      } else {
        this.doLogin();
      }
    } catch (error) {
      alert(error)
      // Error retrieving data
      console.log(error)
      this.setState({ loading: false })
    }
  }

  doLogin() {
    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_about_me', 'user_birthday', 'user_hometown', 'user_location'])
      .then((result) => {
        if (result.isCancelled) {
          // alert('cancelled')
        } else {
          this.setState({ loading: true })
          return AccessToken.getCurrentAccessToken()
        }
      }).then((data) => {
        const token = data.accessToken.toString()
        return Promise.all([this.props.FacebookLogin({
          variables: { facebookToken: token }
        }),
          token])
      }).then((data) => {
        var gctoken = data[0]
        var fbtoken = data[1]
        this.setState({ id: gctoken.data.authenticateFBUser.id })
        const infoRequest = new GraphRequest(
          '/me?fields=id,first_name,last_name,picture.height(1000),email,gender,address,about',
          null,
          (error, result) => this._responseInfoCallback(error, result),
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      })
      .catch((err) => {
        alert(err.message);
        this.setState({ loading: false })
      });
  }

  onPhoneNumber() {
    // this.props.navigation.navigate('PhoneNumberPage')
    this.props.navigator.push({
      screen: SCREEN.PHONE_NUMBER_PAGE,
      title: 'Create Account',
      passProps: {
        mode: ACCOUNT_MODE.create
      },
      animated: true,
      // animationType: 'fade',
      navigatorStyle: {
        // navBarHidden: true
        navBarTextFontFamily: APPFONTNAME.Bold,
        navBarTextColor: DARK_GRAY_COLOR,
        naviBarComponentAlignment: 'center'
      },
      // navigatorButtons: {}
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode={'contain'}
          style={styles.marker}
          source={require('@assets/images/login/mark.png')}
        />
        {/*
        <Text style={[styles.login_str, styles.first_line]}>{I18n.t('SIGN_LOGIN_STR')}</Text>
        <Text style={[styles.login_str, styles.second_line]}>{I18n.t('WITH_STR')}</Text>
        <RoundButton style={styles.phone_number} title={'Phone Number'} 
          disabled={false}
          pressColor={'#0a91ed'} onPress={this._fbAuth.bind(this)}
        />
        <View style={styles.mid_line}>
          <Text style={styles.or_str}>{I18n.t('OR_STR')}</Text>
        </View>
        <View style={styles.social}>
          <TouchableOpacity onPress={this._fbAuth.bind(this)}>
            <Image style={styles.socialImage} source={require('@assets/images/icon/facebook.png')} />
          </TouchableOpacity>
          <Image style={styles.socialImage} source={require('@assets/images/icon/twitter.png')} 
            accessibilityTraits='button'
          />
          <Image style={styles.socialImage} source={require('@assets/images/icon/gplus.png')} 
            accessibilityTraits='disabled'
          />
        </View>
        */}
        <RoundButton style={styles.loginWithFB} title={I18n.t('LOGINFACEBOOK')}
          pressColor={'transparent'} onPress={this._fbAuth.bind(this)}
        />

        {
          this.state.loading ? (<LoadingSpinner />) : null
        }
      </View>
    );
  }
}

//make this component available to the app
export default LoginPage;
