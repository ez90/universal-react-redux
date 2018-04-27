import { createStore } from 'react-redux-app-container'

import { routerReducer, routerMiddleware } from 'react-router-redux'

export default (history) => {
    const initialState = {}
    const reducers = {
        router:  routerReducer,
    }
    const middlewares = [
        routerMiddleware(history),
    ]
    const enhancers = []

    return createStore(initialState, reducers, middlewares, enhancers)
}
