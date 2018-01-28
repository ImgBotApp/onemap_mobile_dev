import { gql } from 'react-apollo'


export const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateFBUser(facebookToken: $facebookToken) {
      token
      id
    }
  }
`

export const EXIST_FACEBOOK_USER = gql`
  query UserQuery($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      gender
      photoURL
      displayName
      loginMethod
      registrationDate
      country
      city
      facebookUserId
    }
  }
`

export const SUGGEST_USERS = gql`
  query SuggestUsers {
    allUsers(filter: {
      isSuggest: true
    }) {
      id
      username
      displayName
      photoURL
    }
  }
`

export const FILER_USERS = gql`
  query FilterUsers($keyword: String) {
    allUsers(filter: {
      displayName_contains: $keyword
    }) {
      id
      username
      displayName
      photoURL
    }
  }
`
