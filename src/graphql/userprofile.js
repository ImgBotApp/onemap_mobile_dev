import { gql } from 'react-apollo'

/**
 * Get followers incloud counter
 */
export const GET_FOLLOWERS = gql`
  query GetFollowers ($userId: ID!,$skip: Int!,$first: Int) {
    User(id: $userId) {
      id
      _followersMeta {
        count
      }
      followers(skip: $skip, first: $first) {
        email
        username
        firstName
        lastName
        displayName
        bio
        gender
        birthdate
        mobile
        mobileVerification
        city
        country
        photoURL
        loginMethod
        registrationDate
        group
        accountStatus
      }
    }
  }
`
/**
 * List follows and blocked Ids, before ListSuggestUser
 */
export const GET_FOLLOWS_AND_BLOCKED_IDS = gql`
  query GetFollowersAndBlockedIds ($currentUserId: ID!) {
    User(id: $currentUserId) {
        follows {
          id
        }
        blockByUsers {
          id
        }
      }
  }
`
/**
 * List Users, skip self and current follows users
 * exmaple params: {"currentUserId": "cjc0e32mvo10a0113jdx7g0qo", "currentUserFollowsIds": ["cjc02c13zmbig01130q1tj6dt", "cjc04z5q3mo610113h7hmofgn"], "currentUserBlockByUsersIds": []}
 * @return [User] 
 */
export const GET_SUGGEST_USERS = gql`
  query ListSuggestUser(
    $first: Int, 
    $skip: Int, 
    $currentUserId: ID!, 
    $currentUserFollowsIds: [ID!]!, #Array of ID, extracted from GetFollowersAndBlockedIds.User.follows
    $currentUserBlockByUsersIds: [ID!]! #Array of ID, extracted from GetFollowersAndBlockedIds.User.blockByUsers 
  ) {
    allUsers(first: $first, skip: $skip, filter: {
      AND: [
        { accountStatus: ENABLE },
        { isSuggest: true },
        { id_not: $currentUserId }, #remove self from list
        { id_not_in: $currentUserFollowsIds },
        { id_not_in: $currentUserBlockByUsersIds }, 
      ]
    }) {
      id
      email
      username
      firstName
      lastName
      displayName
      bio
      gender
      birthdate
      mobile
      mobileVerification
      city
      country
      photoURL
      loginMethod
      registrationDate
      group
      accountStatus
			isSuggest
    }
  }
`
/**
 * Get followers incloud counter
 */
export const GET_FOLLOWS = gql`
  query GetFollows (
      $userId: ID!, 
      $skip: Int, 
      $first: Int
    ) {
    User(id: $userId) {
      id
      _followsMeta {
        count
      }
      follows( skip: $skip, first: $first) {
        email
        username
        firstName
        lastName
        displayName
        bio
        gender
        birthdate
        mobile
        mobileVerification
        city
        country
        photoURL
        loginMethod
        registrationDate
        group
        accountStatus
      }
    }
  }
`
/**
 * Get Blocked Users
 */
export const GET_BLOCKUSRS = gql`
  query GetBlockUsers (
    $userId: ID!, 
    $skip: Int, 
    $first: Int) {
    User(id: $userId) {
      id
      _blockUsersMeta {
        count
      }
      blockUsers(skip: $skip, first: $first) {
        email
        username
        firstName
        lastName
        displayName
        bio
        gender
        birthdate
        mobile
        mobileVerification
        city
        country
        photoURL
        loginMethod
        registrationDate
        group
        accountStatus
      }
    }
  }
`
/**
 * View User profile
 * @return User
 */
export const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    User(id: $userId) {
      id
      email
      username
      firstName
      lastName
      displayName
      bio
      gender
      birthdate
      facebookUserId
      mobile
      mobileVerification
      city
      country
      photoURL
      loginMethod
      registrationDate
      group
      accountStatus
    }
  }
`

/**
 * Edit Profile
 * @return update result
 */
export const UPDATE_PROFILE = gql`
 mutation UpdateProfile (
    $id: ID! # user id
    $country: String
    $city: String 
    $displayName: String
    $email: String
    $username: String
    $accountStatus: Enabled # ENABLE or DISABLE
    $bio: String
    $firstName: String
    $lastName: String
    $birthdate: String
    $photoURL: String
    $registrationDate: String
    $mobileVerification: Boolean
    $mobile: String
    $gender: Gender #  NOT_SPECIFIC, MALE or FEMAIL
  ) {
    updateUser(
      id: $id
      country: $country
      city: $city 
      displayName: $displayName
      email: $email
      username: $username
      accountStatus: $accountStatus
      bio: $bio
      firstName: $firstName
      lastName: $lastName
      birthdate: $birthdate
      photoURL: $photoURL
      registrationDate: $registrationDate
      mobileVerification: $mobileVerification
      mobile: $mobile
      gender: $gender
    ) {
      id
    }
  } 
`