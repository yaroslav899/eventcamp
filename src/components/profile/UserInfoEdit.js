import React, { PureComponent, Fragment } from 'react';
import store from '../../store';
import { request } from '../../api';
import { profileProperties } from '../../resources/profile';
import { imageUrlRecources } from '../../resources/url';

class UserImage extends PureComponent {
  fileInput = React.createRef();

  handleUploadImage = () => {
    const { user } = this.props;
    const { name, email, token, city, phone, userID } = user;

    const file = this.fileInput.current.files[0];
    const fileNameArray = file.name.split('.');
    const fileType = fileNameArray[fileNameArray.length - 1];
    const updatedFile = new File([file], `profile-img-${email}.${fileType}`, { type: file.type });

    request.uploadImage(updatedFile)
      .then(response => {
        const responseUserData = {
          name,
          email,
          token,
          userID,
          phone,
          city,
          imageUrl: response.data.media_details.sizes.medium.source_url,
        }

        store.dispatch({
          type: 'UPDATE_USERDATA',
          data: responseUserData,
        });
      });
  };

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    const { imageUrl } = user;

    return (
      <Fragment>
        <div className="col-6">
          <h1>{profileProperties.title}</h1>
        </div>
        <div className="col-6 text-right" />
        <div className="col-3 text-center">
          <h3>{profileProperties.photoUser}</h3>
          <img src={imageUrl || imageUrlRecources.noPhoto} alt="profile" className="img-fluid rounded-circle profile__photo" />
        </div>
        <div className="col-3 profile__add-photo">
          <p>
            {profileProperties.uploadFile}
            <br/>
            <input type="file" ref={this.fileInput} onChange={this.handleUploadImage} />
          </p>
        </div>
      </Fragment>
    );
  }
}

export default UserImage;
