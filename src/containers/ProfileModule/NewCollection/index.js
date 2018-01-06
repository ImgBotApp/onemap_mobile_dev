import { connect } from 'react-redux' 

import page from './page'
import {
    CHANGE_COLLECTION_NAME,
    CHANGE_COLLECTION_VISIBILITY
} from '@global/redux'

function mapStateToProps(state) {
  return {
    user: state.userReducers,
    collection: state.collectionReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
      onChangeVisibility: (visibility) => {
          dispatch({
              type: CHANGE_COLLECTION_VISIBILITY,
              visibility
          })
      },
      onChangeName: (name) => {
          dispatch({
              type: CHANGE_COLLECTION_NAME,
              name
          })
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(page)