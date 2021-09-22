import {rootReducer} from './rootReducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';

export const store = createStore(rootReducer,applyMiddleware(logger,thunk));
