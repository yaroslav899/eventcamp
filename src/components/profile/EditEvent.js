import { connect } from 'react-redux';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { withTranslation } from 'react-multi-lang';
import { request } from '../../api';
import AddEvent from './AddEvent';
import { categories, cities } from '../../fixtures';
import { userMenu } from '../../resources/menu';

class EditEvent extends AddEvent {
  componentDidMount() {
    try {
      const { match, listPosts } = this.props;
      const { id: eventID } = match.params;
      const postForEdit = listPosts.find(event => event.id === +eventID);

      if (!postForEdit) {
        this.props.history.push(userMenu.profile);
        return false;
      }

      const eventDescription = this.getContentFromHTML(postForEdit.content.rendered);
      const categoryID = postForEdit.categories[0];
      const topicList = categories.find(category => +category.id === categoryID).subcat;
      const city = cities.find(cityValue => cityValue.name === postForEdit.acf.cities);
      const topic = topicList.find(topicElement => topicElement.name === postForEdit.acf.topic);
      const currentTopic = {};

      if (topic) {
        currentTopic.label = postForEdit.acf.topic;
        currentTopic.type = 'topics';
        currentTopic.value = topic.id;
      }

      this.setState({
        title: postForEdit.title.rendered,
        category: categoryID,
        topics: topicList,
        date: postForEdit.acf.dateOf,
        time: postForEdit.acf.time,
        register: postForEdit.acf.register,
        phone: postForEdit.acf.phone,
        email: postForEdit.acf.email,
        tags: postForEdit.acf.tags,
        price: postForEdit.acf.price,
        currency: postForEdit.acf.currency,
        city: city ? city.id : 1,
        address: postForEdit.acf.location,
        editorState: EditorState.createWithContent(eventDescription),
        eventID: postForEdit.id,
      }, () => {
        this.setState({ currentTheme: currentTopic });
      });
    } catch (error) {
      this.props.history.push(userMenu.profile);

      return false;
    }

    return true;
  }

  getContentFromHTML = (contentHtml) => {
    const blocksFromHTML = convertFromHTML(contentHtml);
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    return content;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isAddingEvent: true });

    const file = this.fileInput.current.files[0];
    const { state } = this;
    const checkValidForm = this.validator();

    if (!checkValidForm.success) {
      this.setState({ errorMsg: checkValidForm.errorMsg });
      return false;
    }

    if (!file) {
      return request.updateEvent(state, null).then(() => {
        this.setState({ isSuccessRegister: true });
      });
    }

    // ToDo update case without image and when image has cyrillic name
    return request.uploadImage(file)
      .then((response) => {
        const { id } = response.data;
        return request.updateEvent(state, id)
          .then(() => {
            this.setState({ isSuccessRegister: true });
          });
      });
  };
}

function mapStateToProps(store) {
  return { listPosts: store.user.listPosts };
}

export default withTranslation(connect(mapStateToProps)(EditEvent));
