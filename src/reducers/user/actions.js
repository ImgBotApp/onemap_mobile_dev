import * as types from './actionType'

export function saveUserInfo(userInfo) {
  return {
    type: types.STORE_USER_INFO,
    userInfo
  }
}