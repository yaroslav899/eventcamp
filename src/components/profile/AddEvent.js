import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import { getCookie } from '../../_cookie';
import { request } from '../../api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { categories, cities, defaultTopic } from '../../fixtures';
import { currencies } from '../../resources';

export default class AddEvent extends Component {
  state = {
    topics: defaultTopic,
    currentTheme: '',
    editorState: EditorState.createEmpty(),
    title: '',
    image: null,
    price: '',
    currency: '',
    category: '',
    subcategory: '',
    tags: '',
    register: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    date: '',
    time: '',
    isSuccessRegister: false,
  };

  fileInput = React.createRef();

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange = (event) => {
    this.setState({ [event.type]: event.value });
  }

  changeCategory = (event) => {
    this.setState({
      [event.type]: event.value,
      topics: categories.find(category => category.id === event.value).subcat,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const file = this.fileInput.current.files[0];
    const { state } = this;

    //ToDo update case without image and when image has cyrillic name
    request.uploadImage(file)
      .then(function (response) {
        request.createPost(state, response.data.id)
          .then(() => this.setState({ isSuccessRegister: true }));
      });
  };

  changeTheme = (selection) => {
    const { topics } = this.state;
    if (selection) {
      const param = topics.filter(topic => topic.name === selection.label);
    }

    this.setState({
      currentTheme: selection || defaultTopic,
    });
  };


  onChanges = (value) => {
    this.setState({ captcha: value })
  };

  handleUploadImg = (event) => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    })
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="container">
        <h1>Добавить событие</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col-md-8">
              <div className="row">
                <div className="form-group col-md-12">
                  <label htmlFor="title">Заголовок</label>
                  <input type="text"
                    className="form-control"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    placeholder="Заполните заголовок" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="category">Категория</label>
                  <Select
                    name="form-field-category"
                    label="category"
                    options={categories.map(category => ({
                      label: category.name,
                      value: category.id,
                      type: 'category',
                    }))}
                    value={this.state.category}
                    onChange={this.changeCategory}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="topics">Тема</label>
                  <Select
                    name="form-field-topics"
                    label="topics"
                    options={this.state.topics.map(topic => ({
                      label: topic.name,
                      value: topic.id,
                      type: 'topics',
                    }))}
                    value={this.state.currentTheme}
                    onChange={this.changeTheme}
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-md-4 text-center">
              <input type="file" ref={this.fileInput} onChange={this.handleUploadImg} />
              <img src={this.state.image} height="80px" />
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="date">Дата</label>
              <input type="date"
                className="form-control"
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
                placeholder="Введите ключевые слова: uber,asd,qwe,aaa" />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="time">Время</label>
              <input type="time"
                className="form-control"
                name="time"
                value={this.state.time}
                onChange={this.handleInputChange}
                placeholder="Введите ключевые слова: uber,asd,qwe,aaa" />
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="register">Ссылка для регистрации</label>
              <input type="text"
                className="form-control"
                name="register"
                value={this.state.register}
                onChange={this.handleInputChange}
                placeholder="http://add-your-link.com" />
            </div>
            <div className="form-group col-md-6 offset-md-2">
              Ссылка на ваш сайт для регистрации участников или информация о событии
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="phone">Телефон для связи</label>
              <input type="text"
                className="form-control"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                placeholder="+38 (0xx) xxx-xx-xx" />
            </div>
            <div className="form-group col-md-6 offset-md-2">
              Добавляйте номер телефона и ваше событие получит больший отклик. Люди смогут узанть больше информации по телефону
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="email">Email для связи</label>
              <input type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="your@email.com" />
            </div>
            <div className="form-group col-md-6 offset-md-2">
              Добавляйте адрес вашей электронной почты и получайте обратную связь от пользователей.
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="tags">Тэги</label>
              <input type="text"
                className="form-control"
                name="tags"
                value={this.state.tags}
                onChange={this.handleInputChange}
                placeholder="Введите ключевые слова: uber,asd,qwe,aaa" />
            </div>
            <div className="form-group col-md-6 offset-md-2">
              Добавляйте ключевые слова через запятую. Это позволит системе показывать ваше
              объявление в поиске похожие и улучшит его в поиске событий.
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="price">Цена</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={this.state.price}
                onChange={this.handleInputChange}
                placeholder="1000" />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="currency">Валюта</label>
              <Select
                name="form-field-currency"
                label="currency"
                options={currencies.map(currency => ({
                  label: currency.name,
                  value: currency.name,
                  type: 'currency',
                }))}
                value={this.state.currency}
                onChange={this.handleSelectChange}
              />
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="city">Город</label>
              <Select
                name="form-field-cities"
                label="city"
                options={cities.map(city => ({
                  label: city.name,
                  value: city.id,
                  type: 'city',
                }))}
                value={this.state.city}
                onChange={this.handleSelectChange}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="address">Адрес</label>
              <input type="text"
                className="form-control"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                placeholder="Адрес" />
            </div>
          </div>
          <div className="border-separate"></div>
          <div className="">
            <label htmlFor="inputDescription">Описание</label>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <div className="border-separate"></div>
          <input type="submit" value="Добавить событие" className="btn btn-secondary" />
        </form>
      </div>
    );
  }
}