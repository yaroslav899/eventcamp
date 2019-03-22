import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { reCaptcha } from '../../credentials';
import { titleList, globalRecources } from '../../resources';

const RegisterForm = ({
  submitHandler,
  privacyHandler,
  recaptchaHandler,
  fields,
  className,
}) => (
    <div>
      <h3>
        {titleList.registration}
      </h3>
      <form onSubmit={submitHandler} className={className}>
       {fields}
       <br />

       <input type="checkbox" onChange={privacyHandler} /> {globalRecources.privacy}

       <ReCAPTCHA
        sitekey={reCaptcha.siteKey}
        onChange={recaptchaHandler}
       />

       <input type="submit" value="Submit" className="btn btn-secondary"/>
      </form>
    </div>
);
export default RegisterForm;
