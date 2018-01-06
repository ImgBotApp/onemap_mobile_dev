import { connect } from 'react-redux' 

import page from './page'

function mapStateToProps(state) {
  return {
    user: state.userReducers
  }
}

function mapDispatchToProps(dispatch, nav) {
  return {
      onHearted: function () {
          nav.navigation.navigate('UserCollection', {page: 'Hearted'})
      },

      onCheckIns: function () {
          nav.navigation.navigate('UserCollection', {page: 'CheckIns'})
      },

      onWishList: function () {
          nav.navigation.navigate('UserCollection', {page: 'WishList'});
      },

      onViewAll: function () {
          nav.navigation.navigate('AllCollection')
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(page)