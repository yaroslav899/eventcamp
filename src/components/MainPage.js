import React from 'react';
import Adventages from './global/Adventages';
import ServicePicture from './global/ServicePicture';
import MainText from './MainText';
import Banner from './global/Banner';

const MainPage = () => (
  <section>
    <div className="container">
      <Banner />
      <Adventages />
      <ServicePicture />
    </div>
    <MainText />
  </section>
);
export default MainPage;
