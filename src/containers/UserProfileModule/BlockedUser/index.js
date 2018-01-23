import page from './page'

import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    user: state.User
  }
}

function mapDispatchToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(page)
