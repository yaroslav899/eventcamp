import React, { PureComponent } from 'react';
import { request } from '../../api';
import { profileProperties } from '../../resources/profile';
import { fieldsRegisterForm, imageUrlRecources } from '../../resources';

export default class UserInfo extends PureComponent {
  state = {
    imgUrl: imageUrlRecources.noPhoto,
  }

  fileInput = React.createRef();

  handleUploadImage = () => {
    const file = this.fileInput.current.files[0];

    request.uploadImage(file)
      .then(() => {
        // update image profile
      });
  };

  changeImage = () => {

  }

  render() {
    const { user = {} } = this.props;
    const { imgUrl } = this.state;
    return (
      <div className="row">
        <div className="col-6">
          <h1>{profileProperties.title}</h1>
        </div>
        <div className="col-6 text-right" />
        <div className="col-3 text-center">
          <h3>{profileProperties.photoUser}</h3>
          <img src={imgUrl} alt="profile" className="img-fluid rounded-circle profile__photo" />
          <input type="file" ref={this.fileInput} onChange={this.handleUploadImage} />
        </div>
        <div className="offset-3 col-6">
          <h3>{profileProperties.title}</h3>
          <div className="row">
            <div className="col-6">
              <p>
                {fieldsRegisterForm.firstname}
                <br />
                <b>{user.name}</b>
              </p>
              <p>
                {fieldsRegisterForm.email}
                <br />
                <b>{user.email}</b>
              </p>
              <p>
                Тeлефон
                <br />
                <b>{user.email}</b>
              </p>
            </div>
            <div className="col-6">
              <p className="profile__add-button">редактировать профиль</p>
              <p>
                Город
                <br />
                <b>{user.name}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
