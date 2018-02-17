import page from './page'

import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    user: state.User
  }
}

export default connect(mapStateToProps, null)(page)