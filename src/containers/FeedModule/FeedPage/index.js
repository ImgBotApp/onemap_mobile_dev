import { connect } from 'react-redux' 

import page from './page'

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(page)