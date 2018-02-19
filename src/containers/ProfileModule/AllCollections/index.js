import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import page from './page'

function mapStateToProps(state) {
  return {
    user: state.User,
    myCollections: state.app.collections
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(page)