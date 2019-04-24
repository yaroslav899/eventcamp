import React from 'react';
import AdvantageHoc from '../hoc/AdvantageHoc';
import { advantRecources } from '../../resources';
import { advantageImageUrl } from '../../resources/url';

const Adventages = () => (
  <div className="row advant">
    <AdvantageHoc imgUrl={advantageImageUrl.lamp} text={advantRecources.first} />
    <AdvantageHoc imgUrl={advantageImageUrl.contact} text={advantRecources.second} />
    <AdvantageHoc imgUrl={advantageImageUrl.popular} text={advantRecources.third} />
    <AdvantageHoc imgUrl={advantageImageUrl.themes} text={advantRecources.four} />
  </div>
);

export default Adventages;
