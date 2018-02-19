import { gql } from 'react-apollo'
import { client } from '@root/main'

export const GET_BADGES_BY_CAMPAIGN = gql`
query BadgeQuery($campaignId: ID!, $userId: ID!) {
  allBadges(filter: {
    city: {
      campaign: {
        id: $campaignId
      }
    }
  }, orderBy: type_ASC) {
    id
    iconUrl
    type
    receivedBy(filter: {
      user: {
        id: $userId
      }
    }) {
      user {
        id
      }
    }
  }
}`

export function GetBadgesByCampaign(campaignId, userId) {
  return client.query({
    query: GET_BADGES_BY_CAMPAIGN,
    variables: {
      campaignId: campaignId,
      userId: userId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => res.allBadges)
}

export const GET_BADGES_BY_CITY = gql`
query BadgeQuery($cityId: ID!, $userId: ID!) {
  allBadges(filter:{
    city: {
      id: $cityId
    },
    type:PLACE
  }, , orderBy: type_ASC) {
    id
    createdAt
    active
    locationLat
    locationLong
    iconUrl
    title
    type
    receivedBy {
      user (filter: {
        id: $userId
      }) {
        id
      }
    }
  }
}`

export function GetBadgesByCity(cityId, userId) {
  return client.query({
    query: GET_BADGES_BY_CITY,
    variables: {
      cityId: cityId,
      userId: userId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => res.allBadges)
}

export const GET_BADGE_DETAIL = gql`
query BadgeQuery($badgeId: ID!, $userId: ID!) {
  Badge(id: $badgeId) {
    id
    iconUrl
    title
    subtitle
    receivedBy(filter: {
      user:{
        id: $userId
      }
    }) {
      id
    }
    distance
    startDate
    endDate
    point
    type
    description
    places {
      id
      placeName
      pictureURL
      description
    }
  }
}`

export function GetBadgeDetail(badgeId, userId) {
  return client.query({
    query: GET_BADGE_DETAIL,
    variables: {
      badgeId:  badgeId,
      userId: userId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => Promise.resolve(res.Badge))
}