import { gql } from 'react-apollo'

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
      accountVerification
      mobile
      mobileVerification
      city
      country
      photoURL
      loginMethod
      registrationDate
      group
      accountStatus
      follows {
        id
      }
      checkIns {
        id
      }
      blockByUsers {
        id
      }
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
    $group: [UserGroup!]  #USER, ADMIN, PARTNER, OFFICIAL
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
      group:$group
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
      group
    }
  }
`

/**
 * View OneMapper profile
 * @return User
 */
export const GET_ONEMAPPER_PROFILE = gql`
query GetOneMapperProfile($userId: ID!) {
  User(id: $userId) {
    bio
    _followersMeta {
      count
    }
    _checkInsMeta {
      count
    }
    accountVerification
    collections(
      filter: {
        privacy: false
        type: USER
      }
    ) {
      id
      type
      name
      pictureURL
      privacy
    }
    stories {
      id
      title
      story
      pictureURL
      place {
        id
        pictureURL
        placeName
      }
      createdBy {
        id
        displayName
        photoURL
      }
      updatedAt
    }
  }
}
`

export const UPDATE_USER = gql`#unused
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


/**
 * Get followers incloud counter
 */
export const GET_FOLLOWERS = gql`
  query GetFollowers ($userId: ID!, $skip: Int, $first: Int) {
    User(id: $userId) {
      id
      _followersMeta {
        count
      }
      followers(skip: $skip, first: $first) {
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
      }
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
      $first: Int,
      $blockUsersIds: [ID!]!
    ) {
    User(id: $userId) {
      id
      _followsMeta {
        count
      }
      follows(first: $first, skip: $skip, filter: {id_not_in: $blockUsersIds}) {
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
      username
      firstName
      lastName
      displayName
      photoURL
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

export const FOLLOW_USER = gql`
 mutation FollowUser (
    $id: ID!
    $followsIds: [ID!]
  ) {
    updateUser(
      id: $id
      followsIds: $followsIds
    ) {
      id
      follows {
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
  }
`

export const GET_USER_WITH_LIKED_PLACES = gql`
query GetLikedPlaces($userId: ID!) {
  User(id: $userId) {
    id
    likePlaces {
      id
      createdAt
      updatedAt
      description
      source
      sourceId
      createSide
      placeName
      locationLat
      locationLong
      addressAreaDistrict
      addressCityTown
      addressStateProvince
      addressCountry
      addressPostalCode
      addressStreet
      address
      phoneNumber
      website
      facebook
      line
      openingHrs
      pictureURL
      status
      placeOwner
    }
  }
}
`