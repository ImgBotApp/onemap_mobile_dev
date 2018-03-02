import { ONESIGNAL_APP_ID, ONESIGNAL_REST_API } from '../global/onesignal'

const ONESIGNAL_HOST = 'https://onesignal.com'

/**
 * send Push Notification to Single User
 * @param {*} contents description of Push Notification
 * @param {*} playerId onesignal playerId
 * @param {*} data  for attachment
 */

/** 
 * @param data type 
 * {
 *    type: String: Enum ['LIKE', 'UNLIKE', 'FOLLOW', 'UNFOLLOW']
 *    aImg: String ; account Profile Image
 *    aName: String; account Profile Name
 *    sImg: String; Story Image if its type is 'Like' or 'unLike',
 *    date: String; ISO Date String
 *    userId: String; account User Id on DB
 *    storyId: String; Story Id on DB
 * }
*/

export function sendSingleNotification(contents, playerId, data) {
  console.log('PlayerId: ', playerId)
  var headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Basic ${ONESIGNAL_REST_API}`
  }

  var data = {
    app_id: ONESIGNAL_APP_ID,
    contents: contents,
    include_player_ids: [playerId],
    ios_badgeType: 'Increase',
    ios_badgeCount: 1,
    data: data
  }

  var options = {
    port: 443,
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }

  let apiEndPoint = `${ONESIGNAL_HOST}/api/v1/notifications`

  return fetch(apiEndPoint, options)
  .then(res => {
    console.log('Notification result', res)
    return Promise.resolve(res.json())
  })
}