import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
        {...rest}
        render={(props) => authed === true 
            ? <Component {...props} /> : 
            <Redirect to={{pathname: "/login", state: {from: props.location}}} />
        }
    />
);

export default PrivateRoute;
