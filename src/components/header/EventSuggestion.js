import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';

class EventSuggestion extends PureComponent {
  handleMouseDown = () => {
    const { url, history } = this.props;
    history.replace(url);
  }

  render() {
    const { eventID, title, city, address, date } = this.props;

    return <li key={eventID} onMouseDown={this.handleMouseDown}>
      <span dangerouslySetInnerHTML={title} />
      <div>
        <EventLocation className="header__search-suggestion-location" city={city} address={address} />
        <EventDate className="header__search-suggestion-date" date={date} />
      </div>
    </li>;
  }
}

export default withRouter(EventSuggestion);
