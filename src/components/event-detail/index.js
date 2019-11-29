import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { request } from '../../api';
import { updateDetailPost } from '../../redux/actions/postActions';
import { getValueFromParams } from '../../helper';
import { cities } from '../../fixtures';
import DetailPageView from './views/DetailPageView';
import Loader from '../global/Loader';

class DetailPage extends Component {
  componentDidMount() {
    return this.getPostDetail();
  }

  componentDidUpdate(props) {
    const { location: { pathname: pathName } = {} } = props;
    const { location: { pathname: prevPathName } = {} } = this.props;

    if (pathName !== prevPathName) {
      return this.getPostDetail();
    }

    return true;
  }

  getPostDetail = () => {
    const { updateEvent, match: { params: { id: postID } } } = this.props;

    updateEvent(null);

    return request.getPostDetail(postID)
      .then(post => updateEvent(post));
  }

  render() {
    const { post } = this.props;

    if (!post) return <Loader />;

    const date = moment(post.acf.dateOf, 'YYYY-MM-DD').format('Do MMM').split(' ');
    const getDateDay = moment(post.acf.dateOf, 'YYYY-MM-DD').format('dddd');
    const city = getValueFromParams(cities, post.acf.cities, 'url', 'name');

    return (
      <Fragment>
        <Helmet>
          <title itemProp="name" lang="uk">{`${post.title.rendered} - ${date} | ${city}`}</title>
          <meta name="description" content={post.content.rendered.substr(0, 180)} />
          <meta name="keywords" content={post.acf.tags} />
          <meta property="og:title" content={post.title.rendered} />
          <meta property="og:description" content={post.content.rendered.substr(0, 180)} />
          <meta property="og:image" content={post.acf.picture} />
          <link rel="image_src" href={post.acf.picture} />
        </Helmet>
        <DetailPageView event={post} date={date} dateDay={getDateDay} />
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return { post: store.post.detail };
}

function mapDispatchToProps(dispatch) {
  return { updateEvent: post => dispatch(updateDetailPost(post)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
