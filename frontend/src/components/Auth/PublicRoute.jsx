import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from 'helpers/functions';
 
const PublicRoute = ({ component: Component, ...rest }) => (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
        {...rest}
        render={props =>
            !isLogged() ? <Component {...props} /> : <Redirect to="/" />
        }
    />
);
 
export default PublicRoute;
