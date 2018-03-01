import * as types from './actionType'
import { changeAppRoot } from '../app/actions'

export function login() {
  return async function (dispatch, getState) {
    dispatch(changeAppRoot('main'));
  }
}

export function logout() {
  return async function (dispatch, getState) {
    dispatch(changeAppRoot('login'))
  }
}

export function saveUserInfo(userInfo) {
  return {
    type: types.STORE_USER_INFO,
    userInfo
  }
}

export function saveLocation(location) {
  return {
    type: types.STORE_LOCATION_INFO,
    location
  }
}