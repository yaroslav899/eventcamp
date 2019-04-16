import React, { PureComponent } from 'react';
import EventView from '../global/EventView';

class TakingPartMember extends PureComponent {
  state = {
    events: null
  }

  componentDidMount() {
    const { user } = this.props;

    if (!user) {
      return true;
    }

    const url = `http://board.it-mir.net.ua/wp-json/wp/v2/posts?filter[meta_key]=countmembers&filter[meta_compare]=LIKE&filter[meta_value]=${user.email}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          events: data,
        });
      });
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
