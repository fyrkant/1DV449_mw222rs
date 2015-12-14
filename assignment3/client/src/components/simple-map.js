import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';

export class SimpleMap extends Component {
    handleMarkerClick(message) {
        this.props.handleMarkerClick(message);
    }
    render() {
        return (
        <GoogleMapLoader
            containerElement={
                <div className="mdl-layout__content" {...this.props} style={{height: '100%', height: '100%'}} />
            }
            googleMapElement={
                <GoogleMap
                    defaultZoom={5}
                    defaultCenter={{lat: 63.024489, lng: 15.219418}}
                >
                {this.props.children}
                </GoogleMap>
            }
        />
      );
    }
}