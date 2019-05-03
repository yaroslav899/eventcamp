import React, { PureComponent } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import { request } from '../../api';
import Loader from '../global/Loader';
import { formValidator } from '../../validator';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { categories, cities, defaultTopic } from '../../fixtures';
import { currencies } from '../../resources/currencies';
import { global, addEventFields, addEventPlaceholders, descrFields } from '../../resources/profile';

class AddEvent extends PureComponent {
  state = {
    title: '',
    category: '',
    currentTheme: '',
    date: '',
    time: '',
    register: '',
    phone: '',
    email: '',
    tags: '',
    price: '',
    currency: '',
    city: '',
    address: '',
    topics: defaultTopic,
    editorState: EditorState.createEmpty(),
    errorMsg: '',
    isAddingEvent: false,
    isSuccessRegister: false,
  };

  fileInput = React.createRef();

  handleInputChange = (event) => {
    const { isAddingEvent } = this.state;

    if (isAddingEvent) {
      return false;
    }

    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange = (event) => {
    const { isAddingEvent } = this.state;

    if (isAddingEvent) {
      return false;
    }

    this.setState({ [event.type]: event.value });
  }

  changeCategory = (event) => {
    const { isAddingEvent } = this.state;

    if (isAddingEvent) {
      return false;
    }

    this.setState({
      [event.type]: event.value,
      topics: categories.find(category => category.id === event.value).subcat,
    });
  }

  changeTheme = (selection) => {
    const { topics, isAddingEvent } = this.state;

    if (isAddingEvent) {
      return false;
    }

    if (selection) {
      const param = topics.filter(topic => topic.name === selection.label);
    }

    this.setState({
      currentTheme: selection || defaultTopic,
    });
  };

  onEditorStateChange = (editorState) => {
    const { isAddingEvent } = this.state;

    if (isAddingEvent) {
      return false;
    }

    this.setState({
      editorState,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      isAddingEvent: true,
    });

    const file = this.fileInput.current.files[0];
    const { state } = this;
    const checkValidForm = this.validator();

    if (!checkValidForm.success) {
      this.setState({ errorMsg: checkValidForm.errorMsg });
      return false;
    }

    // ToDo update case without image and when image has cyrillic name
    return request.uploadImage(file)
      .then((response) => {
        const { id } = response.data;
        return request.createPost(state, id)
          .then((data) => {
              var g = 0;
              this.setState({ isSuccessRegister: true });
          });
      });
  };

  validator = () => {
    const { title, category, currentTheme, date, time, city } = this.state;
    const { titleField, categoryField, topicField, dateField, timeField, cityField } = addEventFields;
    const fields = {
      title: {
        value: title,
        name: titleField,
        rules: ['isMandatory'],
      },
      category: {
        value: category,
        name: categoryField,
        rules: ['isMandatory'],
      },
      currentTheme: {
        value: currentTheme,
        name: topicField,
        rules: ['isMandatory'],
      },
      date: {
        value: date,
        name: dateField,
        rules: ['isMandatory'],
      },
      time: {
        value: time,
        name: timeField,
        rules: ['isMandatory'],
      },
      city: {
        value: city,
        name: cityField,
        rules: ['isMandatory'],
      },
    };

    return formValidator(fields);
  }

  render() {
    const {
      editorState,
      title,
      category,
      currentTheme,
      date,
      time,
      register,
      phone,
      price,
      currency,
      email,
      city,
      address,
      tags,
      errorMsg,
      isAddingEvent,
      isSuccessRegister,
    } = this.state;

    if (isSuccessRegister) {
      return (
        <div className="container">
          {global.successMsg}
        </div>
      )
    }

    return (
      <div className="container">
        <h1>{global.addEventButton}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col-md-6">
              <div className="row">
                <div className="form-group col-md-12">
                  <label htmlFor="title">
                    {addEventFields.titleField}
                  </label>
                  <input type="text" className="form-control" name="title" value={title} onChange={this.handleInputChange} placeholder={addEventPlaceholders.titleField} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="category">
                    {addEventFields.categoryField}
                  </label>
                  <Select
                    name="form-field-category"
                    label="category"
                    options={categories.map(category => ({
                      label: category.name,
                      value: category.id,
                      type: 'category',
                    }))}
                    value={category}
                    onChange={this.changeCategory}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="topics">
                    {addEventFields.topicField}
                  </label>
                  <Select
                    name="form-field-topics"
                    label="topics"
                    options={this.state.topics.map(topic => ({
                      label: topic.name,
                      value: topic.id,
                      type: 'topics',
                    }))}
                    value={currentTheme}
                    onChange={this.changeTheme}
                  />
                </div>
              </div>
            </div>
            <div className="form-group offset-md-2 col-md-4 text-center">
              <input type="file" ref={this.fileInput} />
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="date">
                {addEventFields.dateField}
              </label>
              <input type="date" className="form-control" name="date" value={date} onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="time">
                {addEventFields.timeField}
              </label>
              <input type="time" className="form-control" name="time" value={time} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="register">
                {addEventFields.linkField}
              </label>
              <input type="text" className="form-control" name="register" value={register} onChange={this.handleInputChange} placeholder={addEventPlaceholders.linkField} />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {descrFields.linkField}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="phone">
                {addEventFields.phoneField}
              </label>
              <input type="text" className="form-control" name="phone" value={phone} onChange={this.handleInputChange} placeholder={addEventPlaceholders.phoneField} />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {descrFields.phoneField}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="email">
                {addEventFields.emailField}
              </label>
              <input type="text" className="form-control" name="email" value={email} onChange={this.handleInputChange} placeholder={addEventPlaceholders.emailField} />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {descrFields.emailField}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="tags">
                {addEventFields.tagsField}
              </label>
              <input type="text"
                className="form-control"
                name="tags"
                value={tags}
                onChange={this.handleInputChange}
                placeholder={addEventPlaceholders.tagsField}
              />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {descrFields.tagsField}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="price">
                {addEventFields.priceField}
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={price}
                onChange={this.handleInputChange}
                placeholder={addEventPlaceholders.priceField}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="currency">
                {addEventFields.curriencesField}
              </label>
              <Select
                name="form-field-currency"
                label="currency"
                options={currencies.map(currency => ({
                  label: currency.name,
                  value: currency.name,
                  type: 'currency',
                }))}
                value={currency}
                onChange={this.handleSelectChange}
              />
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="city">
                {addEventFields.cityField}
              </label>
              <Select
                name="form-field-cities"
                label="city"
                options={cities.map(city => ({
                  label: city.name,
                  value: city.id,
                  type: 'city',
                }))}
                value={city}
                onChange={this.handleSelectChange}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="address">
                {addEventFields.addressField}
              </label>
              <input type="text" className="form-control" name="address" value={address} onChange={this.handleInputChange} placeholder={addEventPlaceholders.addressField} />
            </div>
          </div>
          <div className="border-separate" />
          <span>
            {addEventFields.descriptionField}
          </span>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <div className="border-separate" />
          <span className="error-message">{errorMsg}</span>
          <input type="submit" value={global.addEventButton} className="btn btn-secondary" />
        </form>
      </div>
    );
  }
}

export default AddEvent;