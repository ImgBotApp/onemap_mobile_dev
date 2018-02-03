import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import * as appActions from '@reducers/app/actions'

import { saveUserInfo } from '@reducers/user/actions'

import Page from './page'

import { 
  AUTHENTICATE_FACEBOOK_USER, 
  EXIST_FACEBOOK_USER
} from '@graphql/users'
import { UPDATE_PROFILE } from '@graphql/userprofile';

function mapStateToProps (state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: () => {
      dispatch(appActions.login())
    },
    saveUserInfo: (data) => {
      dispatch(saveUserInfo(data))
    },
    saveUserFollows: data => {
      dispatch(appActions.saveUserFollows(data))
    }
  }
}

let container = graphql(AUTHENTICATE_FACEBOOK_USER, {name: 'FacebookLogin'})(Page);
container = graphql(UPDATE_PROFILE, {name: 'updateFacebookUser'})(container);

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(container);
