import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import events from './events';

const reducer = combineReducers({ events });
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(reducer, composeEnhancers(middleware));

export default store;
export * from './events';