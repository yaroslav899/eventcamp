import React from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { request } from '../../api';
import AddEvent from './AddEvent';
import store from '../../store';
import { global } from '../../resources/profile';

class EditEvent extends AddEvent {
  constructor(props) {
    super(props);
  }

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

    const eventDescription = this.getContentFromHTML(postForEdit.content.rendered);

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
      editorState: EditorState.createWithContent(eventDescription),
      eventID: postForEdit.id,
    });
  }

  getContentFromHTML = (contentHtml) => {
    const blocksFromHTML = convertFromHTML(contentHtml);
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    return content
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

    if (!file) {
      return request.updateEvent(state, null).then((data) => {
        this.setState({ isSuccessRegister: true });
      });
    }

    // ToDo update case without image and when image has cyrillic name
    return request.uploadImage(file)
      .then((response) => {
        const { id } = response.data;
        return request.updateEvent(state, id)
          .then((data) => {
            this.setState({ isSuccessRegister: true });
          });
      });
  };
}

//Set default props
EditEvent.defaultProps = {
  successMsg: global.successEditMsg,
};

export default EditEvent;
