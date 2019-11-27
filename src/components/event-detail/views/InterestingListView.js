import React from 'react';
import { detailRecources } from '../../../resources';

const InterestingListView = ({ events, maybeInteresting }) => (
  <div className="detail-interesting">
    <h4>{maybeInteresting}</h4>
    <ul>
      {events}
    </ul>
  </div>
);

InterestingListView.defaultProps = { maybeInteresting: detailRecources.maybeInteresting };

export default InterestingListView;
