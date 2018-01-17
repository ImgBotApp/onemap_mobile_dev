import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'
import { REMOVE_PLACE_FROM_COLLECTION } from '@graphql/collections'
import { placeUpdated } from '@reducers/app/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    placeUpdated: data => {
      dispatch(placeUpdated(data))
    }
  }
}

let container = graphql(REMOVE_PLACE_FROM_COLLECTION, {name: 'removePlace'})(page);

export default connect(mapStateToProps, mapDispatchToProps)(container)