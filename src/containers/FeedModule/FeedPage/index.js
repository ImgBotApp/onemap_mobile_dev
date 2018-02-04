import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { ADD_COLLECTION_TO_PLACE, REMOVE_COLLECTION_FROM_PLACE } from "@graphql/places";
import { saveCollections, placeUpdated } from '@reducers/app/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
    collections: state.app.collections,
    placeUpdated: state.app.placeUpdated,
    follows: state.app.follows,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveCollections: (data) => {
      dispatch(saveCollections(data))
    },
    placeUpdate: (data) => {
      dispatch(placeUpdated(data))
    },
  }
}

let container = graphql(ADD_COLLECTION_TO_PLACE, { name: 'addCollectionToPlace' })(page);
container = graphql(REMOVE_COLLECTION_FROM_PLACE, { name: 'removeCollectionFromPlace' })(container);

export default connect(mapStateToProps, mapDispatchToProps)(container)