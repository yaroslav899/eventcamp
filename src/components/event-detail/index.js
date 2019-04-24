import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { request } from '../../api';
import store from '../../store';
import DetailPageView from './views/DetailPageView';
import Loader from '../global/Loader';

class DetailPage extends Component {
  resetPostAmount = () => {
    store.dispatch({
      type: 'UPDATE_DETAIL_POST',
      post: null,
    });

    return true;
  }

  componentDidMount() {
    this.resetPostAmount();

    return request.getPostDetail(this.props.match.params.id)
      .then(post => {
        store.dispatch({
          type: 'UPDATE_DETAIL_POST',
          post: post,
        });

        document.title = post.title.rendered;
      });
  }

  render() {
    const { post } = this.props;
    if (!post) return <Loader />;

    const date = moment(post.acf.dateOf, "YYYY-MM-DD").format("Do MMM").split(' ');
    const getDateDay = moment(post.acf.dateOf, "YYYY-MM-DD").format("dddd");

    return <DetailPageView event={post} date={date} dateDay={getDateDay}/>
  }
};

const mapStateToProps = function (store) {
  return {
    post: store.post.detail,
  }
};

export default connect(mapStateToProps)(DetailPage);