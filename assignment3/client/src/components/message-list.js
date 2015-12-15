import React from 'react';
import {Navigation} from 'react-mdl';
import {map} from 'lodash';
import m from 'moment';
import {priorityColors, categoryString} from '../constants';

export let MessageList = (props) => {
    const nodes = map(props.messages || [], (message) => {
        const baseStyle = {padding: '4px 8px', display: 'block', cursor: 'pointer'};
        
        return (
            <a
                href="#"
                key={message.id}
                style={
                    props.selected.id === message.id ?
                        Object.assign({}, baseStyle, {backgroundColor: 'rgb(224,224,224)', fontWeight: 'bold'}) :
                        baseStyle}
                onClick={props.select.bind(this, message.id)}
            >
                <p><strong>{m(message.createddate).format('LT')}: {categoryString[message.category]}, {message.subcategory}</strong></p>
                <p>{message.title}</p>
            </a>
        );
    });

    return <Navigation>{nodes || ''}</Navigation>;
};