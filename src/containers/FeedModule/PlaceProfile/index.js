import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { LIST_PLACE_STORIES, CREATE_STORY, UPDATE_STORY } from '@graphql/users'
import { GET_PLACE } from '@graphql/place'


import page from './page'

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(
   LIST_PLACE_STORIES, {
  options(props) {
    console.log('here recieving props', props);
    return {
      variables: { placeId: props.placeId },
    }
  },
}),
graphql(CREATE_STORY, { name: 'createStory' }),
graphql(UPDATE_STORY, { name: 'updateStory'})
)(page)
