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
