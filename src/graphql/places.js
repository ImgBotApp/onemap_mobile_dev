import { gql } from 'react-apollo'

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
export const PLACES_PAGINATED = gql`
  query Places($first: Int!, $skip: Int!) {
    allPlaces(first: $first, skip: $skip) {
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
      createdBy {
        id
        displayName
        username
        photoURL
      }
      collections {
        id
        user {
          id
        }
      }
    }
  }
`
export const GET_PLACE_PROFILE = gql`
  query PlaceQuery($id: ID!) {
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
      _usersLikeMeta {
        count
      }
      keywords {
        id
        createdBy {
          id
        }
        name
      }
      stories(orderBy: updatedAt_DESC) {
        id
        title
        story
        createdBy {
          id
          displayName
          photoURL
        }
        pictureURL
        place {
          id
          address
          description
          locationLat
          locationLong
          pictureURL
        }
        updatedAt
      }
      userCheckedIn {
        id
      }
      usersLike {
        id
      }
      collections {
        id
      }
    }
  }
`
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
    }
  }
`

export const GET_PLACES_FROM_GOOGLEId = gql`
  query getPlacesFromSourceId($sourceId: String!) {
    allPlaces(filter: {source: GOOGLE_PLACE, sourceId: $sourceId}) {
      id
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

export const LIKE_PLACE = gql`
  mutation (
    $id: ID!,
    $heartedIds: [ID!]
  ) {
    updatePlace(
      id: $id,
      usersLikeIds: $heartedIds
    ) {
      id
    }
  }
`

export const CHECK_IN_PLACE = gql`
  mutation (
    $id: ID!,
    $checkedIds: [ID!]
  ) {
    updatePlace(
      id: $id,
      userCheckedInIds: $checkedIds
    ) {
      id
    }
  }
`
