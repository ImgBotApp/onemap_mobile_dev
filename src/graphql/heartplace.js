import { gql } from 'react-apollo'

export const LIKE_PLACE = gql`
  mutation (
    $placeId: ID!,
    $userId: ID!,
    $lat: Float,
    $lng: Float
  ) {
    createHeartPlace(
      locationLat: $lat
      locationLong: $lng
      placeId: $placeId
      userId: $userId
    ) {
      id
      place {
        id
        heartedByUser {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export const UNLIKE_PLACE = gql`
  mutation (
    $id: ID!
  ) {
    deleteHeartPlace(
      id: $id
    ) {
      id
    }
  }
`
