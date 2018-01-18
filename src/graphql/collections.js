import { gql } from 'react-apollo'

export const GET_ALL_COLLECTIONS = gql`
  query AllCollectionsQuery {
    allCollections {
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

export const GET_USER_COLLECTIONS = gql`
  query UserCollectionsQuery($id: ID!) {
    allCollections(filter: {
      AND: [{
        user: {id: $id}
      }, {
        type: USER
      }]
    }) {
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

export const GET_MY_COLLECTIONS = gql`
  query MyCollectionsQuery($id: ID!) {
    allCollections(filter: {user: {id: $id}}) {
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
    $pictureURL: String!,
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
    $placeIds: [ID!]
  ) {
      updateCollection(
        id: $id,
        placesIds: $placeIds
      ) {
        id
      }
    }
`
