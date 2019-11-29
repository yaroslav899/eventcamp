import React from 'react';
import CallBackForm from '../CallBackForm';

const CallBackView = ({ title, content }) => {
  return (
    <div className="row">
      <div className="col-12">
        <h1>{title}</h1>
        <div className="row">
          <div className="col-6">
            <CallBackForm />
          </div>
          <div className="col-6">
            <span dangerouslySetInnerHTML={content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallBackView;
