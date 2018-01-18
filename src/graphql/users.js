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
export const LIST_USER_COLLECTIONS = gql`
  query GetUserCollections(
    $userId: ID!,
    $type: CollectionTypes, #  DEFAULT, CHECKED_IN or HEARTED # remove this line for get all types
    $skip: Int,
    $first: Int
  ) {
    allCollections(
      skip: $skip,
      first: $first,
      filter: {
        AND: [
          { type: $type }, # remove this line for get all types
          {
            user: {
            	id: $userId
          	}
          }
        ]
      }
    ) {
      id
      name
      privacy
      pictureURL
      type
    }
  }
  `

  export const LIST_PLACE_STORIES = gql`
  query getPlaceStories(
    $placeId: ID! # place
    $orderBy: StoryOrderBy # title_ASC, title_DESC, createdAt_ASC, createdAt_DESC
    $skip: Int # for pagination, 0 for no skip
    $first: Int # limit result to number
  ) {
    allStories(orderBy: $orderBy, first: $first, skip: $skip, filter: {place: {id: $placeId}}) {
      id
      createdAt
      updatedAt
      title
      story
      hashtag
      place {
        id
        placeName
        pictureURL
      }
      usersLike {
        id
      }
      createdBy {
        id
        username
        lastName
        firstName
        photoURL
      }
      status
      pictureURL
    }
}
`

export const CREATE_STORY = gql`
  mutation CreateStory(
    $title: String!
    $story: String!
    $hashtag: [String!] # array of String hashtag, [] if no hastag
    $placeId: ID! # related place id
    $createdById: ID! # user id
    $status: StoryStatus! # DRAFT or PUBLISHED
    $pictureURL: [String!] # array of String url, [] if no picture url
  ) {
    createStory(
      createdById: $createdById
      title: $title
      story: $story
      hashtag: $hashtag
      placeId: $placeId
      status: $status
      pictureURL: $pictureURL
    ) {
      id
      createdBy {
        id
        lastName
        firstName
        photoURL
      }
      title
      story
      hashtag
      place {
        id
      }
      status
      pictureURL
      updatedAt
    }
  }
`

export const UPDATE_STORY = gql`
  mutation UpdateStory(
    $id: ID! # story id
    $title: String!
    $story: String!
    $hashtag: [String!] # array of String hashtag, [] if no hastag
    $placeId: ID! # related place id
    $createdById: ID! # user id
    $status: StoryStatus! # DRAFT or PUBLISHED
    $pictureURL: [String!] # array of String url, [] if no picture url
  ) {
    updateStory(
      id: $id
      createdById: $createdById
      title: $title
      story: $story
      hashtag: $hashtag
      placeId: $placeId
      status: $status
      pictureURL: $pictureURL
    ) {
      id
      createdBy {
        id
        lastName
        firstName
        photoURL
      }
      title
      story
      hashtag
      place {
        id
      }
      status
      pictureURL
      updatedAt
    }
  }
`

export const GET_USER_STORIES = gql`
query getUserStories(
    $userId: ID! # user
    $orderBy: StoryOrderBy # title_ASC, title_DESC, createdAt_ASC, createdAt_DESC
    $skip: Int # for pagination, 0 for no skip
    $first: Int # limit result to number
  ) {
    allStories(orderBy: $orderBy, first: $first, skip: $skip, filter: {createdBy: {id: $userId}}) {
      id
      createdAt
      updatedAt
      title
      story
      hashtag
      place {
        id
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
      usersLike {
        id
      }
      createdBy {
        id
        username
        lastName
        firstName
      }
      status
      pictureURL
    }
}
`

export const GET_FOLLOW_USERS = gql`
query ListFollowUser($first: Int, $skip: Int, $userId: ID!, $blockUsersIds: [ID!]!) {
  User(id: $userId) {
    id
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

export const GET_FOLLOWERS = gql`
  query GetFollowers (
      $userId: ID!,
      $orderBy: UserOrderBy, #createdAt_ASC, createdAt_DESC, #firstName_ASC ,#firstName_DESC ...
      $skip: Int,
      $first: Int
    ) {
    User(id: $userId) {
      id
      _followersMeta {
        count
      }
      followers(orderBy: $orderBy, skip: $skip, first: $first) {
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
