import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'

import { CREATE_PLACE_PROFILE } from '@graphql/places'

import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

let container = graphql(CREATE_PLACE_PROFILE, {name: 'createPlace'})(page);

export default connect(mapStateToProps, mapDispatchToProps)(container)