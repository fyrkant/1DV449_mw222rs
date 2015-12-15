import React from 'react';
import {Card, CardTitle, CardText} from 'react-mdl';
import m from 'moment';

import {priorityColors, priorityString} from '../constants';

export const DetailedMessage = (props) => {
    const prioStr = priorityString[props.message.priority];

    return (
        <Card shadow={0} style={{width: '250px', margin: '0', padding: '0'}} onClick={props.onClick}>
            <CardText>
                <CardTitle>{props.message.title}</CardTitle>
                <p><strong>Skapat:</strong> {m(props.message.createddate).format('Do MMMM YYYY, LT')}</p>
                <p style={{fontColor: priorityColors[props.message.priority]}}><strong>Prioritet:</strong> {prioStr}</p>
                {props.message.subcategory ? <p><strong>Underkategori:</strong> {props.message.subcategory}</p> : ''}
                {props.message.description ? <p><strong>Beskrivning:</strong> {props.message.description}</p> : ''}
                {props.message.exactlocation ? <p><strong>Exakt plats:</strong> {props.message.exactlocation}</p> : ''}
            </CardText>
        </Card>
    );
};