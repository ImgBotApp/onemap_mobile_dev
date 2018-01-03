import page from './page'
import { connect } from 'react-redux'
import { saveProfileInfo } from '@actions/userLogIn'

function mapStateToProps (state) {
  return {
    user: state.User
  }
}

function mapDispatchToProps (dispatch) {
  // return bindActionCreators(Actions, dispatch)
  return {
    saveProfileInfo: data => {
      dispatch(saveProfileInfo(data))
    }
  }
}

// export default page
export default connect(mapStateToProps, mapDispatchToProps)(page);