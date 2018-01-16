import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'
import { REMOVE_PLACE_FROM_COLLECTION } from '@graphql/collections'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

let container = graphql(REMOVE_PLACE_FROM_COLLECTION, {name: 'removePlace'})(page);

export default connect(mapStateToProps, mapDispatchToProps)(container)