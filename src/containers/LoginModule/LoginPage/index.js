import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { login, saveUserInfo } from '@reducers/user/actions'
import { saveUserFollows } from '@reducers/app/actions'

import page from './page'

import {
  AUTHENTICATE_FACEBOOK_USER,
  ADD_PUSH_TOKEN
} from '@graphql/users'

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
    saveUserInfo: (data) => {
      dispatch(saveUserInfo(data))
    },
    saveUserFollows: data => {
      dispatch(saveUserFollows(data))
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(AUTHENTICATE_FACEBOOK_USER, { name: 'FacebookLogin' }),
  graphql(ADD_PUSH_TOKEN, { name: 'addPushToken' }),

)(page)
