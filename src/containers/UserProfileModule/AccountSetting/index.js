
import page from './page'
import { connect } from 'react-redux'
import { saveProfileInfo } from '@actions/userLogIn'
import { logout } from '../../../reducers/app/actions'

function mapStateToProps (state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps (dispatch) {
  // return bindActionCreators(Actions, dispatch)
  return {
    saveProfileInfo: data => {
      dispatch(saveProfileInfo(data))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

// export default page
export default connect(mapStateToProps, mapDispatchToProps)(page);