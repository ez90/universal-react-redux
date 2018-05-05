import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//import registerServiceWorker from './registerServiceWorker'
import createHistory  from 'history/createBrowserHistory'
import createStore from './store'
import createSagaMiddleware from 'redux-saga'
import { ReactReduxAppContainer } from 'react-redux-app-container'
import { ConnectedRouter } from 'react-router-redux'
import sagas from './sagas'

// sagaMiddleware is injected in store middlewares
// and used to run sagas before render
const sagaMiddleware = createSagaMiddleware()

// history is require by redux-router
const history = createHistory()

// Create the store
const store = createStore(history, sagaMiddleware)

// Run sagas
sagaMiddleware.run(sagas)

// render App
ReactDOM.hydrate(
    <ReactReduxAppContainer store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </ReactReduxAppContainer>,
    document.getElementById('root')
)

//registerServiceWorker()
