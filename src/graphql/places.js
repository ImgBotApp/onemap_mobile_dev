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
        username
        photoURL
      }
    }
  }
`
export const GET_PLACE_PROFILE = gql`
  query PlaceQuery($id: ID!) {
    Place(id: $id) {
      id
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
        name
      }
      _userCheckedInMeta {
        count
      }
      _collectionsMeta {
        count
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