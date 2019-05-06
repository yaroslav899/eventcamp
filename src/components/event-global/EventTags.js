import React, { Fragment } from 'react';
import { getUniqueArray } from '../../helper';

const EventTags = (data) => {
  const { tags } = data;

  return (
    <Fragment>
      {tags ? getUniqueArray(tags.split(',')).map((tag) => <span key={tag}>{tag}</span>) : ''}
    </Fragment>
  );
}

export default EventTags;
