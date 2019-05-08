import React, { Fragment } from 'react';
import { fieldsRegisterForm } from '../../resources';
import { addEventFields } from '../../resources/profile';

const UserInfoData = (props) => {
  const { user } = props;

  if (!user) {
    return <Fragment />;
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default UserInfoData;
