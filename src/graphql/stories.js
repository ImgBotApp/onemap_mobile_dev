import { gql } from 'react-apollo'

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
    $pictureURL: [String!] # array of String url, [] if no picture url
  ) {
    updateStory(
      id: $id
      title: $title
      story: $story
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

export const LIST_PLACE_STORIES = gql` #unused
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
