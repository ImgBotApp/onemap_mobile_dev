import { gql } from 'react-apollo'

export const CHECK_IN_PLACE = gql`
  mutation (
    $placeId: ID!
    $userId: ID!
    $lat: Float!
    $lng: Float!
  ) {
    createCheckIn(
      locationLat: $lat
      locationLong: $lng
      placeId: $placeId
      userId: $userId
    ) {
      id
      createdAt
    }
  }
`
