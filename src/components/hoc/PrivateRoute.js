import React from 'react';
import { getCookie } from '../../cookie';
import { Route, Redirect } from 'react-router-dom';

const authData = getCookie('authData');
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authData ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: rest.redirectTo,
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default PrivateRoute;