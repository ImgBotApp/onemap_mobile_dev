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
export const GET_PAGINATED_PLACES = gql`
  query AllPlacesQuery($first: Int!, $skip: Int!) {
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

export const CREATE_PLACE_PROFILE = gql`
  mutation(
    $description: String!, 
    $sourceId: String!, 
    $placeName: String!, 
    $locationLat: Float, 
    $locationLong: Float, 
    $address: String, 
    $phoneNumber: String, 
    $website: String,
    $addressCountry: String,
    $addressPostalCode: String,
    $addressStateProvince: String,
    $addressCityTown: String,
    $facebook: String) {
      createPlace(
        description: $description, 
        source: GOOGLE_PLACE,
        sourceId: $sourceId,
        createSide: FRONTEND,
        placeName: $placeName,
        locationLat: $locationLat,
        locationLong: $locationLong,
        address: $address,
        phoneNumber: $phoneNumber,
        website: $website,
        facebook: $facebook,
        addressCountry: $addressCountry,
        addressPostalCode: $addressPostalCode,
        addressStateProvince: $addressStateProvince,
        addressCityTown: $addressCityTown,
        status: ENABLE
      ) {
        id
      }
    }
`