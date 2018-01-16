import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'
import { DELETE_USER_COLLECTION } from '@graphql/collections'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

let container = graphql(DELETE_USER_COLLECTION, {name: 'deleteUserCollection'})(page);

export default connect(mapStateToProps, mapDispatchToProps)(container)