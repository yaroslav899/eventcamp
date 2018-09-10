import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import './main.css';

import Main from './components/Main';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import Layout from './components/Layout';
import Registration from './components/Registration';
import Authorization from './components/Authorization';
import Profile from './components/profile/';
import NoMatch404 from './components/NoMatch404';
import PrivateRoute from './components/hoc/PrivateRoute';

class App extends React.Component {
    render() {
        return(
            <Provider store={store}>                
                <Router history={createBrowserHistory()}>
                    <Layout>
                        <Switch>
                            <Route path='/' component={Main} exact />
                            <Route path='/events/' component={EventList} exact />
                            <Route path='/events/:cities' component={EventList} exact />
                            <Route path='/events/:cities/:categories' component={EventList} exact />
                            <Route path='/events/:cities/:categories/:id' component={EventDetail} />
                            <PrivateRoute path="/profile" redirectTo="/enter" component={Profile} />
                            <Route path='/enter' component={Authorization} />
                            <Route path='/register' component={Registration} />
                            <Route component={NoMatch404} />
                        </Switch>
                    </Layout>
                </Router>                 
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#workarea"));