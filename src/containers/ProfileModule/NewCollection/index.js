import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { CREATE_USER_COLLECTION, DELETE_USER_COLLECTION } from '@graphql/collections'
import { saveCollections } from '@reducers/app/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
    collections: state.app.collections
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveCollections: data => {
      dispatch(saveCollections(data))
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(CREATE_USER_COLLECTION, { name: 'createUserCollection' }),
  graphql(DELETE_USER_COLLECTION, { name: 'deleteUserCollection' })
)(page)