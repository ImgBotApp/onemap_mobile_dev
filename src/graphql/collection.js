import { gql } from 'react-apollo'

export const CREATE_COLLECTION = gql`
    mutation createCollection(
        $userId: ID
        $name: String!
        $privacy: Boolean
        $pictureURL: String!
    ) {
        createCollection(
            userId: $userId
            name: $name
            privacy: $privacy
            pictureURL: $pictureURL
            type: DEFAULT
        ) {
            id
        }
    }
`

export const GET_COLLECTION_BY_NAME = gql`
    query CollectionQuery($name: String!){
        allCollections(
            filter:{
                name: $name
            }) {
            places {
                id
            }
        }
    }
`

export const GET_COLLECTIONS = gql`
    query allCollections {
        allCollections{
            name
            privacy
            pictureURL
            type
            user {
                id
            }
        }
    }
`