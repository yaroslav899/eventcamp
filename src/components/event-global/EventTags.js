import React from 'react';
import { getUniqueArray } from '../../helper';

const EventTags = ({ className = '', tags = '' }) => (
  <div className={className}>
    {tags ? getUniqueArray(tags.split(',')).map((tag) => <span key={tag}>{tag}</span>) : ''}
  </div>
);

export default EventTags;
