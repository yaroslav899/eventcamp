import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import { request } from '../../api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { categories, cities } from '../../fixtures';

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
      price: '',
      currency: '',
      category: '',
      subcategory: '',
      tags: '',
      city: '',
      address: '',
      date: '',
      time: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange = (event) => {
    this.setState({ [event.type]: event.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    request.createPost(this.state).then((data) => data);
  }

  onChanges = (value) => {
    this.setState({ captcha: value })
  }

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
            <div className="form-group col-md-8">
              <label htmlFor="title">Заголовок</label>
              <input type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
                placeholder="Заполните заголовок" />
            </div>
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
              <input type="text"
                className="form-control"
                name="currency"
                value={this.state.currency}
                onChange={this.handleInputChange}
                placeholder="UAH" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
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
                onChange={this.handleSelectChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="subcategory">Подкатегория</label>
              <input type="text"
                className="form-control"
                name="subcategory"
                value={this.state.subcategory}
                onChange={this.handleInputChange}
                placeholder="Подкатегория" />
            </div>
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