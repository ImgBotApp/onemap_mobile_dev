import * as types from './actionType'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  root: undefined,
  collections: [],
  placeUpdated: false
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root
      });
    case types.SETTINGS:
      return state.merge({
        settings: action.settings
      });
    case types.STORE_COLLECTIONS:
      return state.merge({
        collections: action.collections
      });
    case types.PLACE_UPDATED:
      return state.merge({
        placeUpdated: action.placeUpdated
      });
    case types.STORE_USER_FOLLOWS:
      return state.merge({
        follows: action.follows
      });
    case types.STORE_USER_FOLLOWERS:
      return state.merge({
        followers: action.followers
      });
    default:
      return state;
  }
}