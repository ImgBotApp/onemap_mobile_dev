import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { 
  createUserwithFacebook, 
  saveUserId, 
  saveProfileInfo 
} from '@actions/userLogIn'

import * as appActions from '@reducers/app/actions'

import { saveUserInfo } from '@reducers/user/actions'

import Page from './page'

import { 
  AUTHENTICATE_FACEBOOK_USER, 
  UPDATE_USER ,
  EXIST_FACEBOOK_USER
} from '@graphql/users'

function mapStateToProps (state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps (dispatch) {
  // return bindActionCreators(Actions, dispatch)
  return {
    createUser: token => {
      dispatch(createUserwithFacebook(token))
    },
    saveUserId: (id, token) => {
      dispatch(saveUserId(id, token))
    },
    saveProfileInfo: data => {
      dispatch(saveProfileInfo(data))
    },
    login: () => {
      dispatch(appActions.login())
    },
    saveUserInfo: (data) => {
      dispatch(saveUserInfo(data))
    }
  }
}

let container = graphql(AUTHENTICATE_FACEBOOK_USER, {name: 'FacebookLogin'})(Page);
container = graphql(UPDATE_USER, {name: 'updateFacebookUser'})(container);

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(container);
