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