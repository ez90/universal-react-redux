import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//import registerServiceWorker from './registerServiceWorker'

import createHistory from 'history/createBrowserHistory'
import createStore from './store'
import createSagaMiddleware from 'redux-saga'

import { ReactReduxAppContainer } from 'react-redux-app-container'
import { ConnectedRouter } from 'react-router-redux'

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const history = createHistory()
const store = createStore(history, sagaMiddleware)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <ReactReduxAppContainer store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </ReactReduxAppContainer>,
    document.getElementById('root')
)

//registerServiceWorker()
