import { gql } from 'react-apollo'

export const FEED_STORIES_PAGINATED = gql`
  query PlaceStories($first: Int!, $skip: Int!, $userId: ID!) {
    allStories(first: $first, skip: $skip, orderBy: updatedAt_DESC, filter: {
      AND: [
        {
          status: PUBLISHED
        },
        {
          OR: [
            {
              createdBy: {
                id: $userId
              }
            },
            {
              AND: [
                {
                  createdBy: {
                    followers_some: {
                      id: $userId
                    }
                  }
                },
                {
                  createdBy: {
                    blockUsers_none: {
                      id: $userId
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }) {
      id
      createdAt
      createdBy {
        id
        displayName
        username
        photoURL
      }
      pictureURL
      place {
        id
        collections {
          id
          user {
            id
          }
        }
        createdBy {
          id
        }
        locationLat
        locationLong
        placeName
      }
      story
      title
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
        createdBy {
          id
        }
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
      likedByUser {
        id
        user {
          id
        }
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

export const FOLLOWING_STORIES_PAGINATED = gql`
query FollowingStories($first: Int!, $skip: Int!, $id: ID!, $userId: ID!, $oneMapperId: ID) {
  allStories(first: $first, skip: $skip, orderBy: updatedAt_DESC, filter: {
    AND: [
      {
        status: PUBLISHED
      },
      {
        place: {
          id: $id
        }
      },
      {
        createdBy: {
          id_not: $userId
        }
      },
      {
        createdBy: {
          id_not: $oneMapperId
        }
      },
      {
        createdBy: {
          followers_some: {
            id: $userId
          }
        }
      },
      {
        createdBy: {
          blockUsers_none: {
            id: $userId
          }
        }
      }
    ]
  }) {
    id
    createdAt
    createdBy {
      id
      displayName
      username
      photoURL
    }
    pictureURL
    story
    title
    updatedAt
  }
}
`
