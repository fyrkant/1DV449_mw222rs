import React, {Component} from 'react';
import {GoogleMap, Marker} from 'react-google-maps';

export class SimpleMap extends Component {
    render() {
        console.log();
        const marks = [] || this.props.messages.map((marker) => {
            return (
                <Marker position={{lat: marker.latitude, lng: marker.longitude}} key={marker.id} />
            );
        });

        return (
            <GoogleMap
                ref={(map) => console.log(map)}
                defaultZoom={3}
                defaultCenter={{lat: -25.363882, lng: 131.044922}}>
                {marks}
            </GoogleMap>
        );
    }
}