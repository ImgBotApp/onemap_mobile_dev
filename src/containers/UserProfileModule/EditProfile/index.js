import EditProfile from './page'
import { connect } from 'react-redux'

import { graphql } from 'react-apollo'
import { 
  UPDATE_USER
} from '@graphql/users'

function mapStateToProps(state) {
  return {
    user: state.User
  }
}

let container = graphql(UPDATE_USER, {name: 'updateUser'})(EditProfile);

export default connect(mapStateToProps)(container)