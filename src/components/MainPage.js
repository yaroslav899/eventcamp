import React from 'react';
import '../css/index.css';
import Banner from './global/Banner';
import Adventages from './global/Adventages';
import ServicePicture from './global/ServicePicture';
import LastPosts from './global/LastPosts';
import MainText from './MainText';

const MainPage = () => (
  <section>
    <div className="container">
      <div className="row banner-main d-none d-md-block">
        <div className="col-12">
          <Banner />
        </div>
      </div>
      <Adventages />
      <div className="row">
        <div className="col-12 col-sm-9 category-main">
          <div className="container">
            <div className="row">
              <ServicePicture />
            </div>
          </div>
        </div>
        <div className="col-3">
          <LastPosts />
        </div>
      </div>
    </div>
    <MainText />
  </section>
);
export default MainPage;