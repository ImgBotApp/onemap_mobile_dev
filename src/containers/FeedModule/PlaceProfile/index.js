import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { CREATE_KEYWORD, UPDATE_KEYWORD } from "@graphql/keywords";
import { ADD_COLLECTION_TO_PLACE, REMOVE_COLLECTION_FROM_PLACE } from "@graphql/places";
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
    collections: state.app.collections
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

let container = graphql(ADD_COLLECTION_TO_PLACE, { name: 'addCollectionToPlace' })(page);
container = graphql(REMOVE_COLLECTION_FROM_PLACE, { name: 'removeCollectionFromPlace' })(container);
container = graphql(CREATE_KEYWORD, { name: 'addKeyword' })(container);
container = graphql(UPDATE_KEYWORD, { name: 'updateKeyword' })(container);

export default connect(mapStateToProps, mapDispatchToProps)(container)
