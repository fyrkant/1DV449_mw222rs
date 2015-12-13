import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {websocket} from './actions.js';
import Wrapper from './components/wrapper';

render(
    <Provider store={store}>
        <Wrapper />
    </Provider>,
    document.getElementById('root')
);


websocket.onmessage = event => {
    const action = JSON.parse(event.data);

    store.dispatch(action);
};
