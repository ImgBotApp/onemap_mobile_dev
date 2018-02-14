import { gql } from 'react-apollo'
import { client } from '@root/main'

export const GET_CAMPAIGN_BY_USER = gql`
  query CampaignQuery($userId: ID!) {
    allCampaigns(filter: {
      partner: {
        id: $userId
      }
    }) 
    {
      id
      name
      description
      photoUrl
      partner {
        id
        username
        photoURL
      }
    }
  }`


export function getCampaignByUser(userId) {
  return client.query({
    query: GET_CAMPAIGN_BY_USER,
    variables: {
      userId: userId
    }
  })
}

export const GET_CAMPAIGN_DETAIL = gql`
query CampaignQuery($campaignId:  ID!) {
  Campaign(id: $campaignId) {
    id
    active
    name
    partner {
      id
      username
      photoURL
      _followersMeta {
        count
      }
    }
    description
    conditionGroups {
      id
      locationLat
      locationLong
      iconUrl
      title
      updatedAt
      subtitle
      description
    }
    events {
      id
      active
      fromDateTime
      toDateTime
      name
      description
    }
  }
}`

export function getCampaignDetail(campaignId) {
  return client.query({
    query: GET_CAMPAIGN_DETAIL,
    variables: {
      campaignId: campaignId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => res.Campaign)
}
