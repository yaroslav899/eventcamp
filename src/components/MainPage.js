import React from 'react';
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
          <div className="row">
            <ServicePicture />
          </div>
        </div>
        <div className="col-12 col-md-3">
          <LastPosts />
          <div>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/eventcampua/"
              data-width="270"
              data-hide-cover="false"
              data-show-facepile="false"
            >
              <blockquote cite="https://www.facebook.com/eventcampua/" className="fb-xfbml-parse-ignore">
                <a href="https://www.facebook.com/eventcampua/">Homepets. ќбъ€влени€ о продаже, в€зке домашних животных</a>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MainText />
  </section>
);
export default MainPage;
