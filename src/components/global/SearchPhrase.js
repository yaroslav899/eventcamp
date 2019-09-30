import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../../store';

class SearchPhrase extends PureComponent {
  componentDidMount() {

  }

  onClick = (e) => {
    e.preventDefault();

  };

  render() {
    return (
      <div>Пошукова фраза - </div>
    );
  }
};

const mapStateToProps = storeData => {
  return { posts: storeData.filterState.list };

};

export default connect(mapStateToProps)(SearchPhrase);
