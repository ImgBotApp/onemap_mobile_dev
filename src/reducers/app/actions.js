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