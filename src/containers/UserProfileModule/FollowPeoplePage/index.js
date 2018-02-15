import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { FOLLOW_USER,GET_FOLLOWERS,BLOCK_USER } from "@graphql/userprofile";
import { saveUserFollows } from '@reducers/app/actions'
import page from './page'
const FOLLOWERS_PER_PAGE = 20;

function mapStateToProps(state) {
  const { follows, followers } = state.app;
  return {
    user: state.User,
    follows,
    followers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserFollows: data => {
      dispatch(saveUserFollows(data))
    }
  }
}

let container = graphql(FOLLOW_USER, { name: 'unfollowUser' })(page);
container = graphql(BLOCK_USER, { name: 'addBlockUser' })(container);
const ComponentWithQueries = graphql(GET_FOLLOWERS, {
  options: (props) => ({
    variables: {
      userId: props.user.id,
      skip: 0,
      first: FOLLOWERS_PER_PAGE
    }
  })
})
  (container);
export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithQueries)