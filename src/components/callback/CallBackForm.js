import React, { PureComponent } from 'react';
import axios from 'axios';
import Loader from '../global/Loader';
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

    return (
      <form id="contactForm">
        <div className="form-row form-group">
          <label className="col-sm-4" htmlFor="firstname">{fieldsRegisterForm.firstname} *</label>
          <input id="firstname" type="text" className="form-control col-sm-7" name="firstname" value={firstname} onChange={this.onChange} />
        </div>
        <div className="form-row form-group">
          <label className="col-sm-4" htmlFor="email">{fieldsRegisterForm.email}</label>
          <input id="email" type="email" className="form-control col-sm-7" name="email" value={email} onChange={this.onChange} />
        </div>
        <div className="form-row form-group">
          <label className="col-sm-4" htmlFor="textDescription">{detailRecources.description} *</label>
          <textarea id="textDescription" className="form-control col-sm-7" cols="33" name="textDescription" rows="5" onChange={this.onChange} value={textDescription} />
        </div>
        <button className="btn btn-secondary submit" type="submit">
          {globalRecources.sendText}
        </button>
      </form>
    );
  }
}

export default CallBackForm;
