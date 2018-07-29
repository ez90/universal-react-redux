export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const RESET_LOGIN_PENDING = 'RESET_LOGIN_PENDING'
export const LOGOUT = 'LOGOUT'

const initialState = {
    isLoginPending: false,
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            console.log('ducks: LOGIN_REQUEST')
            return {
                ...state,
            }
        case LOGIN_SUCCESS:
            console.log('ducks: LOGIN_SUCCESS')
            return {
                ...state,
            }
        case LOGIN_ERROR:
            console.log('ducks: LOGIN_ERROR')
            return {
                ...state,
            }
        case RESET_LOGIN_PENDING:
            console.log('ducks: RESET_LOGIN_PENDING')
            return {
                ...state,
            }
        case LOGOUT:
            return {
                ...state,
            }
        default:
            return state
    }
}


// Actions creator

export const login = (user, password) => ({
    type: LOGIN_REQUEST,
    payload: {
        user,
        password,
    },
})

export const logout = () => ({
    type: LOGOUT
})


