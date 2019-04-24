import React, { PureComponent, Fragment } from 'react';
import { request } from '../../api';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { globalRecources } from '../../resources/global';
import { googleApiService } from '../../credentials';

export class GoogleMap extends PureComponent {
  state = {
    googleAddress: null,
    zoomLvl: 15,
    mapWidth: '100%',
    mapHeight: '400px',
  };

  componentDidMount () {
    const { address: eventAddress } = this.props;

    return request.getAddress(eventAddress).then(address => {
      this.setState({
        googleAddress: address.results[0]
      });
    });
  }

  render() {
    const { loaded, address, google } = this.props;
    const { googleAddress, zoomLvl, mapWidth, mapHeight } = this.state;

    if (!loaded || !address || !googleAddress) {
      return <Fragment />
    }

    const {
      geometry: {
        location: {
          lat: locationLat,
          lng: locationLng,
        },
      },
    } = googleAddress;

    return (
      <Fragment>
        <Map
          google={google}
          zoom={zoomLvl}
          style={{width: mapWidth, height: mapHeight, position: 'relative'}}
          initialCenter = {{ lat: locationLat, lng: locationLng }}
        >
          <Marker position = {{ lat: locationLat, lng: locationLng }} />
        </Map>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleApiService.ru.key,
  language: googleApiService.ru.lang
})(GoogleMap)