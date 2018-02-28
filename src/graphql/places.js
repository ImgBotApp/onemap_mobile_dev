import { gql } from 'react-apollo'
import { client } from '@root/main'

export const GET_ALL_PLACES = gql`
  query AllPlacesQuery {
    allPlaces {
      id
      updatedAt
      description
      placeName
      pictureURL
      createdBy {
        id
        username
        photoURL
      }
    }
  }
`

export const GET_PLACE_PROFILE = gql`
  query PlaceQuery($id: ID!, $userId: ID, $oneMapperId: ID) {
    Place(id: $id) {
      id
      createdBy {
        id
      }
      updatedAt
      description
      placeName
      pictureURL
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
      keywords {
        id
        createdBy {
          id
        }
        name
      }
      stories(orderBy: updatedAt_DESC, filter: {
        OR: [
          {
            createdBy: {
              id: $userId
            }
          },
          {
            createdBy: {
              id: $oneMapperId
            }
          }
        ]
      }) {
        id
        title
        story
        createdBy {
          id
          displayName
          photoURL
        }
        likedByUser {
          id
          user {
            id
          }
        }
        pictureURL
        updatedAt
      }
      checkIns {
        id
        createdAt
        user {
          id
        }
      }
      heartedByUser {
        id
        user {
          id
        }
      }
      collections {
        id
      }
    }
  }
`

export function getPlaceDetail(id) {
  return client.query({
    query: GET_PLACE_PROFILE,
    variables: {
      id: id
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => Promise.resolve(res.Place))
}
export const CREATE_PLACE = gql`
  mutation CreatePlace(
    $createdById: ID! # user id
    $source: PlaceSource! # GOOGLE_PLACE or ONEMAP
    $status: PlaceStatus! # ENABLE or DISABLE
    $createSide: CreateSide! # FRONTEND or BACKEND
    $description: String
    $sourceId: String # GOOGLE place id if source is GOOGLE_PLACE
    $placeName: String
    $locationLat: Float
    $locationLong: Float
    $addressAreaDistrict: String
    $addressCityTown: String
    $addressStateProvince: String
    $addressCountry: String
    $addressPostalCode: String
    $addressStreet: String
    $address: String
    $phoneNumber: String
    $website: String
    $facebook: String
    $line: String
    $openingHrs: String
    $pictureURL: [String!] # leave blank [] if no picture
    $placeOwner: String
  ) 
  {
    createPlace(
      description: $description
      source: $source
      sourceId: $sourceId
      createSide: $createSide
      placeName: $placeName
      locationLat: $locationLat
      locationLong: $locationLong
      addressAreaDistrict: $addressAreaDistrict
      addressCityTown: $addressCityTown 
      addressStateProvince:$addressStateProvince 
      addressCountry: $addressCountry
      addressPostalCode: $addressPostalCode
      addressStreet: $addressStreet
      address: $address
      phoneNumber: $phoneNumber
      website: $website
      facebook: $facebook
      line: $line
      openingHrs: $openingHrs
      pictureURL: $pictureURL
      status: $status
      placeOwner: $placeOwner
      createdById: $createdById
    ) {
        id
        createdBy {
          id
        }
    }
  }
`

export const GET_PLACES_FROM_GOOGLEId = gql`
  query getPlacesFromSourceId($sourceId: String!) {
    allPlaces(filter: {source: GOOGLE_PLACE, sourceId: $sourceId}) {
      id
      createdBy {
        id
      }
    }
 }
 `

export const ADD_COLLECTION_TO_PLACE = gql`
  mutation ($id: ID!,
    $collectionIds: [ID!]
  ) {
    updatePlace(
      id: $id,
      collectionsIds: $collectionIds
    ) {
      id
    }
  }
`

export const REMOVE_COLLECTION_FROM_PLACE = gql`
  mutation ($id: ID!,
    $collectionIds: [ID!]
  ) {
    updatePlace(
      id: $id,
      collectionsIds: $collectionIds
    ) {
      id
    }
  }
`

export const GET_CHECKED_PLACES = gql`
query GetCheckedPlaces($userId: ID!) {
  allPlaces(orderBy: updatedAt_DESC, filter: {
    checkIns_some: {
      user: {
        id: $userId
      }
    }
  }) {
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
`

export const GET_SUGGEST_PLACES = gql`
query PlaceQuery {
  allPlaces(filter:{
    isSuggest:true
  }) {
    id
    placeName
    address
    pictureURL
    badges {
      id
    }
  }
}`

export function GetSuggestPlaces() {
  return client.query({
    query: GET_SUGGEST_PLACES
  }).then(res => Promise.resolve(res.data))
  .then(res => Promise.resolve(res.allPlaces))
}