import React, { PureComponent } from 'react';
import EventSuggestion from './EventSuggestion';
import { getValueFromParams, createMarkupText } from '../../helper';
import { categories } from '../../fixtures';

class SearchSuggestion extends PureComponent {
  render() {
    const { eventList } = this.props;
    const eventElement = eventList.map((event) => {
      const title = createMarkupText(event.title.rendered);
      const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
      const url = `/events/${event.acf.cities}/${category}/${event.id}`;

      return <EventSuggestion
        key={event.id}
        eventID={event.id}
        title={title}
        city={event.acf.cities}
        address={event.acf.location}
        date={event.acf.dateOf}
        category={category}
        url={url}
      />;
    });

    return (
      <ul className="header__search-suggestion">
        {eventElement}
      </ul>
    );
  }
}

export default SearchSuggestion;
