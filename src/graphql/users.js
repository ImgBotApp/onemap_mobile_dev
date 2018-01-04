import { gql } from 'react-apollo'

export const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateFBUser(facebookToken: $facebookToken) {
      token
      id
    }
  }
`

export const UPDATE_FACEBOOK_USER = gql`
  mutation ($id: ID!, $first_name: String, $last_name: String, $gender: Gender, 
    $photoURL: String, $displayName: String, $registrationDate: String){
    updateUser(
      id: $id,
      firstName: $first_name,
      lastName: $last_name,
      gender: $gender,
      photoURL: $photoURL,
      displayName: $displayName
      loginMethod: [FACEBOOK],
      registrationDate: $registrationDate
    ) {
      id
      firstName
      lastName
      gender
      photoURL
      displayName
      registrationDate
    }
  }
`