import { gql } from 'react-apollo'

export const GET_SETTINGS = gql`
  query {
    allSettings {
      id
      name
      value
    }
  }
`
