import { connect } from 'react-redux' 
import { graphql } from 'react-apollo'

import { CREATE_PLACE_PROFILE, CHECK_EXIST_PLACE } from '@graphql/places'

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
container = graphql(CHECK_EXIST_PLACE, {name: 'checkExistPlace'})(container)
export default connect(mapStateToProps, mapDispatchToProps)(container)