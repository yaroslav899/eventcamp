import React, { PureComponent } from 'react';
import { fieldsRegisterForm, detailRecources } from '../../resources';
import { globalRecources } from '../../resources/global';

class CallBackForm extends PureComponent {
  state = {
    firstname: '',
    email: '',
    textDescription: '',
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { firstname, email, textDescription } = this.state;
    const { firstNameValue, emailValue, descriptionValue, sendText } = this.props;

    return (
      <form id="contactForm" method="post">
        <div className="form-row form-group">
          <label className="col-sm-4" htmlFor="firstname">{firstNameValue} *</label>
          <input id="firstname" type="text" className="form-control col-sm-7" name="firstname" value={firstname} onChange={this.onChange} />
        </div>
        <div className="form-row form-group">
          <label className="col-sm-4" htmlFor="email">{emailValue}</label>
          <input id="email" type="email" className="form-control col-sm-7" name="email" value={email} onChange={this.onChange} />
        </div>
        <div className="form-row form-group">
          <label className="col-sm-4" htmlFor="textDescription">{descriptionValue} *</label>
          <textarea id="textDescription" className="form-control col-sm-7" cols="33" name="textDescription" rows="5" onChange={this.onChange} value={textDescription} />
        </div>
        <button className="btn btn-secondary submit" type="submit">
          {sendText}
        </button>
      </form>
    );
  }
}

CallBackForm.defaultProps = {
  firstNameValue: fieldsRegisterForm.firstname,
  emailValue: fieldsRegisterForm.email,
  descriptionValue: detailRecources.description,
  sendText: globalRecources.sendText,
};

export default CallBackForm;
