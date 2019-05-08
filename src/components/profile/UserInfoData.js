import React, { Fragment } from 'react';
import { fieldsRegisterForm } from '../../resources';
import { addEventFields } from '../../resources/profile';

const UserInfoData = (props) => {
  const { user } = props;

  if (!user) {
    return <Fragment />;
  }

  return (
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
      </div>
      <div className="col-6">
        <p>
          {addEventFields.phoneField}
          <br />
          <b>{user.phone}</b>
        </p>
        <p>
          {addEventFields.cityField}
          <br />
          <b>{user.city}</b>
        </p>
      </div>
    </div>
  )
}

export default UserInfoData;
