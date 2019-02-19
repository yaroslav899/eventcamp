import React from 'react';
import AdvantageHoc from '../hoc/AdvantageHoc';
import { advantRecources } from '../../resources';

const Adventages = () => (
  <div className="row advant">
    <AdvantageHoc imgUrl="/img/lamp.png" text={advantRecources.first} />
    <AdvantageHoc imgUrl="/img/contact.png" text={advantRecources.second} />
    <AdvantageHoc imgUrl="/img/popular.png" text={advantRecources.third} />
    <AdvantageHoc imgUrl="/img/themes.png" text={advantRecources.four} />
  </div>
);
export default Adventages;