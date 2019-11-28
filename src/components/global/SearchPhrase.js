import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateEventList, updateSearchPhrase } from '../../redux/actions/filterActions';
import { request } from '../../api';
import { globalRecources } from '../../resources/global';

class SearchPhrase extends PureComponent {
  componentDidMount() {
    const { location: { search } = {}, searchPhrase } = this.props;

    if (search && search.length && !searchPhrase.length) {
      const updatedSearchPharse = search.replace('?&query=', '');

      return this.updateStoreValues(updatedSearchPharse);
    }

    return true;
  }

  updateStoreValues = (searchPhrase) => {
    const { updateEventList, updateSearchPhrase } = this.props;

    updateSearchPhrase(decodeURI(searchPhrase));

    return request.getListPosts({}).then((posts) => {
      if (!posts.length) {
        const { noFilterResultMsg } = this.props;

        posts.push({ empty: noFilterResultMsg });
      }

      updateEventList(posts);

      return true;
    });
  }

  removeSearchPhrase = () => {
    const { history } = this.props;

    history.push({ search: '' });

    return this.updateStoreValues('');
  };

  render() {
    const { searchPhrase = '', searchPhraseLabel } = this.props;

    if (!searchPhrase.length) {
      return <Fragment />;
    }

    return (
      <div className="event-filter-searchphrase">
        {searchPhraseLabel} - <span onClick={this.removeSearchPhrase}>{searchPhrase} &times;</span>
      </div>
    );
  }
};

const mapStateToProps = storeData => {
  return { searchPhrase: storeData.filterState.searchPhrase };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEventList: posts => dispatch(updateEventList(posts)),
    updateSearchPhrase: searchPhrase => dispatch(updateSearchPhrase(searchPhrase)),
  };
};

SearchPhrase.defaultProps = {
  noFilterResultMsg: globalRecources.noFilterResult,
  searchPhraseLabel: globalRecources.searchPhraseLabel,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPhrase));
