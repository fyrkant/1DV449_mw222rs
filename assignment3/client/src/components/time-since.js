import React from 'react';

export let TimeSince = (props) => {
    const styles = {display: 'inline', padding: '6px'};

    return (
        <p style={styles}>
            {props.tick}
        </p>
     );
};