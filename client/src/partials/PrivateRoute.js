import React from "react";
import { Route, Redirect } from "react-router-dom";
import Api from "../services/Api";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (Api.isAuth() === false) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);