import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { reCaptcha } from '../../credentials';

const RegisterForm = ({
  submitHandler,
  recaptchaHandler,
  fields,
  className,
}) => (
  <form onSubmit={submitHandler} className={className}>
    {fields}
    <br />
    <ReCAPTCHA
      sitekey={reCaptcha.siteKey}
      onChange={recaptchaHandler}
    />
    <br />
    <input type="submit" value="Submit" />
  </form>
);
export default RegisterForm;
