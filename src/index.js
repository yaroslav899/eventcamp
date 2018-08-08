import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Link, hashHistory, browserHistory } from 'react-router';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import store from './store'
import {Provider} from 'react-redux'
import './main.css'

import Main from './components/Main';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import Layout from './components/Layout';
import Registration from './components/Registration';

class App extends React.Component {
    render(){
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
                            <Route path='/register' component={Registration} />
                        </Switch>
                    </Layout>
                </Router>                 
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#workarea"));