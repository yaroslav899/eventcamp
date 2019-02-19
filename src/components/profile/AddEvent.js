import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import { request } from '../../api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { categories, cities } from '../../fixtures';
import { currencies } from '../../resources';

const defaultTopic = [{
  id: '999',
  url: 'no_choice',
  name: 'Выберите категорию',
}];

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      themes: defaultTopic,
      currentTheme: '',
      editorState: EditorState.createEmpty(),
      title: '',
      image: null,
      price: '',
      currency: '',
      category: '',
      subcategory: '',
      tags: '',
      city: '',
      address: '',
      date: '',
      time: '',
      isSuccessRegister: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange = (event) => {
    this.setState({ [event.type]: event.value });
  }

  changeCategory = (event) => {
    this.setState({
      [event.type]: event.value,
      themes: categories.find(category => category.id === event.value).subcat,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const file = this.fileInput.current.files[0];
    const { state } = this;
    const { token } = JSON.parse(localStorage.getItem('authData'));
    //ToDo update case without image and when image has cyrillic name
    axios.post('http://board.it-mir.net.ua/wp-json/wp/v2/media', file, {
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': 'attachment; filename=' + file.name + '',
        'Authorization': 'Bearer' + token,
        'Cache-Control': 'no-cache',
      }
    }).then(function (response) {
      request.createPost(state, response.data.id).then(() => this.setState({ isSuccessRegister: true }))
    });
  };

    changeTheme = (selection) => {
      const { themes } = this.state;
      if (selection) {
        const param = themes.filter(theme => theme.name === selection.label);
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
                  <label htmlFor="themes">Тема</label>
                  <Select
                    name="form-field-themes"
                    label="themes"
                    options={this.state.themes.map(theme => ({
                      label: theme.name,
                      value: theme.id,
                      type: 'themes',
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
            <div className="form-group col-md-4">
              <label htmlFor="tags">Тэги</label>
              <input type="text"
                className="form-control"
                name="tags"
                value={this.state.tags}
                onChange={this.handleInputChange}
                placeholder="Введите ключевые слова: uber,asd,qwe,aaa" />
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

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}