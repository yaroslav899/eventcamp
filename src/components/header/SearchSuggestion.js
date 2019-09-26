import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { getValueFromParams, createMarkupText } from '../../helper';
import { categories } from '../../fixtures';

class SearchSuggestion extends PureComponent {
  render() {
    const { eventList } = this.props;

    let eventElement = eventList.map((event) => {
        const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
        const url = `/events/${event.acf.cities}/${category}/${event.id}`;

        return <li key={event.id} className="">
          <NavLink to={url} className="events-item__title">
            {event.title.rendered}
          </NavLink>
        </li>;
      });
    return (
      <ul className="header__search-suggestion">
        {eventElement}
      </ul>
    )
  }
}

export default SearchSuggestion;
