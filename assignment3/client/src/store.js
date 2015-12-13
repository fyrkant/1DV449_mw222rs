import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import initialState from './initialstate';

export default applyMiddleware(thunk)(createStore)(reducer, initialState);