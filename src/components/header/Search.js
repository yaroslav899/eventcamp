import React, { PureComponent } from 'react';
import SearchSuggestion from './SearchSuggestion';
import { urlRecources } from '../../resources/url';

class Search extends PureComponent {
  state = {
    searchPhrase: '',
    eventList: [],
    isShowSuggestion: false,
  };

  handleChange = (event) => {
    const { searchPhrase } = this.state;
    const { value } = event.target;

    return this.suggest(searchPhrase, value);
  }

  handleBlur = () => {
    //this.setState({ isShowSuggestion: false });
  }

  handleFocus = (event) => {
    const { searchPhrase } = this.state;
    const { value } = event.target;

    if (value.length && value === searchPhrase) {
      this.setState({ isShowSuggestion: true });

      return true;
    } else {
      return this.suggest(searchPhrase, value);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  suggest = (searchPhrase, value) => {
      if (!value.length) {
          this.setState({ searchPhrase: value, eventList: [], isShowSuggestion: false });

          return false;
      }

      const { urlSearch, minChars } = this.props;

      this.setState({ searchPhrase: value }, () => {
          if (minChars >= value.length) {
              this.setState({ eventList: [], isShowSuggestion: false });

              return false;
          }

          return fetch(urlSearch + searchPhrase)
              .then(response => response.json())
              .then(response => {
                if (response && response.length) {
                  this.setState({ eventList: response, isShowSuggestion: true });

                  return null;
                }
              }).catch(error => {
                console.log('error');

                return null;
              });
      });

      return true;
  }

  render() {
    const { searchPhrase, eventList, isShowSuggestion } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="search"
          value={searchPhrase}
          placeholder="Пошук"
          className="search-suggest"
          name="search"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {isShowSuggestion &&
          <SearchSuggestion eventList={eventList}/>
        }
      </form>
    );
  }
}

Search.defaultProps = {
  urlSearch: urlRecources.searchUrl,
  minChars: 2,
};

export default Search;
