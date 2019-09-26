import React, { PureComponent } from 'react';
import SearchSuggestion from './SearchSuggestion';

class Search extends PureComponent {
  state = {
    searchSuggestion: '',
    eventList: null,
    isShowSuggestion: false,
  };

  handleChange = (event) => {
    const { urlSearch, minChars } = this.props;
    const { searchSuggestion } = this.state;

    if (searchSuggestion.length <= minChars) {
        this.setState({
          searchSuggestion: event.target.value,
          eventList: null,
          isShowSuggestion: false,
        });

        return false;
    }

    this.setState({ searchSuggestion: event.target.value }, ()=>{
        return fetch(urlSearch + this.state.searchSuggestion)
            .then(response => response.json())
            .then(response => {
              if (response && response.length) {
                this.setState({ eventList: response, isShowSuggestion: true });

                return null;
              }
            }).catch(error => {
              console.log('error');

              return null;
            });
    });

    return true;
  }

  handleBlur = () => {
      /*this.setState({
        eventList: null,
        isShowSuggestion: false,
      });*/
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('asdas');
  }

  render() {
    const { searchSuggestion, eventList, isShowSuggestion } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Пошук"
          className="search-suggest"
          name="search"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {isShowSuggestion &&
          <SearchSuggestion eventList={eventList}/>
        }
      </form>
    );
  }
}

Search.defaultProps = {
  urlSearch: 'https://board.event-camp.org/wp-json/wp/v2/posts?&search=',
  minChars: 2,
};

export default Search;
