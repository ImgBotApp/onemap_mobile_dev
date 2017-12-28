import EditProfile from './page'
import { connect } from 'react-redux'


function mapStateToProps(state) {
  return {
    user: state.userReducers || {}
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)