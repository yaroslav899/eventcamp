import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import SearchSuggestion from './SearchSuggestion';
import store from '../../store';
import { request } from '../../api';
import { urlRecources } from '../../resources/url';
import { globalRecources } from '../../resources/global';

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
    this.setState({ isShowSuggestion: false });
  }

  handleFocus = (event) => {
    const { searchPhrase } = this.state;
    const { value } = event.target;

    if (value.length && value === searchPhrase) {
      this.setState({ isShowSuggestion: true });

      return true;
    }

    return this.suggest(searchPhrase, value);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { searchPhrase } = this.state;
    const { history } = this.props;

    history.push({
      pathname: '/events/',
      search: '&query=' + searchPhrase,
      state: { searchPhrase },
    });

    store.dispatch({
      type: 'UPDATE_SEARCH_PHRASE',
      searchPhrase,
    });

    this.setState({ isShowSuggestion: false });

    return request.getListPosts({}).then((posts) => {
      if (!posts.length) {
        const { noFilterResultMsg } = this.props;

        posts.push({ empty: noFilterResultMsg });
      }

      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });

      return true;
    });
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
          console.log(error);

          return null;
        });
    });

    return true;
  }

  render() {
    const { searchPhrase, eventList, isShowSuggestion } = this.state;
    const { searchLabel } = this.props;

    return (
      <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
        <input
          type="text"
          id="search"
          value={searchPhrase}
          placeholder={searchLabel}
          className="search-suggest"
          name="search"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        {isShowSuggestion
          && <SearchSuggestion eventList={eventList} />
        }
      </form>
    );
  }
}

Search.defaultProps = {
  urlSearch: urlRecources.searchUrl,
  minChars: 2,
  noFilterResultMsg: globalRecources.noFilterResult,
  searchLabel: globalRecources.searchLabel,
};

export default withRouter(Search);
