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
      title
      subtitle
      description
      pictureUrl
      iconUrl
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
  }).then(res => Promise.resolve(res.data))
  .then(res => res.allCampaigns)
}

export const GET_CAMPAIGN_DETAIL = gql`
query CampaignQuery($campaignId:  ID!) {
  Campaign(id: $campaignId) {
    id
    active
    cities {
      id
      description
      iconUrl
      locationLat
      locationLong
      subtitle
      title
    }
    createdAt
    description
    events {
      id
      active
      fromDateTime
      toDateTime
      name
      description
    }
    iconUrl
    _joinedByMeta {
      count
    }
    name
    partner {
      id
      username
      photoURL
      _followersMeta {
        count
      }
    }
    pictureUrl
    subtitle
    title
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
