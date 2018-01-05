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