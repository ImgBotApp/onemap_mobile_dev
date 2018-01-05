import { gql } from 'react-apollo'

export const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateFBUser(facebookToken: $facebookToken) {
      token
      id
    }
  }
`

export const UPDATE_USER = gql`
  mutation ($id: ID!, $first_name: String, $last_name: String, $gender: Gender, 
    $photoURL: String, $displayName: String, $registrationDate: String, $country: String, $city: String, $bio: String){
    updateUser(
      id: $id,
      firstName: $first_name,
      lastName: $last_name,
      gender: $gender,
      photoURL: $photoURL,
      displayName: $displayName
      loginMethod: [FACEBOOK],
      group: [USER],
      registrationDate: $registrationDate,
      country: $country,
      city: $city,
      bio: $bio
    ) {
      id
      firstName
      lastName
      gender
      photoURL
      displayName
      registrationDate
      country
      city
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