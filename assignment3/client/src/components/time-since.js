import React from 'react';
import m from 'moment';

export let TimeSinceUpdate = (props) => {
    let timeSinceUpdate = props.meta ?
        'Uppdaterades ' + m(props.meta.time).fromNow() : '';

    return <p>{timeSinceUpdate}</p>;
};