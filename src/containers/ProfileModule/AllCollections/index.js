import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'
import { CREATE_USER_COLLECTION, DELETE_USER_COLLECTION } from '@graphql/collections'
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

let container = graphql(CREATE_USER_COLLECTION, {name: 'createUserCollection'})(page);
container = graphql(DELETE_USER_COLLECTION, {name: 'deleteUserCollection'})(container);

export default connect(mapStateToProps, mapDispatchToProps)(container)