import React from 'react';
import AddEvent from './AddEvent';
import store from '../../store';

class EditEvent extends AddEvent {
  componentDidMount() {
    const { match } = this.props;
    const { id: eventID } = match.params;
    const {
      user: {
        listPosts
      }
    } = store.getState();

    const postForEdit = listPosts.find((event) => {
      return event.id === +eventID;
    });

    if (!postForEdit) {
      return false;
    }

    this.setState({
      title: postForEdit.title.rendered,
      category: postForEdit.categories[0],
      date: postForEdit.acf.dateOf,
      time: postForEdit.acf.time,
      register: postForEdit.acf.register,
      phone: postForEdit.acf.phone,
      email: postForEdit.acf.email,
      tags: postForEdit.acf.tags,
      price: postForEdit.acf.price,
      currency: postForEdit.acf.currency,
      city: postForEdit.acf.city,
      address: postForEdit.acf.address,
    });
  }

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
            this.setState({ isSuccessRegister: true });
          });
      });
  };
}

export default EditEvent;
