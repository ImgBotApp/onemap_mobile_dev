import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { RECEIVE_BADGE, CHECK_IN_PLACE } from '@graphql/checkin';
import { saveUserInfo } from '@reducers/user/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
    settings: state.app.settings
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
  graphql(RECEIVE_BADGE, { name: 'receiveBadge' }),
  graphql(CHECK_IN_PLACE, { name: 'checkInPlace' }),
)(page)
