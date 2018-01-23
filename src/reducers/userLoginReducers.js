import * as GLOBAL from '@global'

import { ACTION_SAVE_USER_ID } from '@global/redux'

export default function (state, action) {
  switch (action.type) {
    case GLOBAL.ACTION_SAVE_PHONENUMBER: 
      return { ...state, phoneNumber: action.phoneNumber }
    case GLOBAL.ACTION_SAVE_PROFILE:
      return { ...state, 
        username: action.info.username ? action.info.username : state.username,
        name    : action.info.name ? action.info.name : state.name,
        first_name: action.info.first_name ? action.info.first_name : state.first_name,
        last_name: action.info.last_name ? action.info.last_name : state.last_name,
        country : action.info.country ? action.info.country : state.country,
        city    : action.info.city ? action.info.city : state.city,
        birthday: action.info.birthday ? action.info.birthday : state.birthday,
        gender  : action.info.gender ? action.info.gender : state.gender,
        bio     : action.info.bio ? action.info.bio : state.bio,
        photoURL: action.info.photoURL ? action.info.photoURL : state.photoURL,
        phoneNumber: action.info.phoneNumber ? action.info.phoneNumber : state.phoneNumber,
        registrationDate: action.info.registrationDate ? action.info.registrationDate : state.registrationDate
      }
    case ACTION_SAVE_USER_ID:
      return {
        ...state,
        id: action.id,
        token: action.token
      }
    default:
      return {...state}
  }
}