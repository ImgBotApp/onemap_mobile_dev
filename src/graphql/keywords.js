import { gql } from 'react-apollo'

export const GET_FILTER_KEYWORDS = gql`
  query AllKeywords($keyword: String) {
    allKeywords(filter: {
      name_contains: $keyword
    }){
      id
      name
    }
  }
`