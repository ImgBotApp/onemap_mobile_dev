import { gql } from 'react-apollo'

export const GET_PLACE = gql`
  query GetPlace($id: ID!) {
    Place(id: $id) {
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
  `
  
