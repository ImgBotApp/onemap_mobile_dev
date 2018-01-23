import * as GLOBAL from '@global'

import { ACTION_SAVE_USER_ID, ACTION_SAVE_PROFILE } from '@global/redux'

export function savePhoneNumberStore (data) {
  return {
    type        : GLOBAL.ACTION_SAVE_PHONENUMBER,
    phoneNumber : data.phoneNumber,
  }
}

export function saveProfileInfo (data) {
  return {
    type        : GLOBAL.ACTION_SAVE_PROFILE,
    info        : {
      username: data.username,
      name: data.name,
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      country: data.country,
      city: data.city,
      birthday: data.birthday,
      bio: data.bio,
      photoURL: data.photoURL,
      registrationDate: data.registrationDate
    }
  }
}

export function saveUserId (id, token) {
  return {
    type        : ACTION_SAVE_USER_ID,
    id          : id,
    token       : token
  }
}

export function createUserwithFacebook (token) {
  
}