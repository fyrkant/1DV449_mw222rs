import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import initialState from './initialstate';

export default applyMiddleware(thunk)(createStore)(reducers, initialState);