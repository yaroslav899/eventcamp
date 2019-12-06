import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventList from './EventList';
import ListPageView from './views/ListPageView';
import Loader from '../global/Loader';
import { fetchEventList } from '../../api';
import { updateFilterStore } from '../../helper';

class ListPage extends PureComponent {
  componentDidMount() {
    const { match: { params: initialParams } = {}, fetchEventList } = this.props;

    return new Promise((resolve) => resolve(updateFilterStore(initialParams)))
      .then(() => fetchEventList(initialParams));
  }

  render() {
    const { events, loader } = this.props;
    let eventsElement = null;

    if (loader) {
      eventsElement = <Loader />;
    } else if (events.length === 1 && events[0].empty) {
      eventsElement = events[0].empty;
    } else {
      eventsElement = events.map((event) => {
        return <li key={event.id} className="events__item events-item">
          <EventList
            event={event}
            imgWrapClass="col-12 col-lg-4 d-md-none d-lg-block"
            descrWrapClass="col-12 col-lg-5 col-md-7"
            actionWrapClass="col-12 col-lg-3 col-md-5"
            isOwner={false}
          />
        </li>;
      });
    }

    return <ListPageView eventsElement={eventsElement} />;
  }
}

function mapStateToProps(store) {
  return {
    events: store.eventState.events,
    loader: store.eventState.loader,
  };
}

function mapDispatchToProps(dispatch) {
  return { fetchEventList: params => dispatch(fetchEventList(params)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
