import React, { PureComponent } from 'react';
import { imageUrlRecources } from '../../resources/url';

class EventImage extends PureComponent {
  state = { isError: false }

  onError = () => {
    this.setState(state => ({ isError: true }));
  }

  render() {
    const { imgUrl, alt, className, noPhotoUrl } = this.props;
    const { isError } = this.state;

    return (
      <img
        itemProp="image"
        src={ isError ? noPhotoUrl : imgUrl }
        content={ isError ? noPhotoUrl : imgUrl }
        alt={alt}
        className={className}
        onError={this.onError}
      />
    )
  }
};

EventImage.defaultProps = { noPhotoUrl: imageUrlRecources.noPhoto };

export default EventImage;
