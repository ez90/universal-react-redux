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
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_ITEMS_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            console.log(action.payload)

            return {
                ...state,
                loading: false,
                items: action.payload.items
            }
        case FETCH_ITEMS_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            }
        default:
            // ALWAYS have a default case in a reducer
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


// Actions



// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}
