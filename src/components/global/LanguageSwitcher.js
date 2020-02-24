import React, { PureComponent } from 'react';
import Select from 'react-select';
import { getLanguage } from 'react-multi-lang';
import { languages } from '../../resources/langswitcher';

class LanguageSwitcher extends PureComponent {
  state = { language: '' }

  componentDidMount() {
    const language = getLanguage();

    this.setState({ language });
  }

  changeLanguage = () => {
    console.log('1');
  }

  render() {
    const { language } = this.state;
    return (
      <Select
        name="language-switcher"
        label="lang"
        placeholder={language}
        options={languages.map(lang => ({
          label: lang.label,
          value: lang.code,
          type: 'language',
        }))}
        value={language}
        onChange={this.changeLanguage}
      />
    );
  }
}

export default LanguageSwitcher;
