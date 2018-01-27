import EditProfile from './page'
import { connect } from 'react-redux'


function mapStateToProps(state) {
  const { follows } = state.app;
  return {
    user: state.User,
    follows,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)