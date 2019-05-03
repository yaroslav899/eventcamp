import React from 'react';
import { fieldsRegisterForm } from '../../resources';
import { profileProperties, addEventFields } from '../../resources/profile';

const UserInfo = (data) => {
  const { user } = data;

  if (!user) {
    return null;
  }

  return (
    <div className="col-6">
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
            {addEventFields.phoneField}
            <br />
            <b>{user.phone}</b>
          </p>
        </div>
        <div className="col-6">
          <p className="profile__add-button d-none">
            {profileProperties.editProfileButton}
          </p>
          <p>
            {addEventFields.cityField}
            <br />
            <b>{user.city}</b>
          </p>
        </div>
      </div>
    </div>
  )
};

export default UserInfo;
