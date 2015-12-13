import React from 'react';
import {map} from 'lodash';

export let MessageList = (props) => {
    let nodes = map(props.messages || [], (message) => {
        return <li key={message.id} onClick={props.select.bind(this, message.id)} >{message.title}</li>;
    });

    return <ul>{nodes || ''}</ul>;
};