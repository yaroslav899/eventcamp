import React, { PureComponent } from 'react';
import { fetchPageData } from '../../api';
import { createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import { hiddenPages } from '../../resources/menu';

class Policy extends PureComponent {
  state = { text: '' }

  componentDidMount() {
    const policyPageID = hiddenPages.policy;

    return fetchPageData(null, policyPageID)
      .then(text => {
        if (!text) {
          return false;
        }

        this.setState({ text });

        return true;
      });
  }

  render() {
    const { text } = this.state;

    return (
      <div className="container">
        <Adventages />
        <div className="row">
          <div className="col-12" dangerouslySetInnerHTML={createMarkupText(text)} />
        </div>
      </div>
    );
  }
}

export default Policy;
