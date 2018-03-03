import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
  }
}

function mapDispatchToProps() {
  return {}
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(page)