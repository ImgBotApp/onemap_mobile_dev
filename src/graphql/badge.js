import { gql } from 'react-apollo'
import { client } from '@root/main'

export const GET_BADGES_BY_CAMPAIGN = gql`
query BadgeQuery($campaignId: ID!) {
  allBadges(filter: {
    conditions_every: {
      conditionGroup: {
        campaign:{
          id: $campaignId
        }
      }
    }
  }) {
    id
    createdAt
    name
    photoURL
  }
}`

export function GetBadgesByCampaign(campaignId) {
  return client.query({
    query: GET_BADGES_BY_CAMPAIGN,
    variables: {
      campaignId: campaignId
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