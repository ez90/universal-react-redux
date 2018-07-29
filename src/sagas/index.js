import { take, put, call, fork, cancel, all, cancelled } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { fetchItemsBegin, fetchItemsSuccess, fetchItemsFailure } from '../ducks/reddit'

// Reddit

export function fetchItemsApi() {
    return fetch("https://www.reddit.com/r/reactjs.json")
        .then(response => response.json())
        .then(json => json.data.children.map(child => child.data))
}

export function* fetchItems() {
    try {
        yield put(fetchItemsBegin)
        const items = yield call(fetchItemsApi)
        yield put(fetchItemsSuccess(items))
    }
    catch (error) {
        yield put(fetchItemsFailure(error))
    }

}

// Login Flow

export function api_authorize(user, password) {
    return fetch('http://localhost:8080/app_dev.php/login_check', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ "email": user, "password": password })
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        return data.token
    })
}

export function api_storeItem(token) {
    localStorage.setItem("token", token)
}

export function api_clearItem() {
    localStorage.removeItem("token")
}

function* authorize(user, password) {
    try {
        // Get token from API
        const token = yield call(api_authorize, user, password)
        yield put({ type: 'LOGIN_SUCCESS', token })
        yield call(api_storeItem, { token })
        return token
    } catch (error) {
        // Error occurs during authorize process
        yield put({ type: 'LOGIN_ERROR', error })
    } finally {
        // Authorize task has been cancelled
        // we can use this to perform cleanup logic
        // like setting the right state
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

function* loginFlow() {
    while (true) {
        const { payload } = yield take('LOGIN_REQUEST')
        // fork return a Task object because fork is non-blocking
        const task = yield fork(authorize, payload.user, payload.password)
        const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
        if (action.type === 'LOGOUT')
            yield cancel(task)
        yield call(api_clearItem, 'token')
    }
}


export function* startup() {
    yield fork(fetchItems)
}

export default function* root() {
    yield all([
        fork(startup),
        fork(loginFlow),
    ])
}
