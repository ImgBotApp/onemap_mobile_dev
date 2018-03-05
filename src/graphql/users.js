import { gql } from 'react-apollo'


export const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateFBUser(facebookToken: $facebookToken) {
      token
      id
    }
  }
`

export const EXIST_FACEBOOK_USER = gql`#unused
  query UserQuery($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      gender
      photoURL
      displayName
      playerId
      loginMethod
      registrationDate
      country
      city
      facebookUserId
    }
  }
`

export const ADD_PUSH_TOKEN = gql`
  mutation AddPushToken($id: ID!, $playerId: String!) {
    updateUser(id: $id, playerId: [$playerId]) {
      id
      playerId
    }
  }
`

export const FILER_USERS = gql`
  query FilterUsers($keyword: String, $userId: ID!) {
    allUsers(filter: {
      AND: [
        {blockUsers_none: {
          id: $userId
        }},
        {blockByUsers_none: {
          id: $userId
        }},
        {accountStatus: ENABLE},
        {
          OR: [
            {displayName_contains: $keyword}
            {username_contains: $keyword}
          ]
        }
      ]
    }) {
      id
      username
      playerId
      displayName
      photoURL
      accountVerification
    }
  }
`
