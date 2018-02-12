import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { GET_SUGGEST_USERS } from '@graphql/userprofile'
import { PLACES_PAGINATED, ADD_COLLECTION_TO_PLACE, REMOVE_COLLECTION_FROM_PLACE } from "@graphql/places";
import { saveCollections, placeUpdated } from '@reducers/app/actions'
import page from './page'

const PLACES_PER_PAGE = 8;

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
      const { user: { id, blockByUsers }, follows } = props;
      return {
        variables: {
          currentUserId: id,
          currentUserFollowsIds: follows ? follows.map(item => item.id) : [],
          currentUserBlockByUsersIds: blockByUsers ? blockByUsers.map(item => item.id) : []
        }
      }
    }
  }),
  graphql(PLACES_PAGINATED, {
    name: 'getPlacesPaginated',
    options: (props) => {
      return {
        variables: {
          userId: props.user.id,
          followsIds: props.follows ? props.follows.map(item => item.id) : [],
          skip: 0,
          first: PLACES_PER_PAGE
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
