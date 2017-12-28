import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { 
  createUserwithFacebook, 
  saveUserId, 
  saveProfileInfo 
} from '@actions/userLogIn'

import * as appActions from '@reducers/app/actions'

import Page from './page'

import { 
  AUTHENTICATE_FACEBOOK_USER, 
  UPDATE_FACEBOOK_USER 
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
    }
  }
}

const container = graphql(AUTHENTICATE_FACEBOOK_USER, {name: 'FacebookLogin'})((
  graphql(UPDATE_FACEBOOK_USER, {name: 'updateFacebookUser'})
)(Page))

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(container);
