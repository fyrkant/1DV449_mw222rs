import React from 'react';

export const DetailedMessage = (props) => {
    const priority = {
        1: 'Mycket allvarlig händelse',
        2: 'Stor händelse',
        3: 'Störning',
        4: 'Information',
        5: 'Mindre störning'
    }[props.message.priority];

    return (
        <div>
            <p><strong>Prioritet:</strong> {priority}</p>
            <p><strong>Skapat:</strong> {Date.parse(props.message.createddate)}</p>
            <p><strong>Exakt plats:</strong> {props.message.exactlocation}</p>
        </div>
    );
};