import { put, call, fork } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { fetchItemsBegin, fetchItemsSuccess, fetchItemsFailure } from '../ducks/reddit'

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

export function* startup() {
    yield fork(fetchItems)
}

export default function* root() {
    yield fork(startup)
}
