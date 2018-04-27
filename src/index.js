import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import createHistory from 'history/createBrowserHistory'
import createStore from './store'
import { ReactReduxAppContainer } from 'react-redux-app-container'
import { ConnectedRouter } from 'react-router-redux'

const history = createHistory()
const store = createStore(history)

ReactDOM.render(
    <ReactReduxAppContainer store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </ReactReduxAppContainer>,
    document.getElementById('root')
)

//registerServiceWorker()
