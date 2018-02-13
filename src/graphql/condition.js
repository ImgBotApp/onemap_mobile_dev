import { gql } from 'react-apollo'
import { client } from '@root/main'

export const GET_CONDITION_BY_GROUP = gql`
  query ConditionQuery($groupId: ID!) {
    allConditions(filter: {
      conditionGroup: {
        id: $groupId
      }
    }) {
      id
      active
      locationLat
      locationLong
      name
    }
  }`

export function GetConditionByGroup(groupId) {
  return client.query({
    query: GET_CONDITION_BY_GROUP,
    variables: {
      groupId: groupId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => res.allConditions)
}

export const GET_PLACE_DETAIL_BY_CONDITION = gql`
  query ConditionQuery($conditionId: ID!) {
    Condition(id: $conditionId) {
      id
      places {
        id
        place {
          id
          pictureURL
        }
      }
    }
  }`

export function GetPlaceByCondition(conditionId) {
  return client.query({
    query: GET_PLACE_DETAIL_BY_CONDITION,
    variables: {
      conditionId: conditionId
    }
  }).then(res => Promise.resolve(res.data))
  .then(res => res.Condition)
}

export const GET_RULES_BY_CONDITION = gql`
  query ConditionQuery($conditionId: ID!){
    Condition(id: $conditionId) {
      id
      notificationType
      pointReward
      type
      distance
      dates {
        id
        fromDateTime
        toDateTime
      }
    }
  }`

  export function GetRulesByCondition(conditionId) {
    return client.query({
      query: GET_RULES_BY_CONDITION,
      variables: {
        conditionId: conditionId
      }
    }).then(res => Promise.resolve(res.data))
    .then(res => res.Condition)
  }