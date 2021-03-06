import React, { Fragment } from 'react';
import EventPhone from './EventPhone';
import WriteToAuthor from './views/WriteToAuthor';
import RegisterCTA from './views/RegisterCTA';

const FeedBack = (props) => {
  const { data } = props;

  if (!data) return <Fragment />;

  const {
    acf: {
      email,
      register,
      phone,
    },
    title: { rendered: eventTitle },
  } = data;
  const url = window.location.href;
  const emailUrl = `mailto:${email}?subject=${eventTitle}&;body=${url}`;

  return (
    <div className="feedback-detail-right">
      {!!email.length
        && <WriteToAuthor href={emailUrl} target="_blank" className="write-organisator" title={eventTitle} />
      }
      <RegisterCTA register={register} target="_blank" className="feedback-registration" title={eventTitle} />
      <EventPhone phone={phone} />
    </div>
  );
};

export default FeedBack;
