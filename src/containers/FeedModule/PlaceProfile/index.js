import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { CREATE_KEYWORD, DELETE_KEYWORD } from "@graphql/keywords";
import { ADD_COLLECTION_TO_PLACE, REMOVE_COLLECTION_FROM_PLACE } from "@graphql/places";
import { CREATE_STORY, UPDATE_STORY } from "@graphql/users";
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
container = graphql(DELETE_KEYWORD, { name: 'deleteKeyword' })(container);
container = graphql(CREATE_STORY, { name: 'createStory' })(container);
container = graphql(UPDATE_STORY, { name: 'updateStory' })(container);

export default connect(mapStateToProps, mapDispatchToProps)(container)
