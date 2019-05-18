import React, { Fragment } from 'react';
import Field from '../global/Field';
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
        <Field label={fieldsRegisterForm.firstname} text={user.name} />
        <Field label={fieldsRegisterForm.email} text={user.email} />
      </div>
      <div className="col-6">
        <Field label={addEventFields.phoneField} text={user.phone} />
        <Field label={addEventFields.cityField} text={user.city} />
      </div>
    </div>
  )
}

export default UserInfoData;
