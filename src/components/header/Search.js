import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchSuggestion from './SearchSuggestion';
import { updateSearchPhrase } from '../../redux/actions/eventActions';
import { fetchEventList } from '../../api';
import { urlRecources } from '../../resources/url';
import { globalRecources } from '../../resources/global';

class Search extends PureComponent {
  state = {
    searchPhrase: '',
    eventList: [],
    isShowSuggestion: false,
  };

  handleChange = (e) => {
    const { searchPhrase } = this.state;
    const { value } = e.target;

    return this.suggest(searchPhrase, value);
  }

  handleBlur = () => {
    this.setState({ isShowSuggestion: false });
  }

  handleFocus = (e) => {
    const { searchPhrase } = this.state;
    const { value } = e.target;

    if (value.length && value === searchPhrase) {
      this.setState({ isShowSuggestion: true });

      return true;
    }

    return this.suggest(searchPhrase, value);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchPhrase } = this.state;
    const { history, fetchEventList, updateSearchPhrase } = this.props;

    history.push({
      pathname: '/events/',
      search: '&query=' + searchPhrase,
      state: { searchPhrase },
    });

    this.setState({ isShowSuggestion: false });

    return fetchEventList({})
      .then(() => updateSearchPhrase(searchPhrase));
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
          }

          return true;
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

function mapDispatchToProps(dispatch) {
  return {
    fetchEventList: params => dispatch(fetchEventList(params)),
    updateSearchPhrase: searchPhrase => dispatch(updateSearchPhrase(searchPhrase)),
  };
}

Search.defaultProps = {
  urlSearch: urlRecources.searchUrl,
  minChars: 2,
  searchLabel: globalRecources.searchLabel,
};

export default withRouter(connect(null, mapDispatchToProps)(Search));
