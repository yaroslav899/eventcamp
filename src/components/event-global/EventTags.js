import React, { Fragment } from 'react';
import { getUniqueArray } from '../../helper';

const EventTags = ({ className = '', tags = '' }) => (
  <Fragment>
    {!!tags.length
      && <div className={className}>
        {tags ? getUniqueArray(tags.split(',')).map((tag) => <span key={tag}>{tag}</span>) : ''}
      </div>
    }
  </Fragment>
);

export default EventTags;
