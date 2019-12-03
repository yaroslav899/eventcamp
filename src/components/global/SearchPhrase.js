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
      fetchEventList,
      updateSearchPhrase,
    } = this.props;

    if (search && search.length) {
      const updatedSearchPhrase = search.replace('?&query=', '');

      return new Promise((resolve) => resolve(updateSearchPhrase(decodeURI(updatedSearchPhrase))))
          .then(() => fetchEventList({searchPhrase: updatedSearchPhrase}));
    }

    return true;
  }

  removeSearchPhrase = () => {
    const { history, fetchEventList, updateSearchPhrase } = this.props;

    history.push({ search: '' });

    return new Promise((resolve) => resolve(updateSearchPhrase(decodeURI(''))))
      .then(() => fetchEventList({}));
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
    updateSearchPhrase: searchPhrase => dispatch(updateSearchPhrase(searchPhrase)),
    fetchEventList: params => dispatch(fetchEventList(params)),
  };
}

SearchPhrase.defaultProps = { searchPhraseLabel: globalRecources.searchPhraseLabel };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPhrase));
