import page from './page'

import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(page)
