import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'

import { CREATE_PLACE } from '@graphql/places'

import { saveLocation } from '@reducers/user/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveLocation: data => {
      dispatch(saveLocation(data))
    }
  }
}

let container = graphql(CREATE_PLACE, {name: 'createPlace'})(page);
export default connect(mapStateToProps, mapDispatchToProps)(container)