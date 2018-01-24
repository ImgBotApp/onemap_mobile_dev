import * as types from './actionType'

export function appInitialized () {
  return async function(dispatch, getState) {
    dispatch(changeAppRoot('login'));
  }
}

export function changeAppRoot(root) {
  return {
    type: types.ROOT_CHANGED,
    root: root
  }
}

export function login() {
  return async function(dispatch, getState) {
    dispatch(changeAppRoot('main'));
  }
}

export function logout() {
  return async function(dispatch, getState) {
    dispatch(changeAppRoot('login'))
  }
}

export function saveCollections(collections) {
  return {
    type: types.STORE_COLLECTIONS,
    collections
  }
}

export function placeUpdated(updated) {
  return {
    type: types.PLACE_UPDATED,
    placeUpdated: updated
  }
}

export function saveUserFollows(follows) {
  return {
    type: types.STORE_USER_FOLLOWS,
    follows
  }
}
