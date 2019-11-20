import React from 'react';
import { detailRecources } from '../../../resources';

const DetailInterestingView = ({ similarEvents, maybeInteresting }) => (
  <div className="detail-interesting">
    <h4>{maybeInteresting}</h4>
    <ul>
      {similarEvents}
    </ul>
  </div>
);

DetailInterestingView.defaultProps = { maybeInteresting: detailRecources.maybeInteresting };

export default DetailInterestingView;
