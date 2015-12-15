import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';

let gmaps = window.google.maps;

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
                {this.props.children}
                </GoogleMap>
            }
        />
      );
    }
}

const bwStyles = [
    {
        'featureType': 'administrative',
        'elementType': 'all',
        'stylers': [
            {
                'visibility': 'on'
            },
            {
                'lightness': 33
            }
        ]
    },
    {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
            {
                'color': '#f2e5d4'
            }
        ]
    },
    {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#c5dac6'
            }
        ]
    },
    {
        'featureType': 'poi.park',
        'elementType': 'labels',
        'stylers': [
            {
                'visibility': 'on'
            },
            {
                'lightness': 20
            }
        ]
    },
    {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [
            {
                'lightness': 20
            }
        ]
    },
    {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#c5c6c6'
            }
        ]
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#e4d7c6'
            }
        ]
    },
    {
        'featureType': 'road.local',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#fbfaf7'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
            {
                'visibility': 'on'
            },
            {
                'color': '#acbcc9'
            }
        ]
    }
];