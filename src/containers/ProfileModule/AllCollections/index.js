import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'
import { DELETE_USER_COLLECTION } from '@graphql/collections'
import { saveCollections } from '@reducers/app/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
    myCollections: state.app.collections
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveCollections: data => {
      dispatch(saveCollections(data))
    }
  }
}

let container = graphql(DELETE_USER_COLLECTION, {name: 'deleteUserCollection'})(page);

export default connect(mapStateToProps, mapDispatchToProps)(container)