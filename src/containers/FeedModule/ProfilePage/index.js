import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { FOLLOW_USER } from "@graphql/userprofile";
import { saveUserFollows } from '@reducers/app/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    follows: state.app.follows,
    user: state.User,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserFollows: (data) => {
      dispatch(saveUserFollows(data))
    },
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(FOLLOW_USER, {
    name: 'followUser'
  }),
)(page)