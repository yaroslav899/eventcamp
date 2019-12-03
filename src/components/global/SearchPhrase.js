import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateSearchPhrase } from '../../redux/actions/eventActions';
import { fetchEventList } from '../../api';
import { globalRecources } from '../../resources/global';

class SearchPhrase extends PureComponent {
  componentDidMount() {
    const {
      location: { search } = {},
      searchPhrase,
      fetchEventList,
      updatePhrase,
    } = this.props;

    if (search && search.length && !searchPhrase.length) {
      const updatedSearchPhrase = search.replace('?&query=', '');

      return fetchEventList({})
        .then(() => updatePhrase(decodeURI(updatedSearchPhrase)));
    }

    return true;
  }

  removeSearchPhrase = () => {
    const { history, fetchEventList, updatePhrase } = this.props;

    history.push({ search: '' });

    return fetchEventList({})
      .then(() => updatePhrase(decodeURI('')));
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

function mapStateToProps(store) {
  return { searchPhrase: store.eventState.searchPhrase };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePhrase: searchPhrase => dispatch(updateSearchPhrase(searchPhrase)),
    fetchEventList: params => dispatch(fetchEventList(params)),
  };
}

SearchPhrase.defaultProps = { searchPhraseLabel: globalRecources.searchPhraseLabel };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPhrase));
