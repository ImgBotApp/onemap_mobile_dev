import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'
import { CREATE_USER_COLLECTION } from '@graphql/collections'
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

let container = graphql(CREATE_USER_COLLECTION, {name: 'createUserCollection'})(page);

export default connect(mapStateToProps, mapDispatchToProps)(container)