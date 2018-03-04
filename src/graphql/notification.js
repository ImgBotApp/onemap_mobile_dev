import { gql } from 'react-apollo'
import { client } from '@root/main'

export const CREATE_NOTIFICATION = gql`
  mutation createNotification(
    $actor: ID
    $receiver: ID
    $story: ID
    $type: String
    $updateAt: DateTime!
  ) {
    createNotification(
      actorId: $actor
      receiverId: $receiver
      placeId: $story
      type: $type
      updateAt: $updateAt
    )
   {
    id
  }
}`

export const READ_NOTIFICATION = gql`
  mutation updateNotification(
    $id: ID!
    $readAt: DateTime!
  ) {
    updateNotification(
      id: $id
      readAt: $readAt
    ) {
      id
    }
  }
`

export const GET_USER_NOTIFICATION = gql`
  query userNotification($userId: ID!) {
    allNotifications(filter: {
      receiver: {
        id: $userId
      }
    }) {
      id
      actor {
        id
        username
        photoURL
      }
      place {
        id
        pictureURL
      }
      type
      readAt
    }
  }
`

export function getUserNotification(userId) {
  return client.query({
    query: GET_USER_NOTIFICATION,
    variables: {
      userId: userId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => Promise.resolve(res.allNotifications))
}