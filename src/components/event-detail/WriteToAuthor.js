import React from 'react';
import { detailRecources } from '../../resources';

const WriteToAuthor = ({ writeAuthor, ...props }) => (
  <a {...props}>
    {writeAuthor}
  </a>
);

WriteToAuthor.defaultProps = { writeAuthor: detailRecources.writeAuthor };

export default WriteToAuthor;
