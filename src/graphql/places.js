import { gql } from 'react-apollo'

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
      status
      placeOwner
    }
  }
`;