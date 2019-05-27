import React, { PureComponent, Fragment } from 'react';
import store from '../../store';
import { request } from '../../api';
import { setCookie } from '../../_cookie';
import { stringifyJSON } from '../../helper/json';
import { profileProperties } from '../../resources/profile';
import { imageUrlRecources } from '../../resources/url';

class UserImage extends PureComponent {
  fileInput = React.createRef();

  handleUploadImage = () => {
    const { user } = this.props;
    const { name, email, city, phone, userID, subscribed } = user;

    const file = this.fileInput.current.files[0];
    const fileNameArray = file.name.split('.');
    const fileType = fileNameArray[fileNameArray.length - 1];
    const updatedFile = new File([file], `profile-img-${email}.${fileType}`, { type: file.type });

    const userData = {};
    userData.name = name;
    userData.email = email;
    userData.userID = userID;
    userData.phone = phone;
    userData.city = city;
    userData.subscribed = subscribed;
    userData.imageUrl = URL.createObjectURL(updatedFile);

    store.dispatch({
      type: 'UPDATE_USERPROFILE',
      data: userData,
    });

    setCookie('profileData', stringifyJSON(userData));

    return request.uploadImage(updatedFile)
      .then((response) => {
        const param = {
          description: stringifyJSON({
            name,
            userID,
            email,
            phone,
            city,
            imageUrl: response.data.media_details.sizes.medium.source_url,
            subscribed,
          }),
        };

        return request.updateProfile(param, userID)
          .then((responseProfile) => {
            if (responseProfile.success) {
              setCookie('profileData', stringifyJSON(responseProfile.userProfile));

              store.dispatch({
                type: 'UPDATE_USERPROFILE',
                data: responseProfile.userProfile,
              });
            }

            return true;
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
            <br />
            <input type="file" ref={this.fileInput} onChange={this.handleUploadImage} />
          </p>
        </div>
      </Fragment>
    );
  }
}

export default UserImage;
