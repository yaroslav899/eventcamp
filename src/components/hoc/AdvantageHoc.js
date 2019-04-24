import React from 'react';

const AdvantageHoc = ({ imgUrl, text }) => (
  <div className="col-md-3 text-center">
    <img src={imgUrl} alt={text} title={text} className="adv-img img-add img-fluid" />
    <span>{text}</span>
  </div>
);

export default AdvantageHoc;
