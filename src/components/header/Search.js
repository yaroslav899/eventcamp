import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { withTranslation } from 'react-multi-lang';
import SearchSuggestion from './SearchSuggestion';
import { updateSearchPhrase } from '../../redux/actions/eventActions';
import { fetchEventList } from '../../api';
import { urlRecources } from '../../resources/url';

class Search extends PureComponent {
  state = {
    searchPhrase: '',
    eventList: [],
    isShowSuggestion: false,
  };


  suggest = debounce((value) => {
    const { minChars, urlSearch } = this.props;
    const { searchPhrase, eventList } = this.state;

    if (!searchPhrase.length || (minChars >= value.length)) {
      return this.setState({ eventList: [], isShowSuggestion: false });
    }

    if ((searchPhrase === value) && eventList.length) {
      return this.setState({ isShowSuggestion: true });
    }

    return fetch(urlSearch + searchPhrase)
      .then(response => response.json())
      .then(response => {
        if (response && response.length) {
          this.setState({ eventList: response, isShowSuggestion: true });
        }

        return true;
      })
      .catch(error => {
        console.log(error);

        return null;
      });
  }, 500)

  
  handleChange = (e) => {
    const { value } = e.target;

    return this.setState({ searchPhrase: value}, () => this.suggest(value));
  }

  handleBlur = () => {
    this.setState({ isShowSuggestion: false });
  }

  handleFocus = (e) => {
    const { value } = e.target;

    return this.suggest(value);
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

    this.setState({ isShowSuggestion: false }, () => {
      return new Promise((resolve) => resolve(updateSearchPhrase(decodeURI(searchPhrase))))
        .then(() => fetchEventList({ searchPhrase }));
    });
  }

  render() {
    const { searchPhrase, eventList, isShowSuggestion } = this.state;
    const { t } = this.props;

    return (
      <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
        <input
          type="text"
          id="search"
          value={searchPhrase}
          placeholder={t('global.label.search')}
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
};

export default withTranslation(withRouter(connect(null, mapDispatchToProps)(Search)));
