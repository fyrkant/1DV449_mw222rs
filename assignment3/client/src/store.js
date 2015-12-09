import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import initialState from './initialstate';
import thunk from 'redux-thunk';

export default applyMiddleware(thunk)(createStore)(reducers, initialState);