import { connect } from 'react-redux' 
import { saveUserFollows } from '@reducers/app/actions'
import page from './page'

function mapStateToProps(state) {
  return {
    follows: state.app.follows,
    user: state.User,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserFollows: (data) => {
      dispatch(saveUserFollows(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(page)