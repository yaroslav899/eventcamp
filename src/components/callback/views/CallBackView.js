import React from 'react';
import CallBackForm from '../CallBackForm';
import { createMarkupText } from '../../../helper';
import { meta } from '../../../resources/meta/callback';

const CallBackView = ({ h1, content }) => {
  return (
    <div className="row">
      <div className="col-12">
        <h1>{h1}</h1>
        <div className="row">
          <div className="col-6">
            <CallBackForm />
          </div>
          <div className="col-6">
            <span dangerouslySetInnerHTML={createMarkupText(content)} />
          </div>
        </div>
      </div>
    </div>
  );
};

CallBackView.defaultProps = { h1: meta.h1 };

export default CallBackView;
