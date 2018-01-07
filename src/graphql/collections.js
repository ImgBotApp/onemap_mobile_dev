import { gql } from 'react-apollo'

export const GET_ALL_COLLECTIONS = gql`
  query AllCollectionsQuery {
    allCollections {
      id
      createdAt
      name
      pictureURL
      privacy
      type
      updatedAt
    }
  }
`

export const GET_USER_COLLECTIONS = gql`
  query AllCollectionsQuery($id: ID!) {
    allCollections(filter: {user: {id: $id}}) {
      id
      createdAt
      name
      pictureURL
      privacy
      type
      updatedAt
    }
  }
`

export const CREATE_USER_COLLECTION = gql`
  mutation(
    $name: String!, 
    $pictureURL: String!,
    $privacy: Boolean!,
    $userId: ID!
  ) {
      createCollection(
        name: $name, 
        pictureURL: $pictureURL,
        privacy: $privacy,
        type: USER,
        userId: $userId
      ) {
        id
      }
    }
`

export const DELETE_USER_COLLECTION = gql`
  mutation(
    $id: ID!
  ) {
      deleteCollection(
        id: $id
      ) {
        id
      }
    }
`
