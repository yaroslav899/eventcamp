import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
