import { gql } from 'react-apollo'

export const REPORT_PLACE = gql`
  mutation (
    $placeId: ID!
    $reason: String!
    $userId: ID!
  ) {
    createReport(
      placeId: $placeId
      reason: $reason
      reportedById: $userId
    ) {
      id
    }
  }
`

export const REPORT_STORY = gql`
  mutation (
    $storyId: ID!
    $reason: String!
    $userId: ID!
  ) {
    createReport(
      storyId: $storyId
      reason: $reason
      reportedById: $userId
    ) {
      id
    }
  }
`

export const REPORT_PROFILE = gql`
  mutation (
    $onemapId: ID!
    $reason: String!
    $userId: ID!
  ) {
    createReport(
      profileId: $onemapId
      reason: $reason
      reportedById: $userId
    ) {
      id
    }
  }
`
