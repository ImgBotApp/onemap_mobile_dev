import page from './page'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { GET_USER_STORIES } from '@graphql/stories'
import { GET_FOLLOWERS, GET_FOLLOWS } from '@graphql/userprofile'

import { saveProfileInfo } from '@actions/userLogIn'
import { saveUserFollows } from '@reducers/app/actions'

function mapStateToProps(state) {
  const { collections, follows } = state.app;
  return {
    user: state.User,
    follows,
    collections,
  }
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators(Actions, dispatch)
  return {
    saveProfileInfo: data => {
      dispatch(saveProfileInfo(data))
    },
    saveUserFollows: data => {
      dispatch(saveUserFollows(data))
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(
    GET_USER_STORIES, {
      options(props) {
        return {
          variables: { userId: props.user.id },
        }
      },
    }),
  graphql(
    GET_FOLLOWERS, {
      name: 'GetFollowersList',
      options(props) {
        const { user: { id } } = props
        return {
          variables: { userId: id },
        }
      },
    }
  ),
  // graphql(//used
  //   GET_FOLLOWS, {
  //     name: 'GetFollowingList',
  //     options(props) {
  //       const { user: { id } } = props
  //       return {
  //         variables: {
  //           userId: id,
  //           blockUsersIds: [],
  //         },
  //       }
  //     },
  //   }
  // )
)(page)
