import React from 'react';
import {Button} from 'react-mdl';
import {map, filter} from 'lodash';
import {DetailedMessage} from './detailed-message';

export let MessageList = (props) => {
    const filterIndex = {
        'ALL': 9,
        'ROAD': 0,
        'COLLECTIVE': 1,
        'PLANNED': 2,
        'OTHER': 3
    }[props.filter];

    const filtered = filter(props.messages || [], (message) => {
        if (props.filter === 'ALL') {
            return true;
        } else {
            return message.category === filterIndex;
        }
    });
    const nodes = map(filtered, (message) => {
        return (
            <li style={{listStyle: 'none'}} key={message.id} >
                <Button onClick={props.select.bind(this, message.id)} >{message.title}</Button>
                {props.selected.id === message.id ?
                    <DetailedMessage message={message} /> : ''}
            </li>
        );
    });

    return <ul>{nodes || ''}</ul>;
};