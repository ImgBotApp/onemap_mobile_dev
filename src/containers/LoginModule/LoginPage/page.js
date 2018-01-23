//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import FBSDK, { Loginmanager, LoginManager } from 'react-native-fbsdk'


import I18n from '@language'
import styles from './styles'

import RoundButton from '@components/RoundButton'
import LoadingSpinner from '@components/LoadingSpinner'
import * as SCREEN from '@global/screenName'
import { ACCOUNT_MODE, APP_USER_KEY } from '@global/const'
import { DARK_GRAY_COLOR } from '../../../theme/colors';
import * as appActions from '@reducers/app/actions'

import { EXIST_FACEBOOK_USER } from '@graphql/users'
import { client } from '@root/main'
import { saveUserInfo } from '@reducers/user/actions'
import { GET_PROFILE } from '@graphql/userprofile';

const { GraphRequest, GraphRequestManager, AccessToken ,LoginButton} = FBSDK

// create a component
class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      loading: false
    }
  }
  async _responseInfoCallback(error, result) {
    if (error) {
      // alert('Error fetching data: ' + error.toString());
      this.setState({loading: false})
      alert('error, please try again')  
    } else {
      var gender = 'NOT_SPECIFIC'
      if ( result.gender == 'male') 
        gender = 'MALE'
      if ( result.gender == 'female') 
        gender = 'FEMALE'
      
      let UserExist = await client.query({
        query: GET_PROFILE,
        variables: {
          userId: this.state.id
        }
      }).then((user) => {
        var data = user.data.User
        if ( data.firstName ) {
          this.props.saveUserInfo({
            id: this.state.id,
            createdAt: new Date().toLocaleDateString(),
            updatedAt: new Date().toLocaleDateString(),
            loginMethod: data.loginMethod,
            bio: data.bio,
            gender: data.gender.toUpperCase(),
            city: data.city,
            country: data.country,
            photoURL: data.photoURL,
            firstName: data.firstName,
            lastName: data.lastName,
            displayName: data.displayName,
            username: data.username
          })
          // this.props.dispatch(appActions.login())
          this.props.login();
        } else {
          this.props.navigator.push({
            screen: SCREEN.ACCOUNT_CREATE_PAGE,
            title: 'Create Account',
            passProps: {
              mode: ACCOUNT_MODE.facebook,
              info: {
                ...result,
                userId: this.state.id
              }
            },
            animated: true,
            navigatorStyle: {
              navBarTextColor: DARK_GRAY_COLOR,
              navBarTextFontFamily: 'Comfortaa-Regular',
              naviBarComponentAlignment: 'center'
            },
          })        
        }
      })
      // var user = await this.props.updateFacebookUser({
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
      // this.props.navigator.push({
      //   screen: SCREEN.ACCOUNT_CREATE_PAGE,
      //   title: 'Create Account',
      //   passProps: {
      //     mode: ACCOUNT_MODE.create
      //   },
      //   animated: true,
      //   // animationType: 'fade',
      //   navigatorStyle: {
      //     // navBarHidden: true
      //     navBarTextColor: DARK_GRAY_COLOR,
      //     navBarTextFontFamily: 'Comfortaa-Regular',
      //     naviBarComponentAlignment: 'center'
      //   },
      //   // navigatorButtons: {}
      // })
      // var userInfo = user.data.updateUser
      // this.props.saveProfileInfo({
      //   username: userInfo.id,
      //   name: userInfo.displayName,
      //   gender: userInfo.gender,
      //   photoURL: userInfo.photoURL,
      //   first_name: result.first_name,
      //   last_name: result.last_name,
      //   registrationDate: userInfo.registrationDate
      // })
      this.setState({loading: false})
      // alert('success')
    //   this.props.navigation.navigate('Drawer',this.props.user)
    }
  }
  async _fbAuth () {
    this.setState({loading: true})
    try {
      const value = await AsyncStorage.getItem(APP_USER_KEY);
      let val = JSON.parse(value);
      if (val !== null && val.id !== null){
        // We have data!!
        let UserExist = await client.query({
          query: GET_PROFILE,
          variables: {
            id: val.id
          }
        }).then((user) => {
          // alert(JSON.stringify(user))
          this.setState({loading: false})
          var data = user.data.User
          if ( data.firstName ) {
            this.props.saveUserInfo({
              id: data.id,
              createdAt: new Date().toLocaleDateString(),
              updatedAt: new Date().toLocaleDateString(),
              loginMethod: data.loginMethod,
              bio: data.bio,
              gender: data.gender.toUpperCase(),
              city: data.city,
              country: data.country,
              photoURL: data.photoURL,
              firstName: data.firstName,
              lastName: data.lastName,
              displayName: data.displayName,
              username: data.username
            })
            this.props.login();
          } 
          else {
            // this.props.navigator.push({
            //   screen: SCREEN.ACCOUNT_CREATE_PAGE,
            //   title: 'Create Account',
            //   passProps: {
            //     mode: ACCOUNT_MODE.facebook,
            //     info: {
                  
            //       userId: this.state.id
            //     }
            //   },
            //   animated: true,
            //   navigatorStyle: {
            //     navBarTextColor: DARK_GRAY_COLOR,
            //     navBarTextFontFamily: 'Comfortaa-Regular',
            //     naviBarComponentAlignment: 'center'
            //   },
            // })


            //LoginManager.logInWithReadPermissions(['public_profile','email','user_about_me','user_birthday','user_hometown','user_location'])
            LoginManager.logInWithReadPermissions(['public_profile','email'])
            .then((result) => {
              if (result.isCancelled) {
                // alert('cancelled')
              } else {
                this.setState({loading: true})
                return AccessToken.getCurrentAccessToken()
              }
            }).then((data) => {
              const token = data.accessToken.toString()
              return Promise.all([this.props.FacebookLogin({
                  variables: { facebookToken: token }}), 
                token])
            }).then((data) => {
              var gctoken = data[0]
              var fbtoken = data[1]
              this.setState({id: gctoken.data.authenticateFBUser.id})
              this.props.saveUserId(gctoken.data.authenticateFBUser.id, gctoken.data.authenticateFBUser.token)
              const infoRequest = new GraphRequest(
                '/me?fields=id,first_name,last_name,picture,email,gender,address,about',
                null,
                (error, result) => this._responseInfoCallback(error, result),
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            })
            .catch((err) => {
              console.log(err)
              this.setState({loading: false})   
            })
          }
        })
      } else {
        LoginManager.logInWithReadPermissions(['public_profile','email','user_about_me','user_birthday','user_hometown','user_location'])
        .then((result) => {
          if (result.isCancelled) {
            // alert('cancelled')
          } else {
            this.setState({loading: true})
            return AccessToken.getCurrentAccessToken()
          }
        }).then((data) => {
          const token = data.accessToken.toString()
          return Promise.all([this.props.FacebookLogin({
              variables: { facebookToken: token }}), 
            token])
        }).then((data) => {
          var gctoken = data[0]
          var fbtoken = data[1]
          this.setState({id: gctoken.data.authenticateFBUser.id})
          this.props.saveUserId(gctoken.data.authenticateFBUser.id, gctoken.data.authenticateFBUser.token)
          const infoRequest = new GraphRequest(
            '/me?fields=id,first_name,last_name,picture,email,gender,address,about',
            null,
            (error, result) => this._responseInfoCallback(error, result),
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        })
        .catch((err) => {
          alert(JSON.stringify(err))
          console.log(err)
          this.setState({loading: false})   
        })
      }
      return;
    } catch (error) {
      // Error retrieving data
      console.log(error)
      this.setState({loading: false})
    }
  }

  onPhoneNumber () {
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
        navBarTextColor: DARK_GRAY_COLOR,
        navBarTextFontFamily: 'Comfortaa-Regular',
        naviBarComponentAlignment: 'center'
      },
      // navigatorButtons: {}
    })
  }
  onTestUser () {

  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.marker} source={require('@assets/images/login/mark.png')} />
        {/* <Text style={[styles.login_str, styles.first_line]}>{I18n.t('SIGN_LOGIN_STR')}</Text>
        <Text style={[styles.login_str, styles.second_line]}>{I18n.t('WITH_STR')}</Text> */}
         <Text style={[styles.login_str, styles.first_line]}></Text>
        <Text style={[styles.login_str, styles.second_line]}></Text>
        <RoundButton style={styles.phone_number} title={'Login With FaceBook'} 
          disabled={false}
          pressColor={'white'} onPress={this._fbAuth.bind(this)}
        />
        {/* <View >
            <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        alert(data.accessToken.toString())
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => alert("logout.")}/>
          </View> */}
        {/* <View style={styles.mid_line}>
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
        </View> */}
        {
          this.state.loading ? (<LoadingSpinner />) : null
        }
      </View>
    );
  }
}

//make this component available to the app
export default LoginPage;