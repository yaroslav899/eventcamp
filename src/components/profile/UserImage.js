import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-multi-lang';
import { updateUserProfile } from '../../redux/actions/userActions';
import { request, fetchProfileData } from '../../api';
import { setCookie } from '../../_cookie';
import { stringifyJSON } from '../../helper/json';
import { imageUrlRecources } from '../../resources/url';

class UserImage extends PureComponent {
  fileInput = React.createRef();

  handleUploadImage = () => {
    const { user, updateUserProfile, fetchProfileData } = this.props;
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

    updateUserProfile(userData);

    setCookie('profileData', stringifyJSON(userData), 2);

    return request.uploadImage(updatedFile)
      .then((response) => {
        const bodyParam = {
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

        return fetchProfileData(bodyParam, userID);
      });
  };

  render() {
    const { user, t } = this.props;

    if (!user) {
      return null;
    }

    const { imageUrl } = user;

    return (
      <Fragment>
        <div className="col-6 d-none d-sm-block">
          <h1>{t('title.profile')}</h1>
        </div>
        <div className="col-6 d-none d-sm-block text-right" />
        <div className="col-3 d-none d-sm-block text-center">
          <h3>{t('profile.global.photoUser')}</h3>
          <img src={imageUrl || imageUrlRecources.noPhoto} alt="profile" className="img-fluid rounded-circle profile__photo" />
        </div>
        <div className="col-3 d-none d-sm-block profile__add-photo">
          <p>
            {t('profile.global.uploadFile')}
            <br />
            <input type="file" ref={this.fileInput} onChange={this.handleUploadImage} />
          </p>
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserProfile: data => dispatch(updateUserProfile(data)),
    fetchProfileData: (bodyParam, userID) => dispatch(fetchProfileData(bodyParam, userID)),
  };
}

export default withTranslation(connect(null, mapDispatchToProps)(UserImage));
