import { gql } from 'react-apollo'

export const GET_FILTER_KEYWORDS = gql`
  query AllKeywords($keyword: String) {
    allKeywords(filter: {
      name_contains: $keyword
    }) {
      id
      name
      places {
        id
        createdAt
        createdBy {
          id
          photoURL
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

export const GET_KEYWORD = gql`
  query GetKeyword(
    $keyword: String!,
    $userId: ID,
    $placeId: ID!
  ) {
    Keyword(
      name: $keyword,
      createdBy: $userId,
      places: [$placeId]
    ) {
      id
    }
  }
`

export const CREATE_KEYWORD = gql`
  mutation(
    $name: String!,
    $places: [ID!],
    $userId: ID!
  ) {
      createKeyword(
        createdById: $userId, 
        name: $name,
        placesIds: $places
      ) {
        id
      }
    }
`

export const DELETE_KEYWORD = gql`
  mutation(
    $id: ID!
  ) {
      deleteKeyword(
        id: $id
      ) {
        id
      }
    }
`
