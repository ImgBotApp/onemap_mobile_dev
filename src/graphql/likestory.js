import { gql } from 'react-apollo'

export const LIKE_STORY = gql`
  mutation (
    $storyId: ID!,
    $userId: ID!,
    $lat: Float,
    $lng: Float
  ) {
    createLikeStory(
      locationLat: $lat
      locationLong: $lng
      storyId: $storyId
      userId: $userId
    ) {
      id
      story {
        id
        likedByUser {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export const UNLIKE_STORY = gql`
  mutation (
    $id: ID!
  ) {
    deleteLikeStory(
      id: $id
    ) {
      id
    }
  }
`
