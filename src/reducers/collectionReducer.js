import {
    CHANGE_COLLECTION_NAME,
    CHANGE_COLLECTION_VISIBILITY,
    RESET_COLLECTION_FIELD
} from '@global/redux'

const initialState = {
    name: '',
    visibility: false
}

export default collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_COLLECTION_NAME:
            return Object.assign({}, state, {
                name: action.name
            });
        case CHANGE_COLLECTION_VISIBILITY:
            return Object.assign({}, state, {
                visibility: action.visibility
            });
        case RESET_COLLECTION_FIELD:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}