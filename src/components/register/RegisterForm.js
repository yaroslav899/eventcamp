import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { reCaptcha } from '../../credentials';

const RegisterForm = ({
  submitHandler,
  recaptchaHandler,
  fields,
  className,
}) => (
    <div>
      <h3>Регистрация</h3>
  <form onSubmit={submitHandler} className={className}>
    {fields}
    <br />
      <div>
        <input type="checkbox" />*я согласен(-на) с условиями использования сайта и политикой конфиденциальности.
      </div>
    <ReCAPTCHA
      sitekey={reCaptcha.siteKey}
      onChange={recaptchaHandler}
    />
    <br />
        <input type="submit" value="Submit" className="btn btn-secondary"/>
      </form>
    </div>
);
export default RegisterForm;
