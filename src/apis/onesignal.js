import { ONESIGNAL_APP_ID, ONESIGNAL_REST_API } from '../global/onesignal'

const ONESIGNAL_HOST = 'https://onesignal.com'

export function sendSingleNotification(contents, playerId) {
  var headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Basic ${ONESIGNAL_REST_API}`
  }

  var data = {
    app_id: ONESIGNAL_APP_ID,
    contents: contents,
    include_player_ids: [playerId]
  }

  var options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }

  let apiEndPoint = `${ONESIGNAL_HOST}/api/v1/notification`

  return fetch(apiEndPoint, options)
  .then(res => {
    console.log('Notification result', res)
    return Promise.resolve(res.json())
  })
}