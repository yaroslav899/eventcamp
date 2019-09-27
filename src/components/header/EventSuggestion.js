import React, { PureComponent } from 'react';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';

class EventSuggestion extends PureComponent {
  handleMouseDown = () => {
    //ToDo The Issue should be solved by React tools
    const { url } = this.props;
    window.location = url;
  }

  render() {
    const { eventID, title, city, address, date, category } = this.props;

    return <li key={eventID} onMouseDown={this.handleMouseDown}>
      <span dangerouslySetInnerHTML={title} />
      <div>
        <EventLocation className='header__search-suggestion-location' city={city} address={address} />
        <EventDate className='header__search-suggestion-date' date={date} />
      </div>
    </li>;
  }
}

export default EventSuggestion;
