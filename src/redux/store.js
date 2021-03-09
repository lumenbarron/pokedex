import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

//Get the reducer
import pokeReducer from './pokeReducer'

const rootReducer = combineReducers({
    pokemons : pokeReducer,
})

//Configure extension google chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore () {
    const store = createStore ( rootReducer, composeEnhancers( applyMiddleware(thunk)))
    return store;
}

//generateStore => rootReducer => pokeReducer => get the state initial
