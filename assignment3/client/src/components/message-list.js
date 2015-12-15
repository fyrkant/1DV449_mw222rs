import React from 'react';
import {Navigation} from 'react-mdl';
import {map} from 'lodash';
import m from 'moment';
import {categoryString} from '../constants';

export let MessageList = (props) => {
    const nodes = map(props.messages || [], (message) => {
        return (
            <a
                key={message.id}
                style={
                    props.selected.id === message.id ?
                        {backgroundColor: 'rgb(224,224,224)', fontWeight: 'bold', padding: '4px 8px', display: 'block'} :
                        {padding: '4px 8px', display: 'block'}}
                onClick={props.select.bind(this, message.id)}
            >
                <p><strong>{m(message.createddate).format('LT')}: {categoryString[message.category]}, {message.subcategory}</strong></p>
                <p>{message.title}</p>
            </a>
        );
    });

    return <Navigation>{nodes || ''}</Navigation>;
};