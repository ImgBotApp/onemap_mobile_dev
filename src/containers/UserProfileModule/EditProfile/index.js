import EditProfile from './page'
import { connect } from 'react-redux'

import { graphql } from 'react-apollo'
import { 
  UPDATE_PROFILE
} from '@graphql/userprofile'

function mapStateToProps(state) {
  return {
    user: state.User
  }
}

let container = graphql(UPDATE_PROFILE, {name: 'updateUser'})(EditProfile);

export default connect(mapStateToProps)(container)