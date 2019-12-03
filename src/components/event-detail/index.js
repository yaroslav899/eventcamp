import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchEventDetail } from '../../api';
import { getValueFromParams } from '../../helper';
import { cities } from '../../fixtures';
import Meta from './Meta';
import DetailPageView from './views/DetailPageView';
import Loader from '../global/Loader';

class DetailPage extends PureComponent {
  componentDidMount() {
    const { fetchEventDetail, match: { params: { id: eventID } } } = this.props;

    return fetchEventDetail(eventID);
  }

  componentDidUpdate(props) {
    const { location: { pathname: pathName } = {} } = props;
    const { location: { pathname: prevPathName } = {}, fetchEventDetail } = this.props;

    if (pathName !== prevPathName) {
      const { fetchEventDetail, match: { params: { id: eventID } } } = this.props;

      return fetchEventDetail(eventID);
    }

    return true;
  }

  render() {
    const { event, loader } = this.props;

    if (loader || !event.acf) return <Loader />;

    const date = moment(event.acf.dateOf, 'YYYY-MM-DD').format('Do MMM').split(' ');
    const getDateDay = moment(event.acf.dateOf, 'YYYY-MM-DD').format('dddd');
    const city = getValueFromParams(cities, event.acf.cities, 'url', 'name');

    return (
      <Fragment>
        <Meta
          title={event.title.rendered}
          description={event.content.rendered.substr(0, 180)}
          keywords={event.acf.tags}
          date={date}
          city={city}
          image={event.acf.picture}
        />
        <DetailPageView event={event} date={date} dateDay={getDateDay} />
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    event: store.eventState.event,
    loader: store.eventState.loader,
  };
}

function mapDispatchToProps(dispatch) {
  return { fetchEventDetail: event => dispatch(fetchEventDetail(event)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
