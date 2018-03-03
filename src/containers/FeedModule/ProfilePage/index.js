import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { REPORT_PROFILE } from "@graphql/report";
import { FOLLOW_USER } from "@graphql/userprofile";
import { saveUserFollows } from '@reducers/app/actions'
import { CREATE_NOTIFICATION } from '../../../graphql/notification'
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
  graphql(FOLLOW_USER, { name: 'followUser' }),
  graphql(REPORT_PROFILE, { name: 'reportProfile' }),
  
)(page)