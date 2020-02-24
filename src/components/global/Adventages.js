import React from 'react';
import { withTranslation } from 'react-multi-lang';
import AdvantageHoc from '../hoc/AdvantageHoc';
import { advantageImageUrl } from '../../resources/url';

const Adventages = ({ t }) => (
  <div className="row advant">
    <AdvantageHoc imgUrl={advantageImageUrl.lamp} text={t('advantages.first')} />
    <AdvantageHoc imgUrl={advantageImageUrl.contact} text={t('advantages.second')} />
    <AdvantageHoc imgUrl={advantageImageUrl.popular} text={t('advantages.third')} />
    <AdvantageHoc imgUrl={advantageImageUrl.themes} text={t('advantages.four')} />
  </div>
);

export default withTranslation(Adventages);
