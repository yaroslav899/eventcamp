import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-multi-lang';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import Adventages from '../global/Adventages';
import { meta } from '../../resources/meta/register';

class RegistrationPage extends PureComponent {
  state = { isSuccessRegister: false };

  render() {
    const { isSuccessRegister } = this.state;
    const { title, description, keywords, metalang, metaimage, t } = this.props;
    const registerForm = (isSuccessRegister ? (
      <div>
        {t('global.successRegisterMsg')}
        <br />
        <AuthForm />
      </div>) : (
        <RegisterForm />
    ));

    return (
      <Fragment>
        <Helmet>
          <title itemProp="name" lang={metalang}>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={metaimage} />
        </Helmet>
        <div className="container">
          <Adventages />
          <div className="row">
            <div className="col-12 col-md-6">
              <AuthForm />
            </div>
            <div className="col-12 col-md-6 registration">
              {registerForm}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

RegistrationPage.defaultProps = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  metalang: meta.lang,
  metaimage: meta.image,
};

export default withTranslation(RegistrationPage);
