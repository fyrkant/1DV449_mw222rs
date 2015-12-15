import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import {map} from 'lodash';

import {DetailedMessage} from './detailed-message';
import {pinUrl, priorityColors} from '../constants';

let gmaps = window.google.maps;

export const SimpleMap = props => {
    return (
        <GoogleMapLoader
            containerElement={
                <div className="mdl-layout__content" {...props} style={{height: '100%', height: '100%'}} />
            }
            googleMapElement={
                <GoogleMap
                    options={{
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: gmaps.MapTypeControlStyle.HORIZONTAL_BAR,
                            position: gmaps.ControlPosition.TOP_RIGHT
                        }
                    }}
                    defaultZoom={5}
                    defaultCenter={{lat: 63.024489, lng: 15.219418}}
                >
                    {map(props.messages, message =>
                        <Marker
                            key={message.id}
                            icon={pinUrl + priorityColors[message.priority]}
                            opacity={
                                props.selected.id === null ? 1 : props.selected.id === message.id ? 1 : .2}
                            onClick={props.selectMessage.bind(this, message.id)}
                            position={{lat: message.latitude, lng: message.longitude}}
                        >
                            {props.selected.id === message.id ?
                                <InfoWindow
                                    onCloseclick={props.selectMessage.bind(this, message.id)}
                                >
                                    <DetailedMessage
                                        message={props.selected}
                                    />
                                </InfoWindow> : ''}
                        </Marker>
                    )}
                </GoogleMap>
            }
        />
    );
};
