import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';
import { getValueFromParams, createMarkupText } from '../../helper';
import { categories } from '../../fixtures';

class SearchSuggestion extends PureComponent {
  handleMouseDown = (event) => {
    //ToDo The Issue should be solved by React tools
    window.location = event.currentTarget.href;
  }

  render() {
    const { eventList } = this.props;

    let eventElement = eventList.map((event) => {
        const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
        const url = `/events/${event.acf.cities}/${category}/${event.id}`;

        return <li key={event.id}>
          <NavLink to={url} onMouseDown={this.handleMouseDown}>
            <span dangerouslySetInnerHTML={createMarkupText(event.title.rendered)} />
            <div>
              <EventLocation city={event.acf.cities} address='' />
              <EventDate date={event.acf.dateOf} />
            </div>
          </NavLink>
        </li>;
      });
    return (
      <ul className='header__search-suggestion'>
        {eventElement}
      </ul>
    )
  }
}

export default SearchSuggestion;
