import React from 'react';
import {Button, Icon} from 'react-mdl';


export let UpdateButton = (props) => {
    const pStyle = {marginLeft: '5px', display: 'inline'};

    return (
        <Button
            raised
            colored
            className="inline"
            onClick={props.onClick}
        >
            {props.messages ? <Icon name={'cached'} /> : <Icon name={'file_download'} />}
            {props.messages ? '' : <p style={pStyle}>Ladda ny data</p>}
        </Button>
    );
};