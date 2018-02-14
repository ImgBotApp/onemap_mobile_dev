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

export const FILER_USERS = gql`
  query FilterUsers($keyword: String, $userId: ID!) {
    allUsers(filter: {
      displayName_contains: $keyword,
      id_not: $userId
    }) {
      id
      username
      displayName
      photoURL
    }
  }
`
