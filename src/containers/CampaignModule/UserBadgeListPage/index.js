import { connect } from 'react-redux'

import page from './page'

function mapStateToProps(state) {
  const { collections, follows } = state.app;
  return {
    user: state.User,
  }
}

export default connect(mapStateToProps, null)(page)
