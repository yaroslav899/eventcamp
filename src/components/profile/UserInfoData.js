import React, { Fragment } from 'react';
import { withTranslation } from 'react-multi-lang';
import Field from '../global/Field';
import { fieldsRegisterForm } from '../../resources';

const UserInfoData = (props) => {
  const { user, t } = props;

  if (!user) {
    return <Fragment />;
  }

  return (
    <div className="row">
      <div className="col-6">
        <Field label={fieldsRegisterForm.firstname} text={user.name} />
        <Field label={fieldsRegisterForm.email} text={user.email} className="profile-email" />
      </div>
      <div className="col-6">
        <Field label={t('profile.field.label.phone')} text={user.phone} />
        <Field label={t('profile.field.label.city')} text={user.city} />
      </div>
    </div>
  );
};

export default withTranslation(UserInfoData);
