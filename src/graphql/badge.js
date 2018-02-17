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
  }) {
    id
    iconUrl
    receivedBy {
      user (filter: {
        id: $userId
      }) {
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

export const GET_BADGES_BY_CONDITION_GROUP = gql`
query BadgeQuery($groupId: ID!) {
  allBadges(filter: {
    conditions_every: {
      conditionGroup: {
        id: $groupId
      }
    }
  }) {
    id
    createdAt
    name
    photoURL
  }
}`

export function GetBadgesByCondtionGroup(groupId) {
  return client.query({
    query: GET_BADGES_BY_CONDITION_GROUP,
    variables: {
      groupId: groupId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => res.allBadges)
}

export const GET_BADGES_BY_CITY = gql`
query BadgeQuery($cityId: ID!, $userId: ID!) {
  allBadges(filter:{
    city: {
      id: $cityId
    }
  }) {
    id
    createdAt
    active
    locationLat
    locationLong
    iconUrl
    title
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
    description
    places {
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