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
    case types.STORE_COLLECTIONS:
      return state.merge({
        collections: action.collections
      });
    case types.PLACE_UPDATED:
      return state.merge({
        placeUpdated: action.placeUpdated
      });
    default:
      return state;
  }
}