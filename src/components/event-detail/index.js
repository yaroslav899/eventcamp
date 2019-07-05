import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { request } from '../../api';
import store from '../../store';
import DetailPageView from './views/DetailPageView';
import Loader from '../global/Loader';

class DetailPage extends Component {
  componentDidMount() {
    this.resetPostAmount();

    return request.getPostDetail(this.props.match.params.id)
      .then(post => {
        store.dispatch({
          type: 'UPDATE_DETAIL_POST',
          post,
        });
      });
  }

  resetPostAmount = () => {
    store.dispatch({
      type: 'UPDATE_DETAIL_POST',
      post: null,
    });

    return true;
  }

  render() {
    const { post } = this.props;

    if (!post) return <Loader />;

    const date = moment(post.acf.dateOf, 'YYYY-MM-DD').format('Do MMM').split(' ');
    const getDateDay = moment(post.acf.dateOf, 'YYYY-MM-DD').format('dddd');

    return (
      <Fragment>
        <Helmet>
          <title itemProp="name" lang="uk">{`${post.title.rendered} - ${post.acf.cities}`}</title>
          <meta name="description" content={post.content.rendered.substr(0, 180)} />
          <meta name="keywords" content={post.acf.tags} />
          <meta property="og:title" content={post.title.rendered} />
          <meta property="og:description" content={post.content.rendered.substr(0, 180)} />
          <meta property="og:image" content={post.acf.picture} />
          <link rel="image_src" href={post.acf.picture} />
        </Helmet>
        <DetailPageView event={post} date={date} dateDay={getDateDay} />
      </Fragment>
    )
  }
};

const mapStateToProps = (storeData) => {
  return { post: storeData.post.detail };
};

export default connect(mapStateToProps)(DetailPage);
