import React from 'react';
import { withTranslation } from 'react-multi-lang';

const InterestingListView = ({ events, t }) => (
  <div className="detail-interesting">
    <h4>{t('pdp.maybeInteresting')}</h4>
    <ul>
      {events}
    </ul>
  </div>
);

export default withTranslation(InterestingListView);
