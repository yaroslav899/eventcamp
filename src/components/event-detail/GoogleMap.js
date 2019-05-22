import React, { PureComponent, Fragment } from 'react';
import { request } from '../../api';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { googleApiService } from '../../credentials';

export class GoogleMap extends PureComponent {
  state = { googleAddress: null };

  componentDidMount () {
    const { address: eventAddress } = this.props;

    return request.getAddress(eventAddress).then(address => {
      this.setState({
        googleAddress: address.results[0],
      });
    });
  }

  render() {
    const {
      loaded,
      address,
      google,
      zoomLvl,
      mapWidth,
      mapHeight,
      mapPosition,
    } = this.props;
    const { googleAddress } = this.state;

    if (!loaded || !address || !googleAddress) {
      return <Fragment />;
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
          style={ {width: mapWidth, height: mapHeight, position: mapPosition} }
          initialCenter={{ lat: locationLat, lng: locationLng }}
        >
          <Marker position={{ lat: locationLat, lng: locationLng }} />
        </Map>
      </Fragment>
    );
  }
}

GoogleMap.defaultProps = {
  zoomLvl: 15,
  mapWidth: '100%',
  mapHeight: '400px',
  mapPosition: 'relative',
};

export default GoogleApiWrapper({
  apiKey: googleApiService.ru.key,
  language: googleApiService.ru.lang,
})(GoogleMap);
