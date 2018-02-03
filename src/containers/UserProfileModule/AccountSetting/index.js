
import page from './page'
import { connect } from 'react-redux'
import { logout } from '@reducers/app/actions'

function mapStateToProps (state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}

// export default page
export default connect(mapStateToProps, mapDispatchToProps)(page);