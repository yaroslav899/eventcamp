import React, { Component } from 'react';
import {request} from '../../api';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { globalRecources } from '../../resources';

export class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: null
        };
    }

    componentDidMount () {
        return request.getAddress(this.props.address).then(address => {
            this.setState({
                address: address.results[0]
            });
        })
    }

    render() {
        if (!this.props.loaded || !this.state.address) {
            return <div>{globalRecources.loading}</div>
        }

        let lat = this.state.address.geometry.location.lat,
            lng = this.state.address.geometry.location.lng;

        return (
            <div>
                <Map google={this.props.google}
                     zoom={15}
                     style={{width: '100%', height: '400px', position: 'relative'}}
                     initialCenter = {{ lat: lat, lng: lng }}
                >
                    <Marker
                        onClick = { this.onMarkerClick }
                        title = { 'Changing Colors Garage' }
                        position = {{ lat: lat, lng: lng }}
                        name = { 'Changing Colors Garage' }
                    />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCM7IwnppmyEPSZPDZIoTW8VKOMlS5peN4',
    language: 'ru'
})(GoogleMap)