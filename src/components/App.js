import React, { Component } from 'react';
import { Router } from 'react-router';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { setTranslations, setDefaultLanguage } from 'react-multi-lang';
import store from '../store';
import { getUserData } from '../helper';

import Layout from './global/Layout';
import MainPage from './MainPage';
import ListPage from './events-list';
import DetailPage from './event-detail';
import InfoPage from './info';
import Policy from './policy';
import CallBack from './callback';
import RegistrationPage from './register';
import Profile from './profile';
import AddEvent from './profile/AddEvent';
import EditEvent from './profile/EditEvent';
import NoMatch404 from './NoMatch404';
import PrivateRoute from './hoc/PrivateRoute';

import uk from '../translations/uk/common.json';
import ru from '../translations/ru/common.json';
import en from '../translations/en/common.json';

setTranslations({ uk, ru, en });
setDefaultLanguage(window.location.host.split('.')[0].length == 2 ? window.location.host.split('.')[0] : 'uk');

const history = createBrowserHistory();

ReactGA.initialize('UA-141687240-1');
// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
  componentDidMount() {
    getUserData();
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Layout>
            <Switch>
              <Route path="/" component={MainPage} exact />
              <Route path="/events/" component={ListPage} exact />
              <Route path="/events/:cities" component={ListPage} exact />
              <Route path="/events/:cities/:categories" component={ListPage} exact />
              <Route path="/events/:cities/:categories/:id" component={withRouter(DetailPage)} exact />
              <Route path="/info" component={InfoPage} />
              <Route path="/callback" component={CallBack} />
              <Route path="/register" component={RegistrationPage} />
              <Route path="/policy" component={Policy} />
              <PrivateRoute path="/profile" redirectTo="/register" component={Profile} />
              <PrivateRoute path="/add-event" redirectTo="/register" component={AddEvent} />
              <Route path="/edit-event/:id" component={EditEvent} exact />
              <Route path="*" component={NoMatch404} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
