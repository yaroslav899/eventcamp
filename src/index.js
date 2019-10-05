import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import store from './store';
import { getUserData } from './helper';

import Layout from './components/global/Layout';
import MainPage from './components/MainPage';
import ListPage from './components/events-list';
import DetailPage from './components/event-detail';
import InfoPage from './components/info';
import Policy from './components/policy';
import CallBack from './components/callback';
import RegistrationPage from './components/register';
import Profile from './components/profile';
import AddEvent from './components/profile/AddEvent';
import EditEvent from './components/profile/EditEvent';
import NoMatch404 from './components/NoMatch404';
import PrivateRoute from './components/hoc/PrivateRoute';

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
              <Route component={NoMatch404} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#workarea'));
