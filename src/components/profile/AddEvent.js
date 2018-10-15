import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { request } from '../../api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    /*request.createPost().then((posts) => {
      var g = 0;
    });*/
  }

  handleChange = (event) => {
    ;
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
              <label htmlFor="inputTitle">Заголовок</label>
              <input type="text" className="form-control" id="inputTitle" placeholder="Заполните заголовок"/>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputPrice">Цена</label>
              <input type="text" className="form-control" id="inputPrice" placeholder="1000"/>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputCurrency">Валюта</label>
              <input type="text" className="form-control" id="inputCurrency" placeholder="UAH" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputCategory">Категория</label>
              <input type="text" className="form-control" id="inputCategory" placeholder="Категория" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputSubCategory">Подкатегория</label>
              <input type="text" className="form-control" id="inputSubCategory" placeholder="Подкатегория" />
            </div>
            <div className="form-group col-md-4">
              <label for="inputTags">Тэги</label>
              <input type="text" className="form-control" id="inputTags" placeholder="Введите ключевые слова: uber,asd,qwe,aaa" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label for="inputCity">Город</label>
              <input type="text" className="form-control" id="inputCity" placeholder="Город: Киев" />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputAddress">Адрес</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="Адрес" />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputDate">Дата</label>
              <input type="text" className="form-control" id="inputDate" placeholder="Введите ключевые слова: uber,asd,qwe,aaa" />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputTime">Время</label>
              <input type="text" className="form-control" id="inputTime" placeholder="Введите ключевые слова: uber,asd,qwe,aaa" />
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