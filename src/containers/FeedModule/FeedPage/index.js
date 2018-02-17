import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { GET_SUGGEST_USERS } from '@graphql/userprofile'
import { ADD_COLLECTION_TO_PLACE, REMOVE_COLLECTION_FROM_PLACE } from '@graphql/places';
import { FEED_STORIES_PAGINATED } from '@graphql/stories'
import { saveCollections, placeUpdated } from '@reducers/app/actions'
import page from './page'

const STORIES_PER_PAGE = 8;

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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(GET_SUGGEST_USERS, {
    name: 'getSuggestUsers',
    options: (props) => {
      return {
        variables: {
          currentUserId: props.user.id
        }
      }
    }
  }),
  graphql(FEED_STORIES_PAGINATED, {
    name: 'getStoriesPaginated',
    options: (props) => {
      return {
        variables: {
          userId: props.user.id,
          skip: 0,
          first: STORIES_PER_PAGE
        }
      }
    }
  }),
  graphql(ADD_COLLECTION_TO_PLACE, {
    name: 'addCollectionToPlace'
  }),
  graphql(REMOVE_COLLECTION_FROM_PLACE, {
    name: 'removeCollectionFromPlace'
  }),
)(page)
