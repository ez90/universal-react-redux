import { createMemoryHistory } from 'history'
import createStore from '../src/store'
import createSagaMiddleware from 'redux-saga'

const history = createMemoryHistory()
const sagaMiddleware = createSagaMiddleware()

// create store
// - history in Router requirement
// - sagaMiddleware is redux-sage middleware
const store = createStore(history, sagaMiddleware)

// Add runSaga function to store, so we can use
// it to lauch saga before returno-ing computed response
store.runSaga = sagaMiddleware.run
store.close = () => store.dispatch(END)

export default store
