import React, { PureComponent } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import { withTranslation } from 'react-multi-lang';
import { request } from '../../api';
import Loader from '../global/Loader';
import { formValidator } from '../../validator';
import { categories, cities, defaultTopic } from '../../fixtures';
import { currencies } from '../../resources/currencies';

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
    this.setState({ [event.target.name]: event.target.value });

    return true;
  }

  handleSelectChange = (event) => {
    this.setState({ [event.type]: event.value });

    return true;
  }

  changeCategory = (event) => {
    this.setState({
      [event.type]: event.value,
      topics: categories.find(category => category.id === event.value).subcat,
      currentTheme: defaultTopic,
    });

    return true;
  }

  changeTheme = (selection) => {
    this.setState({ currentTheme: selection || defaultTopic });

    return true;
  };

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isAddingEvent: true }, () => {
      const file = this.fileInput.current.files[0];
      const { state } = this;
      const checkValidForm = this.validator();

      if (!checkValidForm.success) {
        this.setState({
          errorMsg: checkValidForm.errorMsg,
          isAddingEvent: false,
        });
        return false;
      }

      if (!file) {
        return request.createPost(state, null)
          .then(() => this.setState({
            isSuccessRegister: true,
            isAddingEvent: false,
          }));
      }

      // ToDo update case without image and when image has cyrillic name
      return request.uploadImage(file)
        .then((response) => {
          const { id } = response.data;
          return request.createPost(state, id)
            .then(() => this.setState({
              isSuccessRegister: true,
              isAddingEvent: false,
            }));
        });
    });
  };

  validator = () => {
    const { title, category, currentTheme, date, city } = this.state;
    const { t } = this.props;
    const fields = {
      title: {
        value: title,
        name: t('profile.field.label.title'),
        rules: ['isMandatory'],
      },
      category: {
        value: category,
        name: t('profile.field.label.category'),
        rules: ['isMandatory'],
      },
      currentTheme: {
        value: currentTheme,
        name: t('profile.field.label.topic'),
        rules: ['isMandatory'],
      },
      date: {
        value: date,
        name: t('profile.field.label.date'),
        rules: ['isMandatory'],
      },
      city: {
        value: city,
        name: t('profile.field.label.city'),
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
      topics,
      errorMsg,
      isAddingEvent,
      isSuccessRegister,
    } = this.state;
    const { t } = this.props;

    if (isSuccessRegister) {
      return (
        <div className="container">
          {t('profile.global.success')}
        </div>
      );
    }

    return (
      <div className="container">
        <h1>{t('global.button.addEvent')}</h1>
        <form onSubmit={this.handleSubmit} className="event-editor">
          <div className="form-row">
            <div className="col-md-6">
              <div className="row">
                <div className="form-group col-md-12">
                  <label htmlFor="title">{t('profile.field.label.title')}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={this.handleInputChange}
                    placeholder={t('profile.field.placeholder.title')}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="category">{t('profile.field.label.category')}</label>
                  <Select
                    name="form-field-category"
                    label="category"
                    options={categories.map(categoryValue => ({
                      label: categoryValue.name,
                      value: categoryValue.id,
                      type: 'category',
                    }))}
                    value={category}
                    onChange={this.changeCategory}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="topics">{t('profile.field.label.topic')}</label>
                  <Select
                    name="form-field-topics"
                    label="topics"
                    options={topics.map(topic => ({
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
            <div className="form-group offset-md-2 col-md-4 event-editor_picture">
              <p className="descr-label">{t('profile.field.descrLabel.picture')}</p>
              <p><input type="file" ref={this.fileInput} /></p>
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="date">{t('profile.field.label.date')}</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={date}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="time">{t('profile.field.label.time')}</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={time}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="register">{t('profile.field.label.link')}</label>
              <input
                type="text"
                className="form-control"
                name="register"
                value={register}
                onChange={this.handleInputChange}
                placeholder={t('profile.field.placeholder.link')}
              />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {t('profile.field.descrLabel.link')}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="phone">{t('profile.field.label.phone')}</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={phone}
                onChange={this.handleInputChange}
                placeholder={t('profile.field.placeholder.phone')}
              />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {t('profile.field.descrLabel.phone')}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="email">{t('profile.field.label.email')}</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                placeholder={t('profile.field.placeholder.email')}
              />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {t('profile.field.descrLabel.email')}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="tags">{t('profile.field.label.tags')}</label>
              <input
                type="text"
                className="form-control"
                name="tags"
                value={tags}
                onChange={this.handleInputChange}
                placeholder={t('profile.field.placeholder.tags')}
              />
            </div>
            <div className="form-group col-md-6 offset-md-2 descr-label">
              {t('profile.field.descrLabel.tags')}
            </div>
          </div>
          <div className="border-separate" />
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="price">{t('profile.field.label.price')}</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={price}
                onChange={this.handleInputChange}
                placeholder={t('profile.field.label.price')}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="currency">{t('profile.field.label.curriency')}</label>
              <Select
                name="form-field-currency"
                label="currency"
                options={currencies.map(currencyValue => ({
                  label: currencyValue.name,
                  value: currencyValue.name,
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
              <label htmlFor="city">{t('profile.field.label.city')}</label>
              <Select
                name="form-field-cities"
                label="city"
                options={cities.map(cityValue => ({
                  label: cityValue.name,
                  value: cityValue.id,
                  type: 'city',
                }))}
                value={city}
                onChange={this.handleSelectChange}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="address">{t('profile.field.label.address')}</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={this.handleInputChange}
                placeholder={t('profile.field.placeholder.address')}
              />
            </div>
            <div className="form-group offset-md-1 col-md-3 descr-label">
              {t('profile.field.descrLabel.city')}
            </div>
          </div>
          <div className="border-separate" />
          <span>{t('profile.field.label.description')}</span>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <div className="border-separate" />
          <span className="error-message">{errorMsg}</span>
          <button type="submit" className="btn btn-secondary submit" disabled={isAddingEvent}>
            {t('global.button.addEvent')}
            {isAddingEvent && <Loader />}
          </button>
        </form>
      </div>
    );
  }
}

export default withTranslation(AddEvent);
