import React, { Fragment } from 'react';
import EventPhone from './EventPhone';
import { detailRecources } from '../../resources';

const FeedBack = (props) => {
  const { data, writeToAuthorButton, registerButton } = props;

  if (!data) return <Fragment />;

  const {
    acf: {
      email,
      register,
      phone,
    },
    title: {
      rendered: eventTitle,
    },
  } = data;
  const url = location.href;
  const emailUrl = `mailto:${email}?subject=${eventTitle}&;body=${url}`;

  return (
    <div className="feedback-detail-right">
      <a href={emailUrl} target="_blank" className="write-organisator" title={eventTitle}>
        {writeToAuthorButton}
      </a>
      {register &&
        <a href={register} target="_blank" className="feedback-registration" title={eventTitle}>
          {registerButton}
        </a>
      }
      <EventPhone phone={phone} />
    </div>
  );
}

FeedBack.defaultProps = {
  writeToAuthorButton: detailRecources.writeAuthor,
  registerButton: detailRecources.register,
}

export default FeedBack;
