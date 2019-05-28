import React, { PureComponent } from 'react';
import EventView from '../event-global/EventView';
import { request } from '../../api';

class TakingPartMember extends PureComponent {
  state = { events: null }

  componentDidMount() {
    const { user: { subscribed } = {} } = this.props;

    if (!subscribed || !subscribed.length) {
      return true;
    }

    return request.getTakingPartMemberEvents(subscribed)
      .then((events) => {
        this.setState({ events });
      }).catch(() => false);
  }

  render() {
    const { events } = this.state;
    const userPosts = !events ? '---' : events.map(event => <li key={event.id} className="own-events__item own-events-item">
      <EventView event={event} isOwner={false} />
    </li>);

    return (
      <ul>
        {userPosts}
      </ul>
    );
  }
}

export default TakingPartMember;
