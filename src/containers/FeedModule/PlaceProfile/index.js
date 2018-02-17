import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { CHECK_IN_PLACE } from '@graphql/checkin';
import { CREATE_KEYWORD, DELETE_KEYWORD } from "@graphql/keywords";
import { ADD_COLLECTION_TO_PLACE, REMOVE_COLLECTION_FROM_PLACE, LIKE_PLACE } from "@graphql/places";
import { CREATE_STORY, UPDATE_STORY, FOLLOWING_STORIES_PAGINATED } from "@graphql/stories";

import { saveUserInfo } from '@reducers/user/actions'
import page from './page'

const STORIES_PER_PAGE = 8;

function mapStateToProps(state) {
  return {
    user: state.User,
    collections: state.app.collections
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: data => {
      dispatch(saveUserInfo(data))
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(ADD_COLLECTION_TO_PLACE, { name: 'addCollectionToPlace' }),
  graphql(REMOVE_COLLECTION_FROM_PLACE, { name: 'removeCollectionFromPlace' }),
  graphql(LIKE_PLACE, { name: 'likePlace' }),
  graphql(CHECK_IN_PLACE, { name: 'checkInPlace' }),
  graphql(CREATE_KEYWORD, { name: 'addKeyword' }),
  graphql(DELETE_KEYWORD, { name: 'deleteKeyword' }),
  graphql(CREATE_STORY, { name: 'createStory' }),
  graphql(UPDATE_STORY, { name: 'updateStory' }),
  graphql(FOLLOWING_STORIES_PAGINATED, {
    name: 'getFollowingStoriesPaginated',
    options: (props) => {
      return {
        variables: {
          id: props.place.id,
          userId: props.user.id,
          oneMapperId: props.oneMapperId,
          skip: 0,
          first: STORIES_PER_PAGE
        }
      }
    }
  }),
)(page)
