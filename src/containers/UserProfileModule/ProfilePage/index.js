import page from './page'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { GET_USER_STORIES } from '@graphql/users'
import { saveProfileInfo } from '@actions/userLogIn'

function mapStateToProps (state) {
  return {
    user: state.User
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
)(page)
