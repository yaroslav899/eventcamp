import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute } from 'react-router';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import './css/main.css';

import MainPage from './components/MainPage';
import ListPage from './components/events-list';
import DetailPage from './components/event-detail';
import Layout from './components/global/Layout';
import RegistrationPage from './components/register';
import AddEvent from './components/profile/AddEvent';
import InfoPage from './components/info';
import Profile from './components/profile/';
import NoMatch404 from './components/NoMatch404';
import PrivateRoute from './components/hoc/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <Router history={createBrowserHistory()}>
          <Layout>
            <Switch>
              <Route path='/' component={MainPage} exact />
              <PrivateRoute path="/add-event" redirectTo="/register" component={AddEvent} />
              <Route path='/events/' component={ListPage} exact />
              <Route path='/events/:cities' component={ListPage} exact />
              <Route path='/events/:cities/:categories' component={ListPage} exact />
              <Route path='/events/:cities/:categories/:id' component={withRouter(DetailPage)} exact />
              <Route path='/info' component={InfoPage} />
              <PrivateRoute path="/profile" redirectTo="/register" component={Profile} />
              <Route path='/register' component={RegistrationPage} />
              <Route component={NoMatch404} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#workarea"));