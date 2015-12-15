import React from 'react';
import m from 'moment';

export let TimeSinceUpdate = (props) => {
    let timeSinceUpdate = props.meta ?
        'Uppdaterades ' + m(props.meta.time).fromNow() : '';
    const styles = {
        display: 'inline',
        marginLeft: '5px'
    };

    return <p style={styles}>{timeSinceUpdate}</p>;
};