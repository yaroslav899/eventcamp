import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { request } from '../../api';
import { profileProperties } from '../../resources/profile';
import { fieldsRegisterForm } from '../../resources';

export default class UserInfo extends Component {
  fileInput = React.createRef();

  handleUploadImage = (event) => {
    const file = this.fileInput.current.files[0];

    request.uploadImage(file)
      .then((response) => {
        // update image profile
      });
  };

  changeImage = () => {

  }

  render() {
    const { user = {}, addEventUrl = '' } = this.props;
    return (
      <div className="row">
        <div className="col-6">
          <h1>{profileProperties.title}</h1>
        </div>
        <div className="col-6 text-right">
          <NavLink to={addEventUrl} className="profile__add-button">
            <span>&#8853;</span> {profileProperties.addEventText}
          </NavLink>
        </div>
        <div className="col-3 text-center">
          <h3>{profileProperties.photoUser}</h3>
          <img src="/img/turizm.png" alt="profile photo" className="img-fluid rounded-circle profile__photo" />
          <input type="file" ref={this.fileInput} onChange={this.handleUploadImage} />
        </div>
        <div className="offset-3 col-6">
          <h3>{profileProperties.title}</h3>
          <div className="row">
            <div className="col-6">
              {fieldsRegisterForm.firstname}
              <br />
              <b>{user.name}</b>
            </div>
            <div className="col-6">
              {fieldsRegisterForm.email}
              <br />
              <b>{user.email}</b>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
