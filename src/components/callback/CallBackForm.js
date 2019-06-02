import React, { PureComponent } from 'react';
import axios from 'axios';
import Loader from '../global/Loader';
import { fieldsRegisterForm, detailRecources } from '../../resources';
import { globalRecources, titleList } from '../../resources/global';
import { urlRecources } from '../../resources/url';

class CallBackForm extends PureComponent {
  state = {
    firstname: '',
    email: '',
    textDescription: '',
    isSubmit: false,
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { firstname, email, textDescription} = this.state;

    this.setState({ isSubmit: true }, () => {
      return fetch('/mail.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname,
          email,
          text: textDescription,
        }),
      }).then(response => {
        this.setState({ isSubmit: false });
        console.log(response);
        return response;
      }).then(data => {
        var g = 0;
        console.log(data);
      })
      
    });
  }

  render() {
    const { firstname, email, textDescription, isSubmit } = this.state;

    return (
      <form onSubmit={this.onSubmit} id="contactForm">
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
          {isSubmit && <Loader />}
        </button>
      </form>
    );
  }
}

export default CallBackForm;
