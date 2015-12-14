import React from 'react';
import {Navigation} from 'react-mdl';
import {map} from 'lodash';

export let MessageList = (props) => {
    const nodes = map(props.messages || [], (message) => {
        return (
            <a key={message.id} style={props.selected.id === message.id ? {backgroundColor: 'rgb(224,224,224)'} : null} href="#" onClick={props.select.bind(this, message.id)} >{message.title}</a>
        );
    });

    return <Navigation>{nodes || ''}</Navigation>;
};