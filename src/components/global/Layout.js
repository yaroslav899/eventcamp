import React, { Fragment } from 'react';
import Header from '../header';
import Footer from '../footer';

const Layout = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
