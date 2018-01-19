import { gql } from 'react-apollo'

export const GET_FILTER_KEYWORDS = gql`
  query AllKeywords($keyword: String) {
    allKeywords(filter: {
      name_contains: $keyword
    }){
      id
      name
      places {
        id
      }
    }
  }
`

export const GET_KEYWORD = gql`
  query GetKeyword($keyword: String) {
    Keyword(filter: {
      name: $keyword
    }){
      id
      name
      places {
        id
      }
    }
  }
`

export const CREATE_KEYWORD = gql`
  mutation(
    $name: String!,
    $places: [ID!],
    $userId: ID!
  ) {
      updateKeyword(
        createdBy: $userId, 
        name: $name,
        places: $places
      ) {
        id,
        name
      }
    }
`

export const UPDATE_KEYWORD = gql`
  mutation(
    $id: ID!
    $places: [ID!]
  ) {
      updateKeyword(
        places: $places
      ) {
        id,
        name
      }
    }
`
