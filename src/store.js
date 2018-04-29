import { createStore } from 'react-redux-app-container'

import { routerReducer, routerMiddleware } from 'react-router-redux'
import redditReducer from './ducks/reddit'
import thunk from 'redux-thunk';

export default (history, sagaMiddleware) => {
    const initialState = {}
    const reducers = {
        router: routerReducer,
        reddit: redditReducer
    }
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history),
        thunk,
    ]
    const enhancers = []

    return createStore(initialState, reducers, middlewares, enhancers)
}
