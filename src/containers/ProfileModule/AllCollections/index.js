import { connect } from 'react-redux'
import {graphql} from 'react-apollo';

import page from './page'
import {GET_COLLECTIONS} from "@graphql/collection";

function mapStateToProps(state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

let container = graphql(GET_COLLECTIONS)(page);

export default connect(mapStateToProps, mapDispatchToProps)(container)