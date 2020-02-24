import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-multi-lang';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';
import EventTags from '../event-global/EventTags';
import { fetchLastEvents } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import { categories } from '../../fixtures';

class LastPosts extends PureComponent {
  componentDidMount() {
    const { lastEvents, fetchLastEvents } = this.props;

    return (lastEvents.length) ? false : fetchLastEvents();
  }

  render() {
    const { lastEvents, t } = this.props;

    if (!lastEvents) return <Fragment />;

    const lastPosts = lastEvents.map((post) => {
      const category = getValueFromParams(categories, post.categories[0], 'id', 'url');

      return (
        <li key={post.id}>
          <NavLink to={`/events/${post.acf.cities}/${category}/${post.id}`}>
            <div className="row">
              <div className="col-12">
                <div className="last-post-title" dangerouslySetInnerHTML={createMarkupText(post.title.rendered)} />
              </div>
              <div className="col-12">
                <EventLocation className="last-post-location" city={post.acf.cities} address={post.acf.location} />
                <EventDate className="last-post-date" date={post.acf.dateOf} />
              </div>
              <EventTags className="col-12 last-post-tags" tags={post.acf.tags} />
            </div>
          </NavLink>
        </li>
      );
    });

    return (
      <div className="last-post-list">
        <h4>{t('global.lastEvent')}</h4>
        <ul>
          {lastPosts}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { lastEvents: store.eventState.lastEvents };
}

function mapDispatchToProps(dispatch) {
  return { fetchLastEvents: () => dispatch(fetchLastEvents()) };
}

export default withTranslation(connect(mapStateToProps, mapDispatchToProps)(LastPosts));
