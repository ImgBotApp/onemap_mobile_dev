
/**
 * send request to Twilio for Phone verify
 * 
 * @param {Object} info 
 *  country_code
 *  phone_number
 *  code_length
 *  custom_message !optional
 */

 import { AUTHY_KEY } from '@global/twilio'

export async function requestVerify(info) {
  return fetch(`https://api.authy.com/protected/json/phones/verification/start?api_key=${AUTHY_KEY}&via=sms&country_code=${info.country_code}&phone_number=${info.phone_number}&code_length=${info.code_length}`, {
    method: 'POST'
  }).then((res) => {
    return {
      success: true,
      result : JSON.parse(res._bodyText)
    }
  }).catch((err) => {
    return {
      success: false
    }
  })
}

/**
 * send request to verify code
 * 
 * @param {Object} info 
 *  country_code
 *  phone_number
 *  verify_code
 */

export async function verifyCode(info) {
  return fetch(`https://api.authy.com/protected/json/phones/verification/check?api_key=${AUTHY_KEY}&phone_number=${info.phone_number}&country_code=${info.country_code}&verification_code=${info.verify_code}`,{
    method: 'GET'
  }).then((res) => {
    return JSON.parse(res._bodyText)
  }).catch((err) => {
    return {
      success: false
    }
  })
}