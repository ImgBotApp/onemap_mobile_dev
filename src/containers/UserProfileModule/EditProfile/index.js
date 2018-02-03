import EditProfile from './page'
import { connect } from 'react-redux'

import { graphql } from 'react-apollo'
import { UPDATE_PROFILE } from '@graphql/userprofile'
import { saveUserInfo } from '@reducers/user/actions'

function mapStateToProps(state) {
  return {
    user: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: data => {
      dispatch(saveUserInfo(data))
    }
  }
}

let container = graphql(UPDATE_PROFILE, { name: 'updateUser' })(EditProfile);

export default connect(mapStateToProps, mapDispatchToProps)(container)