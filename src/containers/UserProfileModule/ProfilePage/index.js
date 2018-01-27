import page from './page'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { GET_USER_STORIES } from '@graphql/stories'
import { GET_FOLLOWERS, GET_FOLLOWS } from '@graphql/userprofile'
import { saveProfileInfo } from '@actions/userLogIn'

function mapStateToProps (state) {
  return {
    user: state.User,
    collections: state.app.collections
  }
}

function mapDispatchToProps (dispatch) {
  // return bindActionCreators(Actions, dispatch)
  return {
    saveProfileInfo: data => {
      dispatch(saveProfileInfo(data))
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
  graphql(
    GET_FOLLOWS, {
      name: 'GetFollowingList',
      options(props) {
        const { user: { id } } = props
        return {
          variables: {
            userId: id,
            blockUsersIds: [],
          },
        }
      },
    }
  )
)(page)
