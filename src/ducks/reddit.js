export const FETCH_ITEMS_BEGIN = 'FETCH_ITEMS_BEGIN'
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS'
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE'

const initialState = {
    items: [],
    loading: false,
    error: null
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_ITEMS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items
            }
        case FETCH_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            }
        default:
            return state
    }
}


// Actions creator

export const fetchItemsBegin = () => ({
    type: FETCH_ITEMS_BEGIN
})

export const fetchItemsSuccess = items => ({
    type: FETCH_ITEMS_SUCCESS,
    payload: { items }
})

export const fetchItemsFailure = error => ({
    type: FETCH_ITEMS_FAILURE,
    payload: { error }
})
