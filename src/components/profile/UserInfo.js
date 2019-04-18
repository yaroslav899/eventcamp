import React, { PureComponent } from 'react';
import store from '../../store';
import { request } from '../../api';
import { profileProperties } from '../../resources/profile';
import { fieldsRegisterForm, imageUrlRecources } from '../../resources';

export default class UserInfo extends PureComponent {
  state = {
    imgUrl: imageUrlRecources.noPhoto,
  }

  componentDidMount() {
    const { user } = store.getState();
    const { data: userData } = user;
    const url = 'http://board.it-mir.net.ua/wp-json/wp/v2/media?&slug=profile-img-yaroslav899@gmail.com_';

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        var g = 0;
      });
  }


  fileInput = React.createRef();

  handleUploadImage = () => {
    const { user } = store.getState();
    const { data: userData } = user;

    const { email } = userData;

    const file = this.fileInput.current.files[0];
    const fileNameArray = file.name.split('.');
    const fileType = fileNameArray[fileNameArray.length - 1];
    const updatedFile = new File([file], `profile-img-${email}.${fileType}`, { type: file.type });

    this.setState({
      imgUrl: URL.createObjectURL(updatedFile),
    });

    request.uploadImage(updatedFile)
      .then(() => {
        // update image profile
      });
  };

  changeImage = () => {

  }

  render() {
    const { user = {} } = this.props;
    const { imgUrl } = this.state;
    return (
      <div className="row">
        <div className="col-6">
          <h1>{profileProperties.title}</h1>
        </div>
        <div className="col-6 text-right" />
        <div className="col-3 text-center">
          <h3>{profileProperties.photoUser}</h3>
          <img src={imgUrl} alt="profile" className="img-fluid rounded-circle profile__photo" />
        </div>
        <div className="col-3 profile__add-photo">
          <p>
            Для смены фотографии загрузите новый файл
            <br/>
            <input type="file" ref={this.fileInput} onChange={this.handleUploadImage} />
          </p>
        </div>
        <div className="col-6">
          <h3>{profileProperties.title}</h3>
          <div className="row">
            <div className="col-6">
              <p>
                {fieldsRegisterForm.firstname}
                <br />
                <b>{user.name}</b>
              </p>
              <p>
                {fieldsRegisterForm.email}
                <br />
                <b>{user.email}</b>
              </p>
              <p>
                Тeлефон
                <br />
                <b>{user.email}</b>
              </p>
            </div>
            <div className="col-6">
              <p className="profile__add-button d-none">редактировать профиль</p>
              <p>
                Город
                <br />
                <b>{user.name}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
