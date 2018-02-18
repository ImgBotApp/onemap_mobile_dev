import { gql } from 'react-apollo'

export const GET_MY_COLLECTIONS = gql` #sample code format
query MyCollectionsQuery($id: ID!) {
  allCollections(
    filter: {
      type: USER
      user: {
        id: $id
      }
    },
    orderBy: createdAt_DESC
  ) {
      id
      createdAt
      name
      pictureURL
      privacy
      type
      updatedAt
    }
  }
`

export const CREATE_USER_COLLECTION = gql`
  mutation(
    $name: String!, 
    $pictureURL: String,
    $privacy: Boolean!,
    $userId: ID!
  ) {
      createCollection(
        name: $name, 
        pictureURL: $pictureURL,
        privacy: $privacy,
        type: USER,
        userId: $userId
      ) {
        id
      }
    }
`

export const DELETE_USER_COLLECTION = gql`
  mutation(
    $id: ID!
  ) {
      deleteCollection(
        id: $id
      ) {
        id
      }
    }
`

/*
Get a collection by id with related places
*/
export const GET_COLLECTION_WITH_PLACES = gql`
query GetCollectionWithPlaces($id: ID!, $first: Int, $skip: Int) {
  Collection(id: $id) {
    id
    name
    privacy
    pictureURL
    type
    places(first: $first, skip: $skip) {
      id
      createdAt
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
  }
}
`

export const REMOVE_PLACE_FROM_COLLECTION = gql`
  mutation(
    $id: ID!,
    $placeId: ID!
  ) {
      removeFromCollectionOnPlace(
        collectionsCollectionId: $id,
        placesPlaceId: $placeId
      ) {
        collectionsCollection {
          id
        }
      }
    }
`

export const GET_COLLECTIONS_WITH_PLACES = gql`
query BookmarkCollectionsQuery($id: ID!, $first: Int, $skip: Int) {
  allCollections(
    filter: {
      type: USER
      user: {
        id: $id
      }
    },
    orderBy: createdAt_DESC
  ) {
    id
    places(first: $first, skip: $skip) {
      id
      createdAt
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
  }
}`

export const LIST_USER_COLLECTIONS = gql`#unused
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
  