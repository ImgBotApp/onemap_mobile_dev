import * as types from './actionType'

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

export function saveUserInfo(userInfo) {
  return {
    type: types.STORE_USER_INFO,
    userInfo
  }
}