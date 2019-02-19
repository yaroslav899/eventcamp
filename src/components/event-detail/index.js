import React, { Component } from 'react';
import moment from 'moment';
import { request } from '../../api';
import DetailPageView from './views/DetailPageView';
import Loader from '../global/Loader';
import { connect } from 'react-redux';
import store from '../../store';
import { free } from '../../fixtures';
import '../../css/detailPage.css';
import { globalRecources, imageUrlRecources } from '../../resources';

class DetailPage extends Component {
  componentDidMount() {
    store.dispatch({
      type: 'UPDATE_DETAIL_POST',
      post: null,
    });

    return request.getPostDetail(this.props.match.params.id)
      .then(post => {
        store.dispatch({
          type: 'UPDATE_DETAIL_POST',
          post: post,
        });
        
        document.title = post.title.rendered

        return;
      });
  }

  render() {
    const { post } = this.props;
    if (!post) return <Loader/>;
    const date = moment(post.acf.dateOf, "YYYY-MM-DD").format("Do MMM").split(' ');

    return (
      <DetailPageView title={post.title.rendered} event={post} date={date}/>
    )
  }
};

const mapStateToProps = function (store) {
  return {
    post: store.post.detail,
  }
};

export default connect(mapStateToProps)(DetailPage);