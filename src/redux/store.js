import {createStore,applyMiddleware} from 'redux'
import Reducers from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export default createStore(Reducers,composeWithDevTools(applyMiddleware(thunk)))