import React, { Fragment } from 'react';
import EventPhone from './EventPhone';
import WriteToAuthor from './WriteToAuthor';
import AddToInteresting from './AddToInteresting';

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
      <WriteToAuthor href={emailUrl} target="_blank" className="write-organisator" title={eventTitle} />
      <AddToInteresting register={register} target="_blank" className="feedback-registration" title={eventTitle}/>
      <EventPhone phone={phone} />
    </div>
  );
};

export default FeedBack;
