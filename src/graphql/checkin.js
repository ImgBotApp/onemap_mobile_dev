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
      point
    }
  }
`

export const RECEIVE_BADGE = gql`
  mutation (
    $badgeId: ID!
    $userId: ID!
    $point: Int
  ) {
    createReceiveBadge(
      badgeId: $badgeId
      userId: $userId
      point: $point
    ) {
      id
      createdAt
      point
    }
  }
`
