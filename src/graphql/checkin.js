import { gql } from 'react-apollo'

export const CHECK_IN_PLACE = gql`
  mutation (
    $placeId: ID!
    $userId: ID!
    $lat: Float!
    $lng: Float!
    $point: Int
  ) {
    createCheckIn(
      locationLat: $lat
      locationLong: $lng
      placeId: $placeId
      userId: $userId
      point: $point
    ) {
      id
      createdAt
    }
  }
`
