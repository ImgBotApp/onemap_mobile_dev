import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import DoneButton from './done-button'
import {CREATE_COLLECTION} from "@graphql/collection";
import {RESET_COLLECTION_FIELD} from "@global/redux";

function mapStateToProps(state) {
    return {
        user: state.userReducers,
        collection: state.collectionReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reset: () => {
            dispatch({
                type: RESET_COLLECTION_FIELD
            })
        }
    }
}

let container = graphql(CREATE_COLLECTION, {name: 'createCollection'})(DoneButton);

export default connect(mapStateToProps, mapDispatchToProps)(container)