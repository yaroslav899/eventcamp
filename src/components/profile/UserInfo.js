import React from 'react';
import { NavLink } from 'react-router-dom';
import { profileProperties } from '../../resources/profile';
import { fieldsRegisterForm } from '../../resources';

const UserInfo = (user, addEventUrl) => (
  <div className="row">
    <div className="col-6">
      <h1>{profileProperties.title}</h1>
    </div>
    <div className="col-6 text-right">
      <NavLink to={addEventUrl} className="profile__add-button">
        <span>&#8853;</span> Добавить событие
       </NavLink>
    </div>
    <div className="col-6">
      <h3>{profileProperties.photoUser}</h3>
      <img src="/img/turizm.png" alt="profile photo" className="img-fluid rounded-circle profile__photo" />
    </div>
    <div className="col-6">
      <h3>{profileProperties.title}</h3>
      <div className="row">
        <div className="col-6">
          {fieldsRegisterForm.firstname}
          <br />
          <b>{user.user_display_name}</b>
        </div>
        <div className="col-6">
          {fieldsRegisterForm.email}
          <br />
          <b>{user.user_email}</b>
        </div>
      </div>
    </div>
  </div>
  );
export default UserInfo;
