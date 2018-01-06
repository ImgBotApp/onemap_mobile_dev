import { gql } from 'react-apollo'

export const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateFBUser(facebookToken: $facebookToken) {
      token
      id
    }
  }
`

export const UPDATE_USER = gql`
  mutation ($id: ID!, $first_name: String, $last_name: String, $gender: Gender, 
    $photoURL: String, $displayName: String, $registrationDate: String, $country: String, $city: String, $bio: String){
    updateUser(
      id: $id,
      firstName: $first_name,
      lastName: $last_name,
      gender: $gender,
      photoURL: $photoURL,
      displayName: $displayName
      loginMethod: [FACEBOOK],
      group: [USER],
      registrationDate: $registrationDate,
      country: $country,
      city: $city,
      bio: $bio
    ) {
      id
      firstName
      lastName
      gender
      photoURL
      displayName
      registrationDate
      country
      city
    }
  }
`

export const EXIST_FACEBOOK_USER = gql`
  query UserQuery($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      gender
      photoURL
      displayName
      loginMethod
      registrationDate
      country
      city
      facebookUserId
    }
  }
`
export const SEARCH_USER = gql`
  query searchUser ($keyword: String!, $first: Int, $skip: Int) {
	  allUsers(
		skip: $skip, first: $first
		filter: {
		  AND: [
			{ accountStatus: ENABLE },
			{
			  OR: [
				{ displayName_contains: $keyword },
				{ username_contains: $keyword }
			  ]
			}
		  ]
		}
	  ) {
		email
		username
		firstName
		lastName
		displayName
		gender
		city
		country
		photoURL
		}
	}`

export const LIST_KEYWORD_PLACES = gql`
   query getKeywordPlaces(
    $orderBy: PlaceOrderBy # name_ASC, name_DESC, createdAt_ASC, createdAt_DESC
    $skip: Int # for pagination, 0 for no skip
    $first: Int # limit result to number
   $keywordName: String # keyword.name
  ) {
    allPlaces(
      orderBy: $orderBy, 
      first: $first, 
      skip: $skip, 
      filter:{keywords_some:{name:$keywordName}}
    ) 
    {
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